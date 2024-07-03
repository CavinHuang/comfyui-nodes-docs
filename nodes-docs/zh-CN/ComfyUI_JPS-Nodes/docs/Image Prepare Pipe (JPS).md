
# Documentation
- Class name: Image Prepare Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

Image Prepare Pipe节点旨在配置和应用各种预处理步骤，以便在进一步处理图像之前对其进行准备。这包括设置调整大小、裁剪、填充、插值和锐化的参数，以确保图像在后续阶段能够得到最佳处理。

# Input types
## Required
- imageprepare_settings
    - 指定图像准备的设置，包括调整大小、裁剪、填充、插值和锐化。这种配置对于根据应用程序的具体需求定制图像处理流程至关重要。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[int, int, str, int, int, int, int, int, int, int, int, str, float]

# Output types
- offset_width
    - 图像准备过程中应用的水平偏移量。
    - Comfy dtype: INT
    - Python dtype: int
- offset_height
    - 图像准备过程中应用的垂直偏移量。
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
    - 添加到图像左侧的填充数量。
    - Comfy dtype: INT
    - Python dtype: int
- padding_right
    - 添加到图像右侧的填充数量。
    - Comfy dtype: INT
    - Python dtype: int
- padding_top
    - 添加到图像顶部的填充数量。
    - Comfy dtype: INT
    - Python dtype: int
- padding_bottom
    - 添加到图像底部的填充数量。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation
    - 图像调整大小时使用的插值方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sharpening
    - 应用于图像的锐化程度。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImagePrepare_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "imageprepare_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("INT","INT","INT","INT","INT","INT","INT","INT","INT","INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],"FLOAT",)
    RETURN_NAMES = ("offset_width","offset_height","crop_left","crop_right","crop_top","crop_bottom","padding_left","padding_right","padding_top","padding_bottom","interpolation","sharpening",)
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Pipes"

    def get_imageprepare(self,imageprepare_settings):

        offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening = imageprepare_settings

        return(offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening)

```
