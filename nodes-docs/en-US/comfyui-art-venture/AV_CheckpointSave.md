---
tags:
- Checkpoint
- Loader
- ModelIO
- ModelLoader
---

# Checkpoint Save
## Documentation
- Class name: `AV_CheckpointSave`
- Category: `Art Venture/Model Merging`
- Output node: `True`

The AV_CheckpointSave node extends the functionality of a base checkpoint saving mechanism to include the option of specifying the data type for saving model states, particularly catering to precision requirements in model merging scenarios within the Art Venture project.
## Input types
### Required
- **`model`**
    - The model to be saved. This is a core component of the checkpoint, encapsulating the model's state.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The CLIP model associated with the checkpoint. This parameter is crucial for ensuring that the saved state includes necessary components for model functionality.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - The VAE model to be included in the checkpoint. This is essential for capturing the full scope of the model's capabilities, especially in generative tasks.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`filename_prefix`**
    - The prefix for the saved filename. This allows for organized storage and easy retrieval of saved models.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`dtype`**
    - Specifies the data type for the model state to be saved in, allowing for a choice between 'float16' and 'float32'. This option enables control over the precision and size of the saved model, impacting both storage efficiency and computational demand.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVCheckpointSave(CheckpointSave):
    CATEGORY = "Art Venture/Model Merging"

    @classmethod
    def INPUT_TYPES(s):
        inputs = CheckpointSave.INPUT_TYPES()
        inputs["optional"] = {
            "dtype": (["float16", "float32"], {"default": "float16"}),
        }

        return inputs

    def save(self, *args, dtype="float16", **kwargs):
        comfy_save_checkpoint = comfy.sd.save_checkpoint

        if dtype == "float16":

            def save_checkpoint(output_path, model, clip, vae, metadata=None):
                model.model.half()
                return comfy_save_checkpoint(output_path, model, clip, vae, metadata)

            comfy.sd.save_checkpoint = save_checkpoint

        try:
            return super().save(*args, **kwargs)
        finally:
            comfy.sd.save_checkpoint = comfy_save_checkpoint

```
