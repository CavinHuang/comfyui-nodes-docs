---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# Checkpoint Loader
## Documentation
- Class name: `AV_CheckpointLoader`
- Category: `Art Venture/Loaders`
- Output node: `False`

The AV_CheckpointLoader node is designed for loading model checkpoints with optional overrides for specific components such as the checkpoint itself, VAE, or LoRA models. It extends the functionality of a standard checkpoint loader by allowing users to specify alternative sources for model components, enhancing flexibility in model configuration and experimentation.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the name of the checkpoint to load. This parameter can be overridden to load a different checkpoint if desired, providing flexibility in model experimentation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_name`**
    - Specifies the name of the VAE model to load. This parameter can be overridden to load a different VAE model if desired, allowing for experimentation with different VAE configurations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip_skip`**
    - Indicates whether to skip loading the CLIP model. This parameter allows for selective loading of model components based on requirements.
    - Comfy dtype: `INT`
    - Python dtype: `bool`
- **`lora_name`**
    - Specifies the name of the LoRA model to load. This parameter can be overridden to load a different LoRA model if desired, enabling customization of the LoRA component.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_model_strength`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`lora_clip_strength`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`positive`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`negative`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`token_normalization`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`weight_interpretation`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`empty_latent_width`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`empty_latent_height`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`batch_size`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
### Optional
- **`lora_stack`**
    - unknown
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `unknown`
- **`cnet_stack`**
    - unknown
    - Comfy dtype: `CONTROL_NET_STACK`
    - Python dtype: `unknown`
- **`ckpt_override`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`vae_override`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`lora_override`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The loaded model instance.
    - Python dtype: `torch.nn.Module`
- **`CONDITIONING+`**
    - Comfy dtype: `CONDITIONING`
    - Positive conditioning components loaded or configured during the checkpoint loading process.
    - Python dtype: `Dict[str, torch.Tensor]`
- **`CONDITIONING-`**
    - Comfy dtype: `CONDITIONING`
    - Negative conditioning components loaded or configured during the checkpoint loading process.
    - Python dtype: `Dict[str, torch.Tensor]`
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - Latent representations or configurations loaded or derived from the checkpoint.
    - Python dtype: `torch.Tensor`
- **`VAE`**
    - Comfy dtype: `VAE`
    - The VAE model loaded as part of the checkpoint, if applicable.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The CLIP model loaded as part of the checkpoint, if applicable.
    - Python dtype: `torch.nn.Module`
- **`DEPENDENCIES`**
    - Comfy dtype: `DEPENDENCIES`
    - Any additional dependencies or components loaded alongside the main model components.
    - Python dtype: `List[torch.nn.Module]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImpactWildcardEncode](../../ComfyUI-Impact-Pack/Nodes/ImpactWildcardEncode.md)



## Source code
```python
    class AVCheckpointLoader(TSC_EfficientLoader):
        @classmethod
        def INPUT_TYPES(cls):
            inputs = TSC_EfficientLoader.INPUT_TYPES()
            inputs["optional"]["ckpt_override"] = ("STRING", {"default": "None"})
            inputs["optional"]["vae_override"] = ("STRING", {"default": "None"})
            inputs["optional"]["lora_override"] = ("STRING", {"default": "None"})
            return inputs

        CATEGORY = "Art Venture/Loaders"

        def efficientloader(
            self,
            ckpt_name,
            vae_name,
            clip_skip,
            lora_name,
            *args,
            ckpt_override="None",
            vae_override="None",
            lora_override="None",
            **kwargs
        ):
            if ckpt_override != "None":
                ckpt_name = ckpt_override
            if vae_override != "None":
                vae_name = vae_override
            if lora_override != "None":
                lora_name = lora_override

            return super().efficientloader(
                ckpt_name, vae_name, clip_skip, lora_name, *args, **kwargs
            )

```
