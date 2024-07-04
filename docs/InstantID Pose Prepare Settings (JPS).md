
# Documentation
- Class name: InstantID Pose Prepare Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

InstantID Pose Prepare Settings (JPS)节点用于为InstantID姿势处理配置图像准备设置。它允许用户指定与图像准备相关的各种参数，如调整大小、裁剪、填充等，以确保图像为姿势检测和分析做好最佳准备。

# Input types
## Required
- resize_to
    - 决定如何调整图像大小，选项包括"保持大小"、"调整为目标大小"和"调整为源大小"，影响准备后图像的最终尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- offset_width
    - 指定应用于图像的水平偏移量，调整其位置。
    - Comfy dtype: INT
    - Python dtype: int
- offset_height
    - 指定应用于图像的垂直偏移量，调整其位置。
    - Comfy dtype: INT
    - Python dtype: int
- crop_left
    - 定义从图像左侧裁剪的数量，调整其可见区域。
    - Comfy dtype: INT
    - Python dtype: int
- crop_right
    - 定义从图像右侧裁剪的数量，调整其可见区域。
    - Comfy dtype: INT
    - Python dtype: int
- crop_top
    - 定义从图像顶部裁剪的数量，调整其可见区域。
    - Comfy dtype: INT
    - Python dtype: int
- crop_bottom
    - 定义从图像底部裁剪的数量，调整其可见区域。
    - Comfy dtype: INT
    - Python dtype: int
- padding_left
    - 指定要添加到图像左侧的填充量，扩展其边界。
    - Comfy dtype: INT
    - Python dtype: int
- padding_right
    - 指定要添加到图像右侧的填充量，扩展其边界。
    - Comfy dtype: INT
    - Python dtype: int
- padding_top
    - 指定要添加到图像顶部的填充量，扩展其边界。
    - Comfy dtype: INT
    - Python dtype: int
- padding_bottom
    - 指定要添加到图像底部的填充量，扩展其边界。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation
    - 确定用于调整大小或转换图像的方法，如"最近邻"、"双线性"等。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sharpening
    - 指定应用于图像的锐化效果的强度，增强其细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- flip
    - 指示图像是否应水平翻转、垂直翻转或不翻转，影响其方向。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- imageprepare_settings
    - 包含所有指定的图像准备设置的元组，可直接应用于姿势处理。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantIDPosePrepare_Settings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "resize_to": (["Resize to Target","Resize to Source","Keep Size"],),
                "offset_width": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "offset_height": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "crop_left": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_right": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_top": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_bottom": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "padding_left": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_right": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_top": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_bottom": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "interpolation": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "sharpening": ("FLOAT", { "default": 0.0, "min": 0, "max": 1, "step": 0.05, "display": "number" }),
                "flip": (["No", "X-Axis", "Y-Axis"],),      
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("imageprepare_settings",)
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Settings"

    def get_imageprepare(self,resize_to,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening,flip):

        resizeto = int (0)
        if(resize_to == "Keep Size"):
            resizeto = int(1)
        elif(resize_to == "Resize to Target"):
            resizeto = int(2)
        elif(resize_to == "Resize to Source"):
            resizeto = int(3)

        imageprepare_settings = resizeto, offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening,flip

        return(imageprepare_settings,)

```
