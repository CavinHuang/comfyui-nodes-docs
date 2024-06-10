---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Upscale Models Selector v2
## Documentation
- Class name: `SeargeUpscaleModels`
- Category: `Searge/UI/Inputs`
- Output node: `False`

This node is designed to configure and manage upscale models within a UI context, specifically for enhancing image resolution through various upscaling techniques. It allows for the selection and application of different upscaling models, including detail processing and high-resolution upscaling, to improve image quality.
## Input types
### Required
- **`detail_processor`**
    - Specifies the model used for detail enhancement in images, playing a crucial role in refining image textures and details without altering the overall resolution.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`high_res_upscaler`**
    - Defines the model responsible for increasing the image resolution by a factor of 4x, essential for achieving high-resolution outputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`primary_upscaler`**
    - Identifies the primary model used for the initial phase of image upscaling, crucial for the first step in enhancing image resolution.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`secondary_upscaler`**
    - Specifies the secondary model applied after the primary upscaling, offering an additional layer of refinement and quality improvement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`data`**
    - Optional data stream for passing additional information or parameters relevant to the upscaling process.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `dict`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - Returns a data stream containing the configured upscale models and any additional parameters, ready for further processing or application.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeUpscaleModels:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "detail_processor": (UI.UPSCALERS_1x_WITH_NONE(),),
                "high_res_upscaler": (UI.UPSCALERS_4x_WITH_NONE(),),
                "primary_upscaler": (UI.UPSCALERS_4x_WITH_NONE(),),
                "secondary_upscaler": (UI.UPSCALERS_4x_WITH_NONE(),),
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
    def create_dict(detail_processor, high_res_upscaler, primary_upscaler, secondary_upscaler):
        return {
            UI.F_DETAIL_PROCESSOR: detail_processor,
            UI.F_HIGH_RES_UPSCALER: high_res_upscaler,
            UI.F_PRIMARY_UPSCALER: primary_upscaler,
            UI.F_SECONDARY_UPSCALER: secondary_upscaler,
        }

    def get(self, detail_processor, high_res_upscaler, primary_upscaler, secondary_upscaler, data=None):
        if data is None:
            data = {}

        data[UI.S_UPSCALE_MODELS] = self.create_dict(
            detail_processor,
            high_res_upscaler,
            primary_upscaler,
            secondary_upscaler,
        )

        return (data,)

```
