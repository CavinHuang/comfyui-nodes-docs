
# Documentation
- Class name: Human4D_Img2SMPL
- Category: MotionDiff
- Output node: False

Human4D_Img2SMPL节点旨在将2D人体图像转换为使用SMPL模型的3D表示。它利用深度学习模型检测图像中的人体形态，估计其姿势，并生成相应的3D网格模型，从而实现高级的运动分析和可视化。

# Input types
## Required
- human4d_model
    - human4D模型封装了检测图像中人体并生成其3D SMPL表示所需的必要配置和模型。它在节点准确处理和转换2D图像为3D模型的能力中起着至关重要的作用。
    - Comfy dtype: HUMAN4D_MODEL
    - Python dtype: SimpleNamespace
- image
    - 包含待转换为3D SMPL模型的人体图像的输入张量。该张量对于节点执行人体检测和姿态估计至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- det_confidence_thresh
    - 人体检测的置信度阈值。该参数有助于过滤掉低置信度的检测结果，确保只有高置信度的人体图像被处理为3D模型。
    - Comfy dtype: FLOAT
    - Python dtype: float
- det_iou_thresh
    - 人体检测的交并比(IOU)阈值。用于管理检测到的边界框之间的重叠，提高人体检测的精确度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- det_batch_size
    - 处理检测的批量大小。该参数影响人体检测过程的吞吐量和效率，在速度和内存使用之间取得平衡。
    - Comfy dtype: INT
    - Python dtype: int
- hmr_batch_size
    - HMR（人体网格恢复）过程的批量大小。它决定了同时处理多少个人体图像进行3D建模，影响节点的性能和资源利用。
    - Comfy dtype: INT
    - Python dtype: int

## Optional
- opt_scorehmr_refiner
    - 用于优化HMR过程得分的可选参数。如果提供，它可以提高节点生成的3D SMPL模型的准确性。
    - Comfy dtype: SCORE_HMR_MODEL
    - Python dtype: Optional[Callable]

# Output types
- smpl_multiple_subjects
    - 输出是从2D图像派生的多个人体主体的全面3D表示，包括网格模型、姿势信息以及用于高级运动分析的附加元数据。
    - Comfy dtype: SMPL_MULTIPLE_SUBJECTS
    - Python dtype: Tuple[List[torch.Tensor], Dict]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Human4D_Img2SMPL:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "human4d_model": ("HUMAN4D_MODEL", ),
                "image": ("IMAGE",),
                "det_confidence_thresh": ("FLOAT", {"min": 0.1, "max": 1, "step": 0.05, "default": 0.25}),
                "det_iou_thresh": ("FLOAT", {"min": 0.1, "max": 1, "step": 0.05, "default": 0.7}),
                "det_batch_size": ("INT", {"min": 1, "max": 20, "default": 10}),
                "hmr_batch_size": ("INT", {"min": 1, "max": 20, "default": 8})
            },
            "optional": {
                "opt_scorehmr_refiner": ("SCORE_HMR_MODEL", )
            }
        }

    RETURN_TYPES = ("SMPL_MULTIPLE_SUBJECTS", )
    FUNCTION = "sample"
    CATEGORY = "MotionDiff"

    def get_boxes(self, detector, image, batch_size, **kwargs):
        boxes_images = []
        for img_batch in tqdm(DataLoader(image, shuffle=False, batch_size=batch_size, num_workers=0)):
            det_results = detector.predict([img.numpy() for img in img_batch], classes=[0], **kwargs)
            boxes_images.extend([det_result.boxes.xyxy.cpu().numpy() for det_result in det_results])
        return boxes_images

    def sample(self, human4d_model, image, det_confidence_thresh, det_iou_thresh, det_batch_size, hmr_batch_size, opt_scorehmr_refiner=None):
        models = human4d_model
        if opt_scorehmr_refiner is not None:
            raise NotImplementedError()
        image = image.__mul__(255.).to(torch.uint8)
        boxes_images = self.get_boxes(models.detector, image, conf=det_confidence_thresh, iou=det_iou_thresh, batch_size=det_batch_size)
        verts_frames = []
        cam_t_frames = []
        kps_2d_frames = []
        pbar = comfy.utils.ProgressBar(len(image))
        for img_pt, boxes in tqdm(zip(image, boxes_images)):
            img_cv2 = img_pt.numpy()[:, :, ::-1].copy()

            # Run HMR2.0 on all detected humans
            dataset = ViTDetDataset(models.model_cfg, img_cv2, boxes)
            dataloader = torch.utils.data.DataLoader(dataset, batch_size=hmr_batch_size, shuffle=False, num_workers=0)
            _all_verts = []
            _all_kps_2d = []

            for batch in dataloader:
                batch = recursive_to(batch, get_torch_device())
                if models.fp16:
                    batch = recursive_to(batch, torch.float16)
                with torch.no_grad():
                    out = models.human4d(batch)

                pred_cam = out['pred_cam']
                box_center = batch["box_center"].float()
                box_size = batch["box_size"].float()
                img_size = batch["img_size"].float()
                scaled_focal_length = models.model_cfg.EXTRA.FOCAL_LENGTH / models.model_cfg.MODEL.IMAGE_SIZE * img_size.max()
                pred_cam_t_full = cam_crop_to_full(pred_cam, box_center, box_size, img_size, scaled_focal_length).detach().cpu()

                batch_size = batch['img'].shape[0]
                for n in range(batch_size):
                    verts = out['pred_vertices'][n].detach().cpu() #Shape [num_verts, 3]
                    cam_t = pred_cam_t_full[n] # Shape [3]
                    kps_2d = out['pred_keypoints_2d'][n].detach().cpu() #Shape [44, 3]
                    verts = torch.from_numpy(vertices_to_trimesh(verts, cam_t.unsqueeze(0)).vertices)
                    _all_verts.append(verts)
                    _all_kps_2d.append(kps_2d)
            
            if len(_all_verts):
                verts_frames.append(
                    torch.stack(_all_verts) #Shape [num_subjects, num_verts, 3]
                )
                kps_2d_frames.append(
                    torch.stack(_all_kps_2d) #Shape [num_subjects, 44, 3]
                )
            else:
                verts_frames.append(None)
                cam_t_frames.append(None)
                kps_2d_frames.append(None)
            pbar.update(1)
        verts_frames #List of [num_subjects, num_verts, 3]
        kps_2d_frames #List of [num_subjects, 44, 3]
        rot2xyz = Rotation2xyz(device="cpu", smpl_model_path=smpl_models_dict["SMPL_NEUTRAL.pkl"])
        faces = rot2xyz.smpl_model.faces
        
        return ((
            verts_frames, 
            {"faces": faces, "normalized_to_vertices": True, 'cam': cam_t_frames, 
            "frame_width": int(img_size[0, 0].item()), "frame_height": int(img_size[0, 1].item()), 
            "focal_length": scaled_focal_length, 
            "render_openpose": partial(render_openpose, kps_2d_frames, boxes_images, int(img_size[0, 0].item()), int(img_size[0, 1].item()))}
            # In Comfy, IMAGE is a batched Tensor so all frames always share the same size
        ), )

```
