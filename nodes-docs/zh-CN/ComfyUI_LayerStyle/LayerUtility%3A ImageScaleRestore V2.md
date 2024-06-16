# Documentation
- Class name: ImageScaleRestoreV2
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

V2 将图像或遮罩按宽高比缩放。可设置将缩放后的尺寸按8或者16的倍数取整，可按长边尺寸缩放。

# Input types

## Required

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- scale
    - 缩放比例。
    - Comfy dtype: FLOAT
    - Python dtype: float

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

- scale_by
    - 缩放方式。
    - Comfy dtype: STRING_ONEOF
    - Python dtype: str
    - Options:
        - by_scale
        - longest
        - shortest
        - width
        - height
        - total_pixel(kilo pixel)

- scale_by_length
    - 缩放长度。
    - Comfy dtype: INT
    - Python dtype: int

## Optional

- mask
    - 蒙版。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

- original_size
    - 原始尺寸。
    - Comfy dtype: BOX
    - Python dtype: List[int]

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
class ImageScaleRestoreV2:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        method_mode = ['lanczos', 'bicubic', 'hamming', 'bilinear', 'box', 'nearest']
        scale_by_list = ['by_scale', 'longest', 'shortest', 'width', 'height', 'total_pixel(kilo pixel)']
        return {
            "required": {
                "image": ("IMAGE", ),  #
                "scale": ("FLOAT", {"default": 1, "min": 0.01, "max": 100, "step": 0.01}),
                "method": (method_mode,),
                "scale_by": (scale_by_list,),  # 是否按长边缩放
                "scale_by_length": ("INT", {"default": 1024, "min": 4, "max": 99999999, "step": 1}),
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
                            scale_by, scale_by_length,
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
            if scale_by == 'longest':
                if orig_width > orig_height:
                    target_width = scale_by_length
                    target_height = int(target_width * orig_height / orig_width)
                else:
                    target_height = scale_by_length
                    target_width = int(target_height * orig_width / orig_height)
            if scale_by == 'shortest':
                if orig_width < orig_height:
                    target_width = scale_by_length
                    target_height = int(target_width * orig_height / orig_width)
                else:
                    target_height = scale_by_length
                    target_width = int(target_height * orig_width / orig_height)
            if scale_by == 'width':
                target_width = scale_by_length
                target_height = int(target_width * orig_height / orig_width)
            if scale_by == 'height':
                target_height = scale_by_length
                target_width = int(target_height * orig_width / orig_height)
            if scale_by == 'total_pixel(kilo pixel)':
                r = orig_width / orig_height
                target_width = math.sqrt(r * scale_by_length * 1000)
                target_height = target_width / r
                target_width = int(target_width)
                target_height = int(target_height)
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