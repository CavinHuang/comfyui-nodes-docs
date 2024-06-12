# Documentation
- Class name: ColorImage
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

生成一张指定颜色和大小的图片。

# Input types

## Required

- width
    - 图片的宽度。
    - Comfy dtype: INT
    - Python dtype: int
    - Options: {"default": 512, "min": 4, "max": 99999, "step": 1}

- height
    - 图片的高度。
    - Comfy dtype: INT
    - Python dtype: int
    - Options: {"default": 512, "min": 4, "max": 99999, "step": 1}

- color
    - 图片的颜色。
    - Comfy dtype: STRING
    - Python dtype: str
    - Options: {"default": "#000000"}


# Output types

- image
    - 输出的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ColorImage:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "width": ("INT", {"default": 512, "min": 4, "max": 99999, "step": 1}),
                "height": ("INT", {"default": 512, "min": 4, "max": 99999, "step": 1}),
                "color": ("STRING", {"default": "#000000"},),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE", )
    RETURN_NAMES = ("image", )
    FUNCTION = 'color_image'
    CATEGORY = '😺dzNodes/LayerUtility'

    def color_image(self, width, height, color, ):

        ret_image = Image.new('RGB', (width, height), color=color)
        return (pil2tensor(ret_image), )
```