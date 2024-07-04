
# Documentation
- Class name: Revision Settings Pipe (JPS)
- Category: JPS Nodes/Pipes
- Output node: False

Revision Settings Pipe (JPS)节点旨在处理和调整图像修订设置，便于自定义图像处理参数，如裁剪、插值和噪声增强。它作为图像处理工作流中的可配置管道组件，实现对应用于图像的修订效果的精确控制。

# Input types
## Required
- revision_settings
    - 指定图像修订的设置，包括分辨率、插值方法、裁剪偏好、偏移量、强度和噪声增强级别。这个输入对于确定图像在修订过程中如何被修改至关重要。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[str, List[str], str, int, str, int, float, float, float, float]

# Output types
- crop_res
    - Comfy dtype: INT
    - 图像将被裁剪到的分辨率。
    - Python dtype: int
- crop_intpol
    - Comfy dtype: COMBO[STRING]
    - 用于裁剪图像的插值方法。
    - Python dtype: List[str]
- rev1_crop
    - Comfy dtype: COMBO[STRING]
    - 指定第一次修订的裁剪偏好。
    - Python dtype: str
- rev1_offset
    - Comfy dtype: INT
    - 第一次修订时应用的偏移量。
    - Python dtype: int
- rev2_crop
    - Comfy dtype: COMBO[STRING]
    - 指定第二次修订的裁剪偏好。
    - Python dtype: str
- rev2_offset
    - Comfy dtype: INT
    - 第二次修订时应用的偏移量。
    - Python dtype: int
- rev1_strength
    - Comfy dtype: FLOAT
    - 第一次修订效果的强度。
    - Python dtype: float
- rev2_strength
    - Comfy dtype: FLOAT
    - 第二次修订效果的强度。
    - Python dtype: float
- rev1_noiseaug
    - Comfy dtype: FLOAT
    - 第一次修订时应用的噪声增强级别。
    - Python dtype: float
- rev2_noiseaug
    - Comfy dtype: FLOAT
    - 第二次修订时应用的噪声增强级别。
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Revision_Settings_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "revision_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],["center","top", "bottom", "left", "right"],"INT",["center","top", "bottom", "left", "right"],"INT","FLOAT","FLOAT","FLOAT","FLOAT",)
    RETURN_NAMES = ("crop_res", "crop_intpol", "rev1_crop", "rev1_offset", "rev2_crop", "rev2_offset", "rev1_strength", "rev2_strength", "rev1_noiseaug", "rev2_noiseaug",)
    FUNCTION = "get_revmode"

    CATEGORY="JPS Nodes/Pipes"

    def get_revmode(self,revision_settings):

        crop_res,crop_intpol,rev1_crop,rev1_offset,rev2_crop,rev2_offset,rev1strength,rev2strength,rev1noiseaug,rev2noiseaug = revision_settings

        return(int(crop_res),crop_intpol,rev1_crop,int(rev1_offset),rev2_crop,int(rev2_offset),float(rev1strength),float(rev2strength),float(rev1noiseaug),float(rev2noiseaug),)

```
