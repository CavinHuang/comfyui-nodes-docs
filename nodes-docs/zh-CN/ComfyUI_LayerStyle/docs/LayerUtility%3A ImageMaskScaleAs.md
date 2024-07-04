# Documentation
- Class name: ImageMaskScaleAs
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

将图像或遮罩缩放到参考图像（或遮罩）的大小。

# Input types

## Required

- scale_as
    - 参考大小。可以是图像image，也可以是遮罩mask。
    - Comfy dtype: ANY
    - Python dtype: torch.Tensor

- fit
    - 缩放画幅宽高比模式。当原图与缩放尺寸画幅宽高比例不一致时，有3种模式可以选择, letterbox模式保留完整的画幅，空白处用黑色补足；crop模式保留完整的短边，长边超出部分将被切除；fill模式不保持画幅比例，宽高各自填满画面。
    - Comfy dtype: STRING_ONEOF
    - Python dtype: str
    - Options:
        - letterbox
        - crop
        - fill

- method
    - 缩放的采样方法，包括lanczos、bicubic、hamming、bilinear、box和nearest。
    - Comfy dtype: STRING_ONEOF
    - Python dtype: str
    - Options:
        - lanczos
        - bicubic
        - hamming
        - bilinear
        - box
        - nearest

## Optional

- image
    - 待缩放的图像。此选项为可选输入，如果没有输入将输出纯黑图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 待缩放的遮罩。此选项为可选输入，如果没有输入将输出纯黑遮罩。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types

- image
    - 缩放后的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 缩放后的蒙版。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

- original_size
    - 原始尺寸。
    - Comfy dtype: BOX
    - Python dtype: List[int]

- width
    - 目标宽度。
    - Comfy dtype: INT
    - Python dtype: int

- height
    - 目标高度。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```python
class ImageMaskScaleAs:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        fit_mode = ['letterbox', 'crop', 'fill']
        method_mode = ['lanczos', 'bicubic', 'hamming', 'bilinear', 'box', 'nearest']

        return {
            "required": {
                "scale_as": (any, {}),
                "fit": (fit_mode,),
                "method": (method_mode,),
            },
            "optional": {
                "image": ("IMAGE",),  #
                "mask": ("MASK",),  #
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK", "BOX", "INT", "INT")
    RETURN_NAMES = ("image", "mask", "original_size", "widht", "height",)
    FUNCTION = 'image_mask_scale_as'
    CATEGORY = '😺dzNodes/LayerUtility'

    def image_mask_scale_as(self, scale_as, fit, method,
                            image=None, mask=None,
                            ):
        if scale_as.shape[0] > 0:
            _asimage = tensor2pil(scale_as[0])
        else:
            _asimage = tensor2pil(scale_as)
        target_width, target_height = _asimage.size
        _mask = Image.new('L', size=_asimage.size, color='black')
        _image = Image.new('RGB', size=_asimage.size, color='black')
        orig_width = 4
        orig_height = 4
        resize_sampler = Image.LANCZOS
        if method == "bicubic":
            resize_sampler = Image.BICUBIC
        elif method == "hamming":
            resize_sampler = Image.HAMMING
        elif method == "bilinear":
            resize_sampler = Image.BILINEAR
        elif method == "box":
            resize_sampler = Image.BOX
        elif method == "nearest":
            resize_sampler = Image.NEAREST

        ret_images = []
        ret_masks = []

        if image is not None:
            for i in image:
                i = torch.unsqueeze(i, 0)
                _image = tensor2pil(i).convert('RGB')
                orig_width, orig_height = _image.size
                _image = fit_resize_image(_image, target_width, target_height, fit, resize_sampler)
                ret_images.append(pil2tensor(_image))
        if mask is not None:
            if mask.dim() == 2:
                mask = torch.unsqueeze(mask, 0)
            for m in mask:
                m = torch.unsqueeze(m, 0)
                _mask = tensor2pil(m).convert('L')
                orig_width, orig_height = _mask.size
                _mask = fit_resize_image(_mask, target_width, target_height, fit, resize_sampler).convert('L')
                ret_masks.append(image2mask(_mask))
        if len(ret_images) > 0 and len(ret_masks) > 0:
            log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
            return (torch.cat(ret_images, dim=0), torch.cat(ret_masks, dim=0), [orig_width, orig_height], target_width, target_height,)
        elif len(ret_images) > 0 and len(ret_masks) == 0:
            log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
            return (torch.cat(ret_images, dim=0), None, [orig_width, orig_height], target_width, target_height,)
        elif len(ret_images) == 0 and len(ret_masks) > 0:
            log(f"{NODE_NAME} Processed {len(ret_masks)} image(s).", message_type='finish')
            return (None, torch.cat(ret_masks, dim=0), [orig_width, orig_height], target_width, target_height,)
        else:
            log(f"Error: {NODE_NAME} skipped, because the available image or mask is not found.", message_type='error')
            return (None, None, [orig_width, orig_height], 0, 0,)
```