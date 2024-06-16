# Documentation
- Class name: ImageScaleByAspectRatioV2
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

ImageScaleByAspectRatio的V2升级版

# Input types

## Required

- aspect_ratio
    - 目标宽高比。
    - Comfy dtype: STRING_ONEOF
    - Python dtype: str
    - Options:
        - original
        - custom
        - 1:1
        - 3:2
        - 4:3
        - 16:9
        - 2:3
        - 3:4
        - 9:16

- proportional_width
    - 自定义宽度比例。
    - Comfy dtype: INT
    - Python dtype: int

- proportional_height
    - 自定义高度比例。
    - Comfy dtype: INT
    - Python dtype: int

- fit
    - 适配方式。
    - Comfy dtype: STRING_ONEOF
    - Python dtype: str
    - Options:
        - letterbox
        - crop
        - fill

- method
    - 采样方式。
    - Comfy dtype: STRING_ONEOF
    - Python dtype: str
    - Options:
        - lanczos
        - bicubic
        - hamming
        - bilinear
        - box
        - nearest

- round_to_multiple
    - 四舍五入到倍数。
    - Comfy dtype: STRING_ONEOF
    - Python dtype: str
    - Options:
        - 8
        - 16
        - 32
        - 64
        - None

- scale_to_side
    - 允许按长边、短边、宽度、高度或总像素指定尺寸缩放。
    - Comfy dtype: STRING_ONEOF
    - Python dtype: str
    - Options:
        - None
        - longest
        - shortest
        - width
        - height
        - total_pixel(kilo pixel)

- scale_to_length
    - 这里的数值作为scale_to_side指定边的长度, 或者总像素数量(kilo pixels)。
    - Comfy dtype: INT
    - Python dtype: int

## Optional

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 蒙版。
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
class ImageScaleByAspectRatioV2:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        ratio_list = ['original', 'custom', '1:1', '3:2', '4:3', '16:9', '2:3', '3:4', '9:16']
        fit_mode = ['letterbox', 'crop', 'fill']
        method_mode = ['lanczos', 'bicubic', 'hamming', 'bilinear', 'box', 'nearest']
        multiple_list = ['8', '16', '32', '64', 'None']
        scale_to_list = ['None', 'longest', 'shortest', 'width', 'height', 'total_pixel(kilo pixel)']
        return {
            "required": {
                "aspect_ratio": (ratio_list,),
                "proportional_width": ("INT", {"default": 1, "min": 1, "max": 999, "step": 1}),
                "proportional_height": ("INT", {"default": 1, "min": 1, "max": 999, "step": 1}),
                "fit": (fit_mode,),
                "method": (method_mode,),
                "round_to_multiple": (multiple_list,),
                "scale_to_side": (scale_to_list,),  # 是否按长边缩放
                "scale_to_length": ("INT", {"default": 1024, "min": 4, "max": 999999, "step": 1}),
            },
            "optional": {
                "image": ("IMAGE",),  #
                "mask": ("MASK",),  #
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK", "BOX", "INT", "INT",)
    RETURN_NAMES = ("image", "mask", "original_size", "width", "height",)
    FUNCTION = 'image_scale_by_aspect_ratio'
    CATEGORY = '😺dzNodes/LayerUtility'

    def image_scale_by_aspect_ratio(self, aspect_ratio, proportional_width, proportional_height,
                                    fit, method, round_to_multiple, scale_to_side, scale_to_length,
                                    image=None, mask = None,
                                    ):
        orig_images = []
        orig_masks = []
        orig_width = 0
        orig_height = 0
        target_width = 0
        target_height = 0
        ratio = 1.0
        ret_images = []
        ret_masks = []
        if image is not None:
            for i in image:
                i = torch.unsqueeze(i, 0)
                orig_images.append(i)
            orig_width, orig_height = tensor2pil(orig_images[0]).size
        if mask is not None:
            if mask.dim() == 2:
                mask = torch.unsqueeze(mask, 0)
            for m in mask:
                m = torch.unsqueeze(m, 0)
                orig_masks.append(m)
            _width, _height = tensor2pil(orig_masks[0]).size
            if (orig_width > 0 and orig_width != _width) or (orig_height > 0 and orig_height != _height):
                log(f"Error: {NODE_NAME} skipped, because the mask is does'nt match image.", message_type='error')
                return (None, None, None, 0, 0,)
            elif orig_width + orig_height == 0:
                orig_width = _width
                orig_height = _height

        if orig_width + orig_height == 0:
            log(f"Error: {NODE_NAME} skipped, because the image or mask at least one must be input.", message_type='error')
            return (None, None, None, 0, 0,)

        if aspect_ratio == 'original':
            ratio = orig_width / orig_height
        elif aspect_ratio == 'custom':
            ratio = proportional_width / proportional_height
        else:
            s = aspect_ratio.split(":")
            ratio = int(s[0]) / int(s[1])

        # calculate target width and height
        if ratio > 1:
            if scale_to_side == 'longest':
                target_width = scale_to_length
                target_height = int(target_width / ratio)
            elif scale_to_side == 'shortest':
                target_height = scale_to_length
                target_width = int(target_height * ratio)
            elif scale_to_side == 'width':
                target_width = scale_to_length
                target_height = int(target_width / ratio)
            elif scale_to_side == 'height':
                target_height = scale_to_length
                target_width = int(target_height * ratio)
            elif scale_to_side == 'total_pixel(kilo pixel)':
                target_width = math.sqrt(ratio * scale_to_length * 1000)
                target_height = target_width / ratio
                target_width = int(target_width)
                target_height = int(target_height)
            else:
                target_width = orig_width
                target_height = int(target_width / ratio)
        else:
            if scale_to_side == 'longest':
                target_height = scale_to_length
                target_width = int(target_height * ratio)
            elif scale_to_side == 'shortest':
                target_width = scale_to_length
                target_height = int(target_width / ratio)
            elif scale_to_side == 'width':
                target_width = scale_to_length
                target_height = int(target_width / ratio)
            elif scale_to_side == 'height':
                target_height = scale_to_length
                target_width = int(target_height * ratio)
            elif scale_to_side == 'total_pixel(kilo pixel)':
                target_width = math.sqrt(ratio * scale_to_length * 1000)
                target_height = target_width / ratio
                target_width = int(target_width)
                target_height = int(target_height)
            else:
                target_height = orig_height
                target_width = int(target_height * ratio)

        if round_to_multiple != 'None':
            multiple = int(round_to_multiple)
            target_width = num_round_to_multiple(target_width, multiple)
            target_height = num_round_to_multiple(target_height, multiple)

        _mask = Image.new('L', size=(target_width, target_height), color='black')
        _image = Image.new('RGB', size=(target_width, target_height), color='black')

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

        if len(orig_images) > 0:
            for i in orig_images:
                _image = tensor2pil(i).convert('RGB')
                _image = fit_resize_image(_image, target_width, target_height, fit, resize_sampler)
                ret_images.append(pil2tensor(_image))
        if len(orig_masks) > 0:
            for m in orig_masks:
                _mask = tensor2pil(m).convert('L')
                _mask = fit_resize_image(_mask, target_width, target_height, fit, resize_sampler).convert('L')
                ret_masks.append(image2mask(_mask))
        if len(ret_images) > 0 and len(ret_masks) >0:
            log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
            return (torch.cat(ret_images, dim=0), torch.cat(ret_masks, dim=0),[orig_width, orig_height], target_width, target_height,)
        elif len(ret_images) > 0 and len(ret_masks) == 0:
            log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
            return (torch.cat(ret_images, dim=0), None, [orig_width, orig_height], target_width, target_height,)
        elif len(ret_images) == 0 and len(ret_masks) > 0:
            log(f"{NODE_NAME} Processed {len(ret_masks)} image(s).", message_type='finish')
            return (None, torch.cat(ret_masks, dim=0), [orig_width, orig_height], target_width, target_height,)
        else:
            log(f"Error: {NODE_NAME} skipped, because the available image or mask is not found.", message_type='error')
            return (None, None, None, 0, 0,)
```