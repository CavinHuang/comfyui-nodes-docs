---
tags:
- Searge
---

# Model Selector v2
## Documentation
- Class name: `SeargeModelSelector`
- Category: `Searge/UI/Inputs`
- Output node: `False`

The SeargeModelSelector node facilitates the selection of models for various stages of image generation and refinement within the ComfyUI framework, specifically designed for the SDXL environment. It allows users to specify base, refiner, and VAE checkpoints, optionally incorporating additional data streams for enhanced customization.
## Input types
### Required
- **`base_checkpoint`**
    - Specifies the base model checkpoint for the initial stage of image generation, serving as the foundation for further processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`refiner_checkpoint`**
    - Determines the refiner model checkpoint used to refine the initial image outputs, enhancing their quality or details.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_checkpoint`**
    - Indicates the VAE model checkpoint, which is used for variational autoencoder processes, potentially embedding additional information into the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`data`**
    - An optional data stream that can be used for further customization or processing within the image generation pipeline.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `dict`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - Returns a data stream that includes the selected model checkpoints, ready for use in subsequent image generation stages.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeModelSelector:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "base_checkpoint": (UI.CHECKPOINTS(),),
                "refiner_checkpoint": (UI.CHECKPOINTS_WITH_NONE(),),
                "vae_checkpoint": (UI.VAE_WITH_EMBEDDED(),),
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
    def create_dict(base_checkpoint, refiner_checkpoint, vae_checkpoint):
        return {
            UI.F_BASE_CHECKPOINT: base_checkpoint,
            UI.F_REFINER_CHECKPOINT: refiner_checkpoint,
            UI.F_VAE_CHECKPOINT: vae_checkpoint,
        }

    def get(self, base_checkpoint, refiner_checkpoint, vae_checkpoint, data=None):
        if data is None:
            data = {}

        data[UI.S_CHECKPOINTS] = self.create_dict(
            base_checkpoint,
            refiner_checkpoint,
            vae_checkpoint,
        )

        return (data,)

```
