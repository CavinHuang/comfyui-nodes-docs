
# Documentation
- Class name: InstantID Source Prepare Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

本节点旨在通过一系列变换（如调整大小、裁剪和翻转）来准备InstantID处理所需的源图像。它允许对图像准备过程进行详细定制，以满足InstantID分析的特定要求。

# Input types
## Required
- imageprepare_settings
    - 指定准备源图像的设置，包括调整大小、裁剪和翻转参数。这个配置直接影响输出图像的尺寸和外观，使其适合InstantID处理。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, int, int, int, int, int, int, str, float, str]

# Output types
- resize_to
    - 源图像将被调整到的目标尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- offset_width
    - 图像准备过程中应用的水平偏移量。
    - Comfy dtype: INT
    - Python dtype: int
- offset_height
    - 图像准备过程中应用的垂直偏移量。
    - Comfy dtype: INT
    - Python dtype: int
- crop_left
    - 从图像左侧裁剪的像素数量。
    - Comfy dtype: INT
    - Python dtype: int
- crop_right
    - 从图像右侧裁剪的像素数量。
    - Comfy dtype: INT
    - Python dtype: int
- crop_top
    - 从图像顶部裁剪的像素数量。
    - Comfy dtype: INT
    - Python dtype: int
- crop_bottom
    - 从图像底部裁剪的像素数量。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation
    - 用于调整图像大小的方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sharpening
    - 应用于图像的锐化程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- flip
    - 指定是否应翻转图像以及沿哪个轴翻转。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantIDSourcePrepare_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "imageprepare_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("INT","INT","INT","INT","INT","INT","INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],"FLOAT",["No", "X-Axis", "Y-Axis"],)
    RETURN_NAMES = ("resize_to","offset_width","offset_height","crop_left","crop_right","crop_top","crop_bottom","interpolation","sharpening","flip",)
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Pipes"

    def get_imageprepare(self,imageprepare_settings):

        resizeto,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,interpolation,sharpening,flip = imageprepare_settings

        return(resizeto,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,interpolation,sharpening,flip)

```
