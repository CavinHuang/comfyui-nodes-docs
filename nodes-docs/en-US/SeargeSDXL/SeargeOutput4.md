---
tags:
- Searge
---

# Model Names
## Documentation
- Class name: `SeargeOutput4`
- Category: `Searge/_deprecated_/UI/Outputs`
- Output node: `False`

SeargeOutput4 is designed to demultiplex model names and configurations for various components of a generative AI model, including base, refiner, VAE, and upscale models, as well as Lora models. It abstracts the complexity of handling multiple model configurations, streamlining the process of selecting and configuring the appropriate models for generation tasks.
## Input types
### Required
- **`model_names`**
    - Specifies the names and configurations of various models involved in the generation process, including base, refiner, VAE, main upscale, support upscale, and Lora models. It is crucial for determining the specific models to be used and their configurations.
    - Comfy dtype: `MODEL_NAMES`
    - Python dtype: `Dict[str, str]`
## Output types
- **`model_names`**
    - Comfy dtype: `MODEL_NAMES`
    - Returns the original dictionary of model names and configurations, facilitating access to model identifiers.
    - Python dtype: `Dict[str, str]`
- **`base_model`**
    - Comfy dtype: `CHECKPOINT_NAME`
    - Identifies the base model used for initial generation.
    - Python dtype: `str`
- **`refiner_model`**
    - Comfy dtype: `CHECKPOINT_NAME`
    - Specifies the refiner model for enhancing the initial generation.
    - Python dtype: `str`
- **`vae_model`**
    - Comfy dtype: `VAE_NAME`
    - Denotes the VAE model used for variational autoencoding tasks.
    - Python dtype: `str`
- **`main_upscale_model`**
    - Comfy dtype: `UPSCALER_NAME`
    - Indicates the primary upscale model for image resolution enhancement.
    - Python dtype: `str`
- **`support_upscale_model`**
    - Comfy dtype: `UPSCALER_NAME`
    - Specifies the secondary upscale model, supporting the main upscale model.
    - Python dtype: `str`
- **`lora_model`**
    - Comfy dtype: `LORA_NAME`
    - Identifies the Lora model used for specific model adjustments or enhancements.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeOutput4:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model_names": ("MODEL_NAMES",),
        },
        }

    RETURN_TYPES = ("MODEL_NAMES", "CHECKPOINT_NAME", "CHECKPOINT_NAME", "VAE_NAME", "UPSCALER_NAME", "UPSCALER_NAME",
                    "LORA_NAME",)
    RETURN_NAMES = ("model_names", "base_model", "refiner_model", "vae_model", "main_upscale_model",
                    "support_upscale_model", "lora_model",)
    FUNCTION = "demux"

    CATEGORY = "Searge/_deprecated_/UI/Outputs"

    def demux(self, model_names):
        base_model = model_names["base_model"]
        refiner_model = model_names["refiner_model"]
        vae_model = model_names["vae_model"]
        main_upscale_model = model_names["main_upscale_model"]
        support_upscale_model = model_names["support_upscale_model"]
        lora_model = model_names["lora_model"]

        return (model_names, base_model, refiner_model, vae_model, main_upscale_model, support_upscale_model,
                lora_model,)

```
