
# Documentation
- Class name: InstantID Mask Prepare Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

InstantIDMaskPrepare_Pipe节点用于为即时ID生成准备图像掩码并进行特定配置。它处理各种设置来调整图像准备参数，如调整大小、裁剪、填充和插值，这些参数专门用于在身份验证或类似应用中生成掩码。

# Input types
## Required
- imageprepare_settings
    - 指定准备图像掩码的设置，包括调整大小、裁剪、填充和插值的详细信息，这些对掩码的最终外观和对齐至关重要。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[str, int, str, int, int, int, int, int, int, int, int, int, int, str, float]

# Output types
- mask_type
    - 指示生成的掩码类型。
    - Comfy dtype: INT
    - Python dtype: int
- resize_to
    - 指定应将图像调整到的目标大小。
    - Comfy dtype: INT
    - Python dtype: int
- resize_type
    - 描述用于调整图像大小的方法，如裁剪或拉伸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- offset_width
    - 图像准备过程中应用的宽度偏移。
    - Comfy dtype: INT
    - Python dtype: int
- offset_height
    - 图像准备过程中应用的高度偏移。
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
    - 用于调整图像大小的插值方法，影响图像质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sharpening
    - 应用于图像的锐化程度，用于增强细节可见性。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantIDMaskPrepare_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "imageprepare_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("INT","INT",["Crop","Stretch"],"INT","INT","INT","INT","INT","INT","INT","INT","INT","INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],"FLOAT",)
    RETURN_NAMES = ("mask_type","resize_to","resize_type","offset_width","offset_height","crop_left","crop_right","crop_top","crop_bottom","padding_left","padding_right","padding_top","padding_bottom","interpolation","sharpening",)
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Pipes"

    def get_imageprepare(self,imageprepare_settings):

        masktype,resizeto,resizetype,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening = imageprepare_settings

        return(masktype,resizeto,resizetype,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening)

```
