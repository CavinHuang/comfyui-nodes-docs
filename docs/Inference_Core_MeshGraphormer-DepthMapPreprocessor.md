
# Documentation
- Class name: Inference_Core_MeshGraphormer-DepthMapPreprocessor
- Category: ControlNet Preprocessors/Normal and Depth Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

此节点旨在对图像进行预处理，以便使用MeshGraphormer模型生成深度图和进行手部姿势估计。它负责将输入图像转换为适合模型的格式，执行推理以生成深度图和蒙版，并处理这些输出以便在手部细化任务中进一步使用。

# Input types
## Required
- image
    - 需要处理以生成深度图和蒙版的输入图像或图像批次。它在节点执行过程中起着关键作用，直接影响生成的深度图和蒙版的质量和准确性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- mask_bbox_padding
    - 决定检测到的边界框周围的填充量，影响生成的蒙版的大小和覆盖范围。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 指定执行深度图和蒙版检测的分辨率，影响输出的细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- mask_type
    - 定义蒙版生成策略，可以基于深度值或紧凑边界框，影响蒙版的形状和覆盖范围。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- mask_expand
    - 控制蒙版超出其原始边界的扩展，有助于确保深度图中手部区域的完整覆盖。
    - Comfy dtype: INT
    - Python dtype: int
- rand_seed
    - 随机数生成的种子值，确保蒙版生成过程的可重复性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 深度图和蒙版生成后的处理图像，可用于进一步分析或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- INPAINTING_MASK
    - 指示需要进行修复或进一步处理的区域的蒙版，通常突出显示感兴趣的区域，如手部。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


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
                "rand_seed": ("INT", {"default": 88, "min": 0, "max": 0xffffffffffffffff})
            }
        )
        return types

    RETURN_TYPES = ("IMAGE", "MASK")
    RETURN_NAMES = ("IMAGE", "INPAINTING_MASK")
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Normal and Depth Estimators"

    def execute(self, image, mask_bbox_padding=30, mask_type="based_on_depth", mask_expand=5, resolution=512, rand_seed=88, **kwargs):
        install_deps()
        from controlnet_aux.mesh_graphormer import MeshGraphormerDetector
        model = MeshGraphormerDetector.from_pretrained().to(model_management.get_torch_device())
        
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
