# Documentation
- Class name: GradientImage
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

生成一张指定大小和指定颜色渐变的图片。

# Input types
## Required

- width
    - 图片的宽度。
    - Comfy dtype: INT
    - Python dtype: int

- height
    - 图片的高度。
    - Comfy dtype: INT
    - Python dtype: int

- angle
    - 渐变的角度。
    - Comfy dtype: INT
    - Python dtype: int

- start_color
    - 渐变的起始颜色。
    - Comfy dtype: STRING
    - Python dtype: str

- end_color
    - 渐变的结束颜色。
    - Comfy dtype: STRING
    - Python dtype: str


# Output types

- image
    - 生成的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class GradientImage:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "width": ("INT", {"default": 512, "min": 4, "max": 99999, "step": 1}),
                "height": ("INT", {"default": 512, "min": 4, "max": 99999, "step": 1}),
                "angle": ("INT", {"default": 0, "min": -360, "max": 360, "step": 1}),
                "start_color": ("STRING", {"default": "#FFFFFF"},),
                "end_color": ("STRING", {"default": "#000000"},),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE", )
    RETURN_NAMES = ("image", )
    FUNCTION = 'gradient_image'
    CATEGORY = '😺dzNodes/LayerUtility'

    def gradient_image(self, width, height, angle, start_color, end_color, ):

        ret_image = gradient(start_color, end_color, width, height, angle)

        return (pil2tensor(ret_image), )
```