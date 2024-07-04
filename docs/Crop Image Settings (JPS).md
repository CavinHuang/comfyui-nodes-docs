
# Documentation
- Class name: Crop Image Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False

Crop Image Settings节点旨在配置图像裁剪的参数，包括位置、偏移量和插值方法。它抽象了图像裁剪设置的复杂性，允许灵活精确地控制图像的裁剪和进一步处理的准备工作。

# Input types
## Required
- source_crop_pos
    - 指定源图像裁剪的初始位置。这影响裁剪的起点，并影响裁剪后图像的最终构图。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- source_crop_offset
    - 决定源图像裁剪的指定位置的偏移量，提供对裁剪位置的精细控制。
    - Comfy dtype: INT
    - Python dtype: int
- support_crop_pos
    - 指定支持图像裁剪的初始位置，类似于'source_crop_pos'，但用于额外的图像或上下文。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- support_crop_offset
    - 决定支持图像裁剪的指定位置的偏移量，允许与源图像精确对齐。
    - Comfy dtype: INT
    - Python dtype: int
- crop_intpol
    - 定义用于裁剪的插值方法，影响裁剪图像的质量和外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
- cropimage_settings
    - 图像裁剪的配置设置，封装了位置、偏移量和插值方法的详细信息。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[List[str], int, List[str], int, List[str]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CropImage_Settings:
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "source_crop_pos": (["center","top", "bottom", "left", "right"],),
                "source_crop_offset": ("INT", { "default": 0, "min": -2048, "max": 2048, "step": 1, "display": "number" }),
                "support_crop_pos": (["center","top", "bottom", "left", "right"],),
                "support_crop_offset": ("INT", { "default": 0, "min": -2048, "max": 2048, "step": 1, "display": "number" }),
                "crop_intpol": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
            }   
        }
    RETURN_TYPES = ("BASIC_PIPE",) 
    RETURN_NAMES = ("cropimage_settings",)
    FUNCTION = "get_cropimage"

    CATEGORY="JPS Nodes/Settings"

    def get_cropimage(self, source_crop_pos, source_crop_offset, support_crop_pos, support_crop_offset, crop_intpol,):
       
        cropimage_settings = source_crop_pos, source_crop_offset, support_crop_pos, support_crop_offset, crop_intpol

        return(cropimage_settings,)

```
