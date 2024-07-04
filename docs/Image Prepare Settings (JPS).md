
# Documentation
- Class name: Image Prepare Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False
- Repo Ref: None specified

该节点旨在配置和准备图像设置，以便进行进一步处理或转换。它允许自定义各种参数，如调整大小、裁剪、填充，以及应用特定的图像调整（如锐化或插值），从而实现定制化的图像准备工作流程。

# Input types
## Required
- offset_width
    - 应用于图像的水平偏移量，用于精确定位或调整。
    - Comfy dtype: INT
    - Python dtype: int
- offset_height
    - 应用于图像的垂直偏移量，用于精确定位或调整。
    - Comfy dtype: INT
    - Python dtype: int
- crop_left
    - 从图像左侧裁剪的数量，允许定制图像构图。
    - Comfy dtype: INT
    - Python dtype: int
- crop_right
    - 从图像右侧裁剪的数量，允许定制图像构图。
    - Comfy dtype: INT
    - Python dtype: int
- crop_top
    - 从图像顶部裁剪的数量，允许定制图像构图。
    - Comfy dtype: INT
    - Python dtype: int
- crop_bottom
    - 从图像底部裁剪的数量，允许定制图像构图。
    - Comfy dtype: INT
    - Python dtype: int
- padding_left
    - 添加到图像左侧的填充量，适用于框架或特定布局要求。
    - Comfy dtype: INT
    - Python dtype: int
- padding_right
    - 添加到图像右侧的填充量，适用于框架或特定布局要求。
    - Comfy dtype: INT
    - Python dtype: int
- padding_top
    - 添加到图像顶部的填充量，适用于框架或特定布局要求。
    - Comfy dtype: INT
    - Python dtype: int
- padding_bottom
    - 添加到图像底部的填充量，适用于框架或特定布局要求。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation
    - 指定在调整大小或转换图像时使用的插值方法，影响图像的平滑度和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sharpening
    - 应用于图像的锐化程度，增强细节和清晰度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- imageprepare_settings
    - 配置好的图像准备设置，封装了所有将要应用的调整和转换。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, int, str, int, int, int, int, int, int, int, int, int, int, str, float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImagePrepare_Settings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
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
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("imageprepare_settings",)
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Settings"

    def get_imageprepare(self,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening):

        imageprepare_settings = offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening

        return(imageprepare_settings,)

```
