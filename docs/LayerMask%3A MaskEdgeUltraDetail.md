# Documentation
- Class name: MaskEdgeUltraDetail
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

处理较粗糙的遮罩使其获得超精细边缘。 本节点结合了spacepxl的[ComfyUI-Image-Filters](https://github.com/spacepxl/ComfyUI-Image-Filters)的Alpha Matte和Guided Filter Alpha两者功能，感谢原作者。

# Input types

## Required

- image
    - 输入的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 输入的遮罩。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

- method
    - 提供PyMatting和OpenCV-GuidedFilter两种方法处理边缘。PyMatting处理速度较慢，但是对于视频，建议使用这种方法获得更平滑的遮罩序列。
    - Comfy dtype: LIST
    - Python dtype: str

- mask_grow
    - 遮罩扩张幅度。正值是向外扩张，负值是向内收缩。对于较粗糙的遮罩，通常使用负值使其边缘收缩以获得更好的效果。
    - Comfy dtype: INT
    - Python dtype: int

- fix_gap
    - 修补遮罩中的空隙。如果遮罩中有比较明显的空隙，适当调高此数值。
    - Comfy dtype: INT
    - Python dtype: int

- fix_threshold
    - 修补遮罩的阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- detail_range
    - 边缘细节范围。
    - Comfy dtype: INT
    - Python dtype: int

- black_point
    - 边缘黑色采样阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- white_point
    - 边缘黑色采样阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types

- image
    - 输出的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 输出的遮罩。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class MaskEdgeUltraDetail:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        method_list = ['PyMatting', 'OpenCV-GuidedFilter']
        return {
            "required": {
                "image": ("IMAGE",),
                "mask": ("MASK",),
                "method": (method_list,),
                "mask_grow": ("INT", {"default": 0, "min": -999, "max": 999, "step": 1}),
                "fix_gap": ("INT", {"default": 0, "min": 0, "max": 32, "step": 1}),
                "fix_threshold": ("FLOAT", {"default": 0.75, "min": 0.01, "max": 0.99, "step": 0.01}),
                "detail_range": ("INT", {"default": 12, "min": 1, "max": 256, "step": 1}),
                "black_point": ("FLOAT", {"default": 0.01, "min": 0.01, "max": 0.98, "step": 0.01}),
                "white_point": ("FLOAT", {"default": 0.99, "min": 0.02, "max": 0.99, "step": 0.01}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK", )
    RETURN_NAMES = ("image", "mask", )
    FUNCTION = "mask_edge_ultra_detail"
    CATEGORY = '😺dzNodes/LayerMask'

    def mask_edge_ultra_detail(self, image, mask, method, mask_grow, fix_gap, fix_threshold,
                               detail_range, black_point, white_point,):
        ret_images = []
        ret_masks = []
        l_images = []
        l_masks = []
        if mask.dim() == 2:
            mask = torch.unsqueeze(mask, 0)
        for l in image:
            l_images.append(torch.unsqueeze(l, 0))
        for m in mask:
            l_masks.append(torch.unsqueeze(m, 0))
        if len(l_images) != len(l_masks) or tensor2pil(l_images[0]).size != tensor2pil(l_masks[0]).size:
            log(f"Error: {NODE_NAME} skipped, because mask does'nt match image.", message_type='error')
            return (image, mask,)

        for i in range(len(l_images)):
            _image = l_images[i]
            orig_image = tensor2pil(_image).convert('RGB')
            _image = pil2tensor(orig_image)
            _mask = l_masks[i]
            if mask_grow != 0:
                _mask = expand_mask(_mask, mask_grow, mask_grow//2)
            if fix_gap:
                _mask = mask_fix(_mask, 1, fix_gap, fix_threshold, fix_threshold)
            if method == 'OpenCV-GuidedFilter':
                _mask = guided_filter_alpha(_image, _mask, detail_range)
                _mask = tensor2pil(histogram_remap(_mask, black_point, white_point))
            else:
                _mask = tensor2pil(mask_edge_detail(_image, _mask, detail_range, black_point, white_point))

            ret_image = RGB2RGBA(orig_image, _mask.convert('L'))
            ret_images.append(pil2tensor(ret_image))
            ret_masks.append(image2mask(_mask))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0), torch.cat(ret_masks, dim=0),)
```