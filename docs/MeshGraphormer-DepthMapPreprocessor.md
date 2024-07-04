
# Documentation
- Class name: MeshGraphormer-DepthMapPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

MeshGraphormer-DepthMapPreprocessor节点设计用于精细化手部深度图和预测图像空间中的2D关节位置，使用基于Graphormer的模型。它处理输入图像以生成增强的深度图和相应的掩码，利用深度学习技术提高手部姿势估计的准确性。

# Input types
## Required
- image
    - 要处理的输入图像，用于手部深度图精细化和2D关节位置预测。它是节点操作的主要数据来源。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- mask_bbox_padding
    - 此参数定义了检测到的手部边界框周围的填充，用于掩码生成，影响输出掩码的大小和覆盖范围。它确保掩码充分包围手部区域，以便进行准确的深度图精细化。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 指定处理输入图像的分辨率。此参数影响生成的深度图和掩码的细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- mask_type
    - 指定从深度图生成掩码的方法，提供如'based_on_depth'（基于深度的掩码）、'tight_bboxes'（基于紧凑边界框的掩码）和'original'（使用原始掩码）等选项。这个选择影响掩码生成策略和最终输出质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- mask_expand
    - 确定掩码超出其原始边界的扩展大小，影响输出中掩码的覆盖区域。此参数允许微调掩码大小以更好地进行深度图精细化。
    - Comfy dtype: INT
    - Python dtype: int
- rand_seed
    - 用于确保掩码和深度图生成过程中的可重复性的随机种子。它有助于在使用相同输入多次运行节点时保持一致性。
    - Comfy dtype: INT
    - Python dtype: int
- detect_thr
    - Graphormer模型的检测阈值，决定了输入图像中手部检测的敏感度。这个参数影响模型在各种条件下准确识别手部的能力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- presence_thr
    - Graphormer模型的存在阈值，影响模型对输入图像中检测到的手部存在的置信度。它在确保深度图和2D关节预测的可靠性方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- IMAGE
    - 输入图像中每个检测到的手部的精细化深度图，提供增强的细节和准确性，用于手部姿势估计。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- INPAINTING_MASK
    - 与输入图像中检测到的手部对应的生成掩码，用于在深度图精细化中隔离手部区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)



## Source code
```python
class Mesh_Graphormer_Depth_Map_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        types = create_node_input_types(mask_bbox_padding=("INT", {"default": 30, "min": 0, "max": 100}))
        types["optional"].update(
            {
                "mask_type": (["based_on_depth", "tight_bboxes", "original"], {"default": "based_on_depth"}),
                "mask_expand": ("INT", {"default": 5, "min": -MAX_RESOLUTION, "max": MAX_RESOLUTION, "step": 1}),
                "rand_seed": ("INT", {"default": 88, "min": 0, "max": 0xffffffffffffffff}),
                "detect_thr": ("FLOAT", {"default": 0.6, "min": 0, "max": 1, "step": 0.01}),
                "presence_thr": ("FLOAT", {"default": 0.6, "min": 0, "max": 1, "step": 0.01}),
            }
        )
        return types

    RETURN_TYPES = ("IMAGE", "MASK")
    RETURN_NAMES = ("IMAGE", "INPAINTING_MASK")
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, mask_bbox_padding=30, mask_type="based_on_depth", mask_expand=5, resolution=512, rand_seed=88, detect_thr=0.6, presence_thr=0.6, **kwargs):
        install_deps()
        from controlnet_aux.mesh_graphormer import MeshGraphormerDetector
        model = MeshGraphormerDetector.from_pretrained(detect_thr=detect_thr, presence_thr=presence_thr).to(model_management.get_torch_device())
        
        depth_map_list = []
        mask_list = []
        for single_image in image:
            np_image = np.asarray(single_image.cpu() * 255., dtype=np.uint8)
            depth_map, mask, info = model(np_image, output_type="np", detect_resolution=resolution, mask_bbox_padding=mask_bbox_padding, seed=rand_seed)
            if mask_type == "based_on_depth":
                H, W = mask.shape[:2]
                mask = cv2.resize(depth_map.copy(), (W, H))
                mask[mask > 0] = 255

            elif mask_type == "tight_bboxes":
                mask = np.zeros_like(mask)
                hand_bboxes = info["abs_boxes"]
                for hand_bbox in hand_bboxes: 
                    x_min, x_max, y_min, y_max = hand_bbox
                    mask[y_min:y_max+1, x_min:x_max+1, :] = 255 #HWC

            mask = mask[:, :, :1]
            depth_map_list.append(torch.from_numpy(depth_map.astype(np.float32) / 255.0))
            mask_list.append(torch.from_numpy(mask.astype(np.float32) / 255.0))
        depth_maps, masks = torch.stack(depth_map_list, dim=0), rearrange(torch.stack(mask_list, dim=0), "n h w 1 -> n 1 h w")
        return depth_maps, expand_mask(masks, mask_expand, tapered_corners=True)

```
