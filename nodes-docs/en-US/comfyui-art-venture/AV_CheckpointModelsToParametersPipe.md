---
tags:
- Image
- Pipeline
---

# Checkpoint Models to Pipe
## Documentation
- Class name: `AV_CheckpointModelsToParametersPipe`
- Category: `Art Venture/Parameters`
- Output node: `False`

This node is designed to convert model checkpoint names and various model component names into a structured pipeline configuration. It facilitates the organization and management of model components such as VAEs, upscalers, and LoRA layers by mapping their names to a pipeline dictionary, streamlining the process of configuring and utilizing these components in AI art generation workflows.
## Input types
### Required
- **`ckpt_name`**
    - The name of the primary model checkpoint. It is crucial for identifying the main model to be used in the pipeline.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`pipe`**
    - A dictionary that may already contain some pipeline configuration, which this node will update or expand based on the provided model component names.
    - Comfy dtype: `PIPE`
    - Python dtype: `Dict`
- **`secondary_ckpt_name`**
    - The name of the secondary model checkpoint, allowing for the integration of additional models into the pipeline.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_name`**
    - Specifies the name of the VAE (Variational Autoencoder) model to be included in the pipeline, enhancing the model's capabilities.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscaler_name`**
    - The name of the upscaling model to be used for enhancing image resolution within the pipeline.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`secondary_upscaler_name`**
    - The name of an additional upscaling model, offering flexibility in choosing resolution enhancement methods.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_i_name`**
    - The name of a LoRA (Low-Rank Adaptation) layer, enabling fine-tuning of the model's behavior. The index 'i' can range from 1 to 3, allowing for the specification of up to three different LoRA layers.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE`
    - A dictionary mapping model component names to their respective identifiers, organizing the pipeline configuration for easy access and modification.
    - Python dtype: `Dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVCheckpointModelsToParametersPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ckpt_name": (folder_paths.get_filename_list("checkpoints"),),
            },
            "optional": {
                "pipe": ("PIPE",),
                "secondary_ckpt_name": (["None"] + folder_paths.get_filename_list("checkpoints"),),
                "vae_name": (["None"] + folder_paths.get_filename_list("vae"),),
                "upscaler_name": (["None"] + folder_paths.get_filename_list("upscale_models"),),
                "secondary_upscaler_name": (["None"] + folder_paths.get_filename_list("upscale_models"),),
                "lora_1_name": (["None"] + folder_paths.get_filename_list("loras"),),
                "lora_2_name": (["None"] + folder_paths.get_filename_list("loras"),),
                "lora_3_name": (["None"] + folder_paths.get_filename_list("loras"),),
            },
        }

    RETURN_TYPES = ("PIPE",)
    CATEGORY = "Art Venture/Parameters"
    FUNCTION = "checkpoint_models_to_parameter_pipe"

    def checkpoint_models_to_parameter_pipe(
        self,
        ckpt_name,
        pipe: Dict = {},
        secondary_ckpt_name="None",
        vae_name="None",
        upscaler_name="None",
        secondary_upscaler_name="None",
        lora_1_name="None",
        lora_2_name="None",
        lora_3_name="None",
    ):
        pipe["ckpt_name"] = ckpt_name if ckpt_name != "None" else None
        pipe["secondary_ckpt_name"] = secondary_ckpt_name if secondary_ckpt_name != "None" else None
        pipe["vae_name"] = vae_name if vae_name != "None" else None
        pipe["upscaler_name"] = upscaler_name if upscaler_name != "None" else None
        pipe["secondary_upscaler_name"] = secondary_upscaler_name if secondary_upscaler_name != "None" else None
        pipe["lora_1_name"] = lora_1_name if lora_1_name != "None" else None
        pipe["lora_2_name"] = lora_2_name if lora_2_name != "None" else None
        pipe["lora_3_name"] = lora_3_name if lora_3_name != "None" else None
        return (pipe,)

```
