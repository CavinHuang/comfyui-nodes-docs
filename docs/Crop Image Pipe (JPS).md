
# Documentation
- Class name: Crop Image Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

Crop Image Pipe节点专门用于处理图像裁剪设置，可以对图像应用指定的裁剪位置、偏移量和插值方法。它简化了图像裁剪操作的复杂性，使用户能够定义如何裁剪和调整图像大小，以便进行进一步的处理或可视化。

# Input types
## Required
- cropimage_settings
    - 指定图像裁剪的设置，包括要使用的位置、偏移量和插值方法。此参数对于确定如何裁剪和调整图像大小至关重要，直接影响最终输出结果。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[str, int, str, int, str]

# Output types
- source_crop_pos
    - 源图像应该从哪个位置开始裁剪。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- source_crop_offset
    - 应用于源图像裁剪位置的偏移量。
    - Comfy dtype: INT
    - Python dtype: int
- support_crop_pos
    - 辅助图像应该从哪个位置开始裁剪。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- support_crop_offset
    - 应用于辅助图像裁剪位置的偏移量。
    - Comfy dtype: INT
    - Python dtype: int
- crop_intpol
    - 用于裁剪图像的插值方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CropImage_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cropimage_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = (["center","top", "bottom", "left", "right"],"INT",["center","top", "bottom", "left", "right"],"INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],)
    RETURN_NAMES = ("source_crop_pos", "source_crop_offset", "support_crop_pos", "support_crop_offset", "crop_intpol",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,cropimage_settings):
        
        source_crop_pos, source_crop_offset, support_crop_pos, support_crop_offset, crop_intpol = cropimage_settings

        return(source_crop_pos, source_crop_offset, support_crop_pos, support_crop_offset, crop_intpol,)

```
