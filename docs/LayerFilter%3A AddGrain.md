# Documentation
- Class name: AddGrain
- Category: 😺dzNodes/LayerFilter
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

给图片增加噪声。

# Input types

## Required

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- grain_power
    - 噪声强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

- grain_scale
    - 噪声的大小。
    - Comfy dtype: FLOAT
    - Python dtype: float

- grain_sat
    - 噪声的色彩饱和度。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Optional

- 无

# Output types

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class AddGrain:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE", ),  #
                "grain_power": ("FLOAT", {"default": 0.5, "min": 0, "max": 1, "step": 0.01}),
                "grain_scale": ("FLOAT", {"default": 1, "min": 0.1, "max": 10, "step": 0.1}),
                "grain_sat": ("FLOAT", {"default": 1, "min": 0, "max": 1, "step": 0.01}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'add_grain'
    CATEGORY = '😺dzNodes/LayerFilter'

    def add_grain(self, image, grain_power, grain_scale, grain_sat):

        ret_images = []

        for i in image:
            _canvas = tensor2pil(torch.unsqueeze(i, 0)).convert('RGB')
            _canvas = image_add_grain(_canvas, grain_scale, grain_power, grain_sat, toe=0, seed=int(time.time()))
            ret_images.append(pil2tensor(_canvas))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)
```