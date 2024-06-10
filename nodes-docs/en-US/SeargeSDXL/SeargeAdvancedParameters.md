---
tags:
- Searge
---

# Advanced Parameters v2
## Documentation
- Class name: `SeargeAdvancedParameters`
- Category: `Searge/UI/Inputs`
- Output node: `False`

The SeargeAdvancedParameters node is designed to handle and process advanced configuration parameters for the generation process. It allows for the customization and fine-tuning of generation settings, enabling users to adjust parameters that influence the output's quality, style, and other advanced aspects.
## Input types
### Required
- **`dynamic_cfg_method`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`dynamic_cfg_factor`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`refiner_detail_boost`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`contrast_factor`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`saturation_factor`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`latent_detailer`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
### Optional
- **`data`**
    - unknown
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `unknown`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - This output represents the processed data stream, encapsulating all the adjusted and fine-tuned parameters for the generation process.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeAdvancedParameters:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dynamic_cfg_method": (UI.DYNAMIC_CFG_METHODS, {"default": UI.NONE},),
                "dynamic_cfg_factor": ("FLOAT", {"default": 0.0, "min": -1.0, "max": 1.0, "step": 0.05},),
                "refiner_detail_boost": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05},),
                "contrast_factor": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05},),
                "saturation_factor": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05},),
                "latent_detailer": (UI.LATENT_DETAILERS, {"default": UI.NONE},),
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
    def create_dict(dynamic_cfg_method, dynamic_cfg_factor, refiner_detail_boost, contrast_factor, saturation_factor,
                    latent_detailer):
        return {
            UI.F_DYNAMIC_CFG_METHOD: dynamic_cfg_method,
            UI.F_DYNAMIC_CFG_FACTOR: round(dynamic_cfg_factor, 3),
            UI.F_REFINER_DETAIL_BOOST: round(refiner_detail_boost, 3),
            UI.F_CONTRAST_FACTOR: round(contrast_factor, 3),
            UI.F_SATURATION_FACTOR: round(saturation_factor, 3),
            UI.F_LATENT_DETAILER: latent_detailer,
        }

    def get(self, dynamic_cfg_method, dynamic_cfg_factor, refiner_detail_boost, contrast_factor, saturation_factor,
            latent_detailer, data=None):
        if data is None:
            data = {}

        data[UI.S_ADVANCED_PARAMETERS] = self.create_dict(
            dynamic_cfg_method,
            dynamic_cfg_factor,
            refiner_detail_boost,
            contrast_factor,
            saturation_factor,
            latent_detailer,
        )

        return (data,)

```
