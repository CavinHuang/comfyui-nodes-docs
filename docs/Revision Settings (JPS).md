
# Documentation
- Class name: Revision Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Revision Settings (JPS) 节点用于配置和应用各种图像处理任务的修订设置。它允许调整修订的强度和噪声增强等参数，以及裁剪和偏移设置，为图像修订的微调提供了灵活的工具。

# Input types
## Required
- rev1_strength
    - 定义第一次修订的强度。它影响应用调整的强度，从而影响图像的整体效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rev2_strength
    - 指定第二次修订的强度。这个参数控制第二次修订的调整强度，影响最终图像的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rev1_noiseaug
    - 确定第一次修订的噪声增强水平。它为图像添加噪声，模拟各种效果或增强真实感。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rev2_noiseaug
    - 设置第二次修订的噪声增强水平，添加噪声以模拟效果或增强图像的真实感。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rev1_crop
    - 指定第一次修订的裁剪区域。它定义了图像如何被裁剪，影响构图和焦点区域。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- rev1_offset
    - 定义第一次修订裁剪的偏移量。它调整裁剪的位置，允许精确控制图像的构图。
    - Comfy dtype: INT
    - Python dtype: int
- rev2_crop
    - 指示第二次修订的裁剪区域。这个参数决定裁剪策略，影响图像的构图和焦点。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- rev2_offset
    - 设置第二次修订裁剪的偏移量，调整其位置以进行有针对性的构图和调整。
    - Comfy dtype: INT
    - Python dtype: int
- crop_intpol
    - 指定裁剪的插值方法。它影响裁剪区域的质量和外观，为不同效果提供各种选项。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- crop_res
    - 定义裁剪的分辨率。它决定裁剪区域的大小，影响最终图像的细节和比例。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- revision_settings
    - 输出配置好的修订设置作为元组，随时可用于图像处理任务。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Revision_Settings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "rev1_strength": ("FLOAT", {"default": 1, "min": 0, "max": 10, "step": 0.1}),
                "rev2_strength": ("FLOAT", {"default": 1, "min": 0, "max": 10, "step": 0.1}),

                "rev1_noiseaug": ("FLOAT", {"default": 0, "min": 0, "max": 1, "step": 0.1}),
                "rev2_noiseaug": ("FLOAT", {"default": 0, "min": 0, "max": 1, "step": 0.1}),

                "rev1_crop": (["center","top", "bottom", "left", "right"],),
                "rev1_offset": ("INT", { "default": 0, "min": -2048, "max": 2048, "step": 1, "display": "number" }),

                "rev2_crop": (["center","top", "bottom", "left", "right"],),
                "rev2_offset": ("INT", { "default": 0, "min": -2048, "max": 2048, "step": 1, "display": "number" }),                

                "crop_intpol": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),                
                "crop_res": ("INT", { "default": 224 , "min": 224, "max": 1792, "step": 224, "display": "number" }),
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("revision_settings",)
    FUNCTION = "get_revmode"

    CATEGORY="JPS Nodes/Settings"

    def get_revmode(self,crop_res,crop_intpol,rev1_crop,rev1_offset,rev2_crop,rev2_offset,rev1_strength,rev2_strength,rev1_noiseaug,rev2_noiseaug,):
        rev1strength = 0
        rev1noiseaug = 0 
        rev2strength = 0
        rev2noiseaug = 0 
 
        rev1strength = rev1_strength
        rev1noiseaug = rev1_noiseaug
        rev2strength = rev2_strength
        rev2noiseaug = rev2_noiseaug

        revision_settings = crop_res,crop_intpol,rev1_crop,rev1_offset,rev2_crop,rev2_offset,rev1strength,rev2strength,rev1noiseaug,rev2_noiseaug

        return(revision_settings,)

```
