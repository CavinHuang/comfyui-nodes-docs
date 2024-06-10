---
tags:
- Image
- Pipeline
---

# Pipe to Checkpoint Models
## Documentation
- Class name: `AV_ParametersPipeToCheckpointModels`
- Category: `Art Venture/Parameters`
- Output node: `False`

This node is designed to transform a set of parameters encapsulated within a pipe structure into specific model checkpoint names and configurations. It serves as a bridge between abstract parameter definitions and concrete model instantiation, facilitating the dynamic selection and configuration of models based on provided parameters.
## Input types
### Required
- **`pipe`**
    - The pipe parameter acts as a container for model-related parameters, including checkpoint names, VAE names, and upscaler names. It plays a crucial role in determining the specific models and configurations to be instantiated based on the encapsulated parameters.
    - Comfy dtype: `PIPE`
    - Python dtype: `Dict`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE`
    - Returns the updated pipe structure, now including the resolved names and configurations for model checkpoints, VAEs, and upscalers, based on the input parameters.
    - Python dtype: `Dict`
- **`ckpt_name`**
    - Comfy dtype: `CHECKPOINT_NAME`
    - The primary checkpoint model name derived from the input parameters.
    - Python dtype: `str`
- **`secondary_ckpt_name`**
    - Comfy dtype: `CHECKPOINT_NAME`
    - The secondary checkpoint model name derived from the input parameters.
    - Python dtype: `str`
- **`vae_name`**
    - Comfy dtype: `VAE_NAME`
    - The name of the VAE model derived from the input parameters.
    - Python dtype: `str`
- **`upscaler_name`**
    - Comfy dtype: `UPSCALER_NAME`
    - The name of the primary upscaler model derived from the input parameters.
    - Python dtype: `str`
- **`secondary_upscaler_name`**
    - Comfy dtype: `UPSCALER_NAME`
    - The name of the secondary upscaler model derived from the input parameters.
    - Python dtype: `str`
- **`lora_1_name`**
    - Comfy dtype: `LORA_NAME`
    - The name of the first Lora model derived from the input parameters.
    - Python dtype: `str`
- **`lora_2_name`**
    - Comfy dtype: `LORA_NAME`
    - The name of the second Lora model derived from the input parameters.
    - Python dtype: `str`
- **`lora_3_name`**
    - Comfy dtype: `LORA_NAME`
    - The name of the third Lora model derived from the input parameters.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVParametersPipeToCheckpointModels:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pipe": ("PIPE",),
            },
        }

    RETURN_TYPES = (
        "PIPE",
        "CHECKPOINT_NAME",
        "CHECKPOINT_NAME",
        "VAE_NAME",
        "UPSCALER_NAME",
        "UPSCALER_NAME",
        "LORA_NAME",
        "LORA_NAME",
        "LORA_NAME",
    )
    RETURN_NAMES = (
        "pipe",
        "ckpt_name",
        "secondary_ckpt_name",
        "vae_name",
        "upscaler_name",
        "secondary_upscaler_name",
        "lora_1_name",
        "lora_2_name",
        "lora_3_name",
    )
    CATEGORY = "Art Venture/Parameters"
    FUNCTION = "parameter_pipe_to_checkpoint_models"

    def parameter_pipe_to_checkpoint_models(self, pipe: Dict = {}):
        ckpt_name = pipe.get("ckpt_name", None)
        secondary_ckpt_name = pipe.get("secondary_ckpt_name", None)
        vae_name = pipe.get("vae_name", None)
        upscaler_name = pipe.get("upscaler_name", None)
        secondary_upscaler_name = pipe.get("secondary_upscaler_name", None)
        lora_1_name = pipe.get("lora_1_name", None)
        lora_2_name = pipe.get("lora_2_name", None)
        lora_3_name = pipe.get("lora_3_name", None)

        return (
            pipe,
            ckpt_name,
            secondary_ckpt_name,
            vae_name,
            upscaler_name,
            secondary_upscaler_name,
            lora_1_name,
            lora_2_name,
            lora_3_name,
        )

```
