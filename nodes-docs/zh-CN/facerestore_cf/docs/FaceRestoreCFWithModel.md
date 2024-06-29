# Documentation
- Class name: FaceRestoreCFWithModel
- Category: facerestore_cf
- Output node: False
- Repo Ref: https://github.com/mav-rik/facerestore_cf

该节点旨在使用先进的深度学习模型提高和恢复面部图像的质量。它通过检测面孔、对齐以及应用恢复技术来处理输入图像，以提高整体清晰度和细节。该节点的主要目标是生成适合各种应用的高质量面部图像，如照片增强、身份验证和社交媒体分享。

# Input types
## Required
- facerestore_model
    - 此参数指定用于面部恢复的深度学习模型。它对节点的运行至关重要，因为它决定了特定模型的能力以及恢复输出的质量。
    - Comfy dtype: string
    - Python dtype: str
- image
    - 将要应用面部恢复过程的输入图像。它是直接影响输出质量和恢复效果的主要数据输入。
    - Comfy dtype: image
    - Python dtype: PIL.Image or numpy.ndarray
- facedetection
    - 选择用于识别和定位输入图像中面部的面部检测模型。模型的选择影响面部检测的准确性和可靠性，进而影响后续的恢复过程。
    - Comfy dtype: combo
    - Python dtype: str
## Optional
- codeformer_fidelity
    - 调整恢复过程的保真度，其中较高的值表示更接近原始图像细节。此参数允许微调质量与计算效率之间的平衡。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- image
    - 输出是经过处理以提高其质量和清晰度的恢复面部图像。这是节点操作的主要结果，代表了恢复过程的最终成果。
    - Comfy dtype: image
    - Python dtype: PIL.Image or numpy.ndarray

# Usage tips
- Infra type: GPU

# Source code
```
class FaceRestoreCFWithModel:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'facerestore_model': ('FACERESTORE_MODEL',), 'image': ('IMAGE',), 'facedetection': (['retinaface_resnet50', 'retinaface_mobile0.25', 'YOLOv5l', 'YOLOv5n'],), 'codeformer_fidelity': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1, 'step': 0.05})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'restore_face'
    CATEGORY = 'facerestore_cf'

    def __init__(self):
        self.face_helper = None

    def restore_face(self, facerestore_model, image, facedetection, codeformer_fidelity):
        print(f'\tStarting restore_face with codeformer_fidelity: {codeformer_fidelity}')
        device = model_management.get_torch_device()
        facerestore_model.to(device)
        if self.face_helper is None:
            self.face_helper = FaceRestoreHelper(1, face_size=512, crop_ratio=(1, 1), det_model=facedetection, save_ext='png', use_parse=True, device=device)
        image_np = 255.0 * image.cpu().numpy()
        total_images = image_np.shape[0]
        out_images = np.ndarray(shape=image_np.shape)
        for i in range(total_images):
            cur_image_np = image_np[i, :, :, ::-1]
            original_resolution = cur_image_np.shape[0:2]
            if facerestore_model is None or self.face_helper is None:
                return image
            self.face_helper.clean_all()
            self.face_helper.read_image(cur_image_np)
            self.face_helper.get_face_landmarks_5(only_center_face=False, resize=640, eye_dist_threshold=5)
            self.face_helper.align_warp_face()
            restored_face = None
            for (idx, cropped_face) in enumerate(self.face_helper.cropped_faces):
                cropped_face_t = img2tensor(cropped_face / 255.0, bgr2rgb=True, float32=True)
                normalize(cropped_face_t, (0.5, 0.5, 0.5), (0.5, 0.5, 0.5), inplace=True)
                cropped_face_t = cropped_face_t.unsqueeze(0).to(device)
                try:
                    with torch.no_grad():
                        output = facerestore_model(cropped_face_t, w=codeformer_fidelity)[0]
                        restored_face = tensor2img(output, rgb2bgr=True, min_max=(-1, 1))
                    del output
                    torch.cuda.empty_cache()
                except Exception as error:
                    print(f'\tFailed inference for CodeFormer: {error}', file=sys.stderr)
                    restored_face = tensor2img(cropped_face_t, rgb2bgr=True, min_max=(-1, 1))
                restored_face = restored_face.astype('uint8')
                self.face_helper.add_restored_face(restored_face)
            self.face_helper.get_inverse_affine(None)
            restored_img = self.face_helper.paste_faces_to_input_image()
            restored_img = restored_img[:, :, ::-1]
            if original_resolution != restored_img.shape[0:2]:
                restored_img = cv2.resize(restored_img, (0, 0), fx=original_resolution[1] / restored_img.shape[1], fy=original_resolution[0] / restored_img.shape[0], interpolation=cv2.INTER_LINEAR)
            self.face_helper.clean_all()
            out_images[i] = restored_img
        restored_img_np = np.array(out_images).astype(np.float32) / 255.0
        restored_img_tensor = torch.from_numpy(restored_img_np)
        return (restored_img_tensor,)
```