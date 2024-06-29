---
tags:
- Sampling
---

# FreeU v2
## Documentation
- Class name: `SeargeFreeU`
- Category: `Searge/UI/Inputs`
- Output node: `False`

SeargeFreeU is a node designed to configure and apply specific settings for the FreeU mode in a generative model's processing pipeline. It allows for the dynamic adjustment of parameters based on the selected FreeU mode, enhancing the model's output through fine-tuned control.
## Input types
### Required
- **`freeu_mode`**
    - Specifies the mode of operation for FreeU, affecting how other parameters are set and ultimately influencing the generative model's output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Enum`
- **`b1`**
    - A floating-point parameter influencing the behavior of the FreeU mode, contributing to the model's output customization.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`b2`**
    - Another floating-point parameter for fine-tuning the FreeU mode's effect, further customizing the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`s1`**
    - A parameter controlling a specific aspect of the FreeU mode, affecting the output's characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`s2`**
    - Similar to s1, this floating-point parameter adjusts another aspect of the FreeU mode, impacting the final generative model's output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`freeu_version`**
    - Determines the version of FreeU to be applied, directly influencing the behavior of other parameters and the overall effect on the model's output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Enum`
### Optional
- **`data`**
    - Optional data stream for further processing or modification within the FreeU mode, allowing for extended customization and flexibility.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `Dict`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - The modified data stream, enriched or altered by the FreeU settings applied, ready for subsequent stages in the processing pipeline.
    - Python dtype: `Dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeFreeU:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "freeu_mode": (UI.FREEU_MODES,),
                "b1": ("FLOAT", {"default": 1.3, "min": 1.0, "max": 1.4, "step": 0.01},),
                "b2": ("FLOAT", {"default": 1.4, "min": 1.2, "max": 1.6, "step": 0.01},),
                "s1": ("FLOAT", {"default": 0.9, "min": 0.0, "max": 1.0, "step": 0.05},),
                "s2": ("FLOAT", {"default": 0.2, "min": 0.0, "max": 1.0, "step": 0.05},),
                "freeu_version": (UI.FREEU_VERSION,),
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM",)
    RETURN_NAMES = ("data",)
    FUNCTION = "get"

    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(freeu_mode, b1, b2, s1, s2, freeu_version):
        return {
            UI.F_FREEU_MODE: freeu_mode,
            UI.F_FREEU_B1: b1,
            UI.F_FREEU_B2: b2,
            UI.F_FREEU_S1: s1,
            UI.F_FREEU_S2: s2,
            UI.F_FREEU_VERSION: freeu_version,
        }

    def get(self, freeu_mode, b1, b2, s1, s2, freeu_version, data=None):
        if data is None:
            data = {}

        data[UI.S_FREEU] = self.create_dict(
            freeu_mode,
            b1,
            b2,
            s1,
            s2,
            freeu_version,
        )

        return (data,)

```
