# Documentation
- Class name: XYtoPercent
- Category: 😺dzNodes/LayerUtility/Data
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

将绝对坐标转换为百分比坐标。


# Input types

## Required


- background_image
    - 背景图。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- layer_image
    - 图层图。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- x
    - x坐标。
    - Comfy dtype: INT
    - Python dtype: int

- y
    - y坐标。
    - Comfy dtype: INT
    - Python dtype: int

# Output types

- x_percent
    - x百分比坐标。
    - Comfy dtype: FLOAT
    - Python dtype: float   

- x_percent
    - y百分比坐标。
    - Comfy dtype: FLOAT
    - Python dtype: float


# Usage tips
- Infra type: CPU

# Source code
```
class XYtoPercent:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "background_image": ("IMAGE", ),  #
                "layer_image": ("IMAGE",),  #
                "x": ("INT", {"default": 0, "min": -99999, "max": 99999, "step": 1}),
                "y": ("INT", {"default": 0, "min": -99999, "max": 99999, "step": 1}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("FLOAT", "FLOAT",)
    RETURN_NAMES = ("x_percent", "x_percent",)
    FUNCTION = 'xy_to_percent'
    CATEGORY = '😺dzNodes/LayerUtility/Data'

    def xy_to_percent(self, background_image, layer_image, x, y,):

        _canvas = tensor2pil(background_image).convert('RGB')
        _layer = tensor2pil(layer_image).convert('RGB')
        x_percent = (x + _layer.width / 2) / _canvas.width * 100.0
        y_percent = (y + _layer.height / 2) / _canvas.height * 100.0

        return (x_percent, y_percent,)
```