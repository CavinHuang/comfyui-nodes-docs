---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# Load Checkpoint w/ Noise Select 🎭🅐🅓
## Documentation
- Class name: `CheckpointLoaderSimpleWithNoiseSelect`
- Category: `Animate Diff 🎭🅐🅓/extras`
- Output node: `False`

This node specializes in loading model checkpoints with an emphasis on noise selection, allowing for more nuanced control over the initialization and behavior of models in generative tasks. It extends the functionality of standard checkpoint loading by incorporating beta schedule adjustments and optional scaling factors for noise, catering to advanced customization needs.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the name of the checkpoint to be loaded. This parameter is crucial for identifying the specific model checkpoint file from a predefined list of available checkpoints.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`beta_schedule`**
    - Determines the beta schedule to be applied to the model. This parameter allows for the adjustment of the model's sampling behavior, enhancing flexibility in model performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`use_custom_scale_factor`**
    - A boolean flag indicating whether to apply a custom scale factor to the noise. When set to true, it enables fine-tuning of the noise's impact on the model's output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`scale_factor`**
    - Defines the magnitude of the noise scale factor, provided 'use_custom_scale_factor' is true. This allows for precise control over the noise level applied to the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The loaded model, configured according to the specified beta schedule and noise scaling options.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP model associated with the loaded checkpoint, if applicable.
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - Comfy dtype: `VAE`
    - The VAE model associated with the loaded checkpoint, if applicable.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [LoraLoader](../../Comfy/Nodes/LoraLoader.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [ADE_AnimateDiffLoaderWithContext](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_AnimateDiffLoaderWithContext.md)
    - [BatchPromptSchedule](../../ComfyUI_FizzNodes/Nodes/BatchPromptSchedule.md)
    - [CLIPSetLastLayer](../../Comfy/Nodes/CLIPSetLastLayer.md)
    - [Lora Loader Stack (rgthree)](../../rgthree-comfy/Nodes/Lora Loader Stack (rgthree).md)
    - IPAdapterApply
    - [ToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ToBasicPipe.md)



## Source code
```python
class CheckpointLoaderSimpleWithNoiseSelect:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                "beta_schedule": (BetaSchedules.ALIAS_LIST, {"default": BetaSchedules.USE_EXISTING}, )
            },
            "optional": {
                "use_custom_scale_factor": ("BOOLEAN", {"default": False}),
                "scale_factor": ("FLOAT", {"default": 0.18215, "min": 0.0, "max": 1.0, "step": 0.00001})
            }
        }
    RETURN_TYPES = ("MODEL", "CLIP", "VAE")
    FUNCTION = "load_checkpoint"

    CATEGORY = "Animate Diff 🎭🅐🅓/extras"

    def load_checkpoint(self, ckpt_name, beta_schedule, output_vae=True, output_clip=True, use_custom_scale_factor=False, scale_factor=0.18215):
        ckpt_path = folder_paths.get_full_path("checkpoints", ckpt_name)
        out = load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths("embeddings"))
        # register chosen beta schedule on model - convert to beta_schedule name recognized by ComfyUI
        new_model_sampling = BetaSchedules.to_model_sampling(beta_schedule, out[0])
        if new_model_sampling is not None:
            out[0].model.model_sampling = new_model_sampling
        if use_custom_scale_factor:
            out[0].model.latent_format.scale_factor = scale_factor
        return out

```
