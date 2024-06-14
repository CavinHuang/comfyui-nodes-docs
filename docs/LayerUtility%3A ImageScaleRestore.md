# Documentation
- Class name: ImageScaleByAspectRatio
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

将图像或遮罩按宽高比缩放。可设置将缩放后的尺寸按8或者16的倍数取整，可按长边尺寸缩放。

# Input types

## Required

- aspect_ratio
    - 宽高比。此处提供了几个常见画幅比例。也可选"original"保持原图比例或者"custom"自定义比例。
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
    - 比例宽。如果aspect_ratio选项不是"custom"，此处设置将被忽略。
    - Comfy dtype: INT
    - Python dtype: int

- proportional_height
    - 比例高。如果aspect_ratio选项不是"custom"，此处设置将被忽略。
    - Comfy dtype: INT
    - Python dtype: int

- fit
    - 缩放画幅宽高比模式。有3种模式可以选择, letterbox模式保留完整的画幅，空白处用黑色补足；crop模式保留完整的短边，长边超出部分将被切除；fill模式不保持画幅比例，宽高各自填满画面。
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

- round_to_multiple
    - 倍数取整。例如设置为8，宽和高将强制设置为8的倍数。
    - Comfy dtype: STRING_ONEOF
    - Python dtype: str
    - Options:
        - 8
        - 16
        - 32
        - 64
        - None

- scale_to_longest_side
    - 是否按长边尺寸缩放。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- longest_side
    - scale_to_longest_side被设置为True时，此项将作为是图像长边的长度。
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
class ImageScaleRestore:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        method_mode = ['lanczos', 'bicubic', 'hamming', 'bilinear', 'box', 'nearest']
        return {
            "required": {
                "image": ("IMAGE", ),  #
                "scale": ("FLOAT", {"default": 1, "min": 0.01, "max": 100, "step": 0.01}),
                "method": (method_mode,),
                "scale_by_longest_side": ("BOOLEAN", {"default": False}),  # 是否按长边缩放
                "longest_side": ("INT", {"default": 1024, "min": 4, "max": 999999, "step": 1}),
            },
            "optional": {
                "mask": ("MASK",),  #
                "original_size": ("BOX",),
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK", "BOX", "INT", "INT")
    RETURN_NAMES = ("image", "mask", "original_size", "width", "height",)
    FUNCTION = 'image_scale_restore'
    CATEGORY = '😺dzNodes/LayerUtility'

    def image_scale_restore(self, image, scale, method,
                            scale_by_longest_side, longest_side,
                            mask = None,  original_size = None
                            ):

        l_images = []
        l_masks = []
        ret_images = []
        ret_masks = []
        for l in image:
            l_images.append(torch.unsqueeze(l, 0))
            m = tensor2pil(l)
            if m.mode == 'RGBA':
                l_masks.append(m.split()[-1])

        if mask is not None:
            if mask.dim() == 2:
                mask = torch.unsqueeze(mask, 0)
            l_masks = []
            for m in mask:
                l_masks.append(tensor2pil(torch.unsqueeze(m, 0)).convert('L'))

        max_batch = max(len(l_images), len(l_masks))

        orig_width, orig_height = tensor2pil(l_images[0]).size
        if original_size is not None:
            target_width = original_size[0]
            target_height = original_size[1]
        else:
            target_width = int(orig_width * scale)
            target_height = int(orig_height * scale)
            if scale_by_longest_side:
                if orig_width > orig_height:
                    target_width = longest_side
                    target_height = int(target_width * orig_height / orig_width)
                else:
                    target_height = longest_side
                    target_width = int(target_height * orig_width / orig_height)
        if target_width < 4:
            target_width = 4
        if target_height < 4:
            target_height = 4
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

        for i in range(max_batch):

            _image = l_images[i] if i < len(l_images) else l_images[-1]

            _canvas = tensor2pil(_image).convert('RGB')
            ret_image = _canvas.resize((target_width, target_height), resize_sampler)
            ret_mask = Image.new('L', size=ret_image.size, color='white')
            if mask is not None:
                _mask = l_masks[i] if i < len(l_masks) else l_masks[-1]
                ret_mask = _mask.resize((target_width, target_height), resize_sampler)

            ret_images.append(pil2tensor(ret_image))
            ret_masks.append(image2mask(ret_mask))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0), torch.cat(ret_masks, dim=0), [orig_width, orig_height], target_width, target_height,)
```