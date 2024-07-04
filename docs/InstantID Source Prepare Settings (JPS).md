
# Documentation
- Class name: InstantID Source Prepare Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False

InstantID Source Prepare Settings (JPS)节点旨在为InstantID生成过程中的源图像处理准备设置。它主要关注源图像的调整大小、裁剪和翻转等方面，以满足后续处理步骤的特定要求。

# Input types
## Required
- resize_to
    - 决定源图像的调整大小策略，影响图像如何缩放以适应所需尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- offset_width
    - 指定图像处理过程中应用的水平偏移量，调整图像的位置。
    - Comfy dtype: INT
    - Python dtype: int
- offset_height
    - 指定图像处理过程中应用的垂直偏移量，调整图像的位置。
    - Comfy dtype: INT
    - Python dtype: int
- crop_left
    - 定义从图像左侧裁剪的数量，调整其尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- crop_right
    - 定义从图像右侧裁剪的数量，调整其尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- crop_top
    - 定义从图像顶部裁剪的数量，调整其尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- crop_bottom
    - 定义从图像底部裁剪的数量，调整其尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation
    - 指定用于调整图像大小的插值方法，影响图像质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sharpening
    - 确定应用于图像的锐化程度，增强其细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- flip
    - 指示图像是否应水平或垂直翻转，改变其方向。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- imageprepare_settings
    - 封装了准备源图像的配置设置，包括调整大小、裁剪和翻转参数。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantIDSourcePrepare_Settings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "resize_to": (["Resize to Target","Keep Size"],),
                "offset_width": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "offset_height": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "crop_left": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_right": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_top": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_bottom": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "interpolation": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "sharpening": ("FLOAT", { "default": 0.0, "min": 0, "max": 1, "step": 0.05, "display": "number" }),
                "flip": (["No", "X-Axis", "Y-Axis"],),                
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("imageprepare_settings",)
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Settings"

    def get_imageprepare(self,resize_to,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,interpolation,sharpening,flip):

        resizeto = int (0)
        if(resize_to == "Keep Size"):
            resizeto = int(1)
        elif(resize_to == "Resize to Target"):
            resizeto = int(2)

        imageprepare_settings = resizeto, offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,interpolation,sharpening,flip

        return(imageprepare_settings,)

```
