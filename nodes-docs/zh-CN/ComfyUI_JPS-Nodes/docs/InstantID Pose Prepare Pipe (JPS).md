
# Documentation
- Class name: InstantID Pose Prepare Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

InstantIDPosePrepare_Pipe节点专门用于为即时ID生成过程中的姿势估计准备图像设置。它处理各种图像准备参数,如调整大小、裁剪、填充和插值,以优化图像用于后续的姿势分析。

# Input types
## Required
- imageprepare_settings
    - 指定用于准备图像的设置,包括调整大小、裁剪、填充和插值,这对于优化图像用于姿势估计至关重要。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[str]

# Output types
- resize_to
    - 图像应调整到的目标大小。
    - Comfy dtype: INT
    - Python dtype: int
- offset_width
    - 应用于图像的宽度偏移量。
    - Comfy dtype: INT
    - Python dtype: int
- offset_height
    - 应用于图像的高度偏移量。
    - Comfy dtype: INT
    - Python dtype: int
- crop_left
    - 从图像左侧裁剪的数量。
    - Comfy dtype: INT
    - Python dtype: int
- crop_right
    - 从图像右侧裁剪的数量。
    - Comfy dtype: INT
    - Python dtype: int
- crop_top
    - 从图像顶部裁剪的数量。
    - Comfy dtype: INT
    - Python dtype: int
- crop_bottom
    - 从图像底部裁剪的数量。
    - Comfy dtype: INT
    - Python dtype: int
- padding_left
    - 添加到图像左侧的填充量。
    - Comfy dtype: INT
    - Python dtype: int
- padding_right
    - 添加到图像右侧的填充量。
    - Comfy dtype: INT
    - Python dtype: int
- padding_top
    - 添加到图像顶部的填充量。
    - Comfy dtype: INT
    - Python dtype: int
- padding_bottom
    - 添加到图像底部的填充量。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation
    - 用于调整图像大小的插值方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- sharpening
    - 应用于图像的锐化程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- flip
    - 指定是否应翻转图像以及沿哪个轴翻转。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantIDPosePrepare_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "imageprepare_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("INT","INT","INT","INT","INT","INT","INT","INT","INT","INT","INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],"FLOAT",["No", "X-Axis", "Y-Axis"],)
    RETURN_NAMES = ("resize_to","offset_width","offset_height","crop_left","crop_right","crop_top","crop_bottom","padding_left","padding_right","padding_top","padding_bottom","interpolation","sharpening","flip")
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Pipes"

    def get_imageprepare(self,imageprepare_settings):

        resizeto,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening,flip = imageprepare_settings

        return(resizeto,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening,flip)

```
