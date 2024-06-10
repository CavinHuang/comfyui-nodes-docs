---
tags:
- VAE
---

# Make Circular VAE
## Documentation
- Class name: `MakeCircularVAE`
- Category: `latent`
- Output node: `False`

This node is designed to modify a VAE (Variational Autoencoder) to support seamless tiling in generated images, either by making a copy of the VAE or modifying it in place. It adjusts the VAE's internal model to enable or disable circular (seamless) tiling along the x-axis, y-axis, or both, based on the specified tiling mode.
## Input types
### Required
- **`vae`**
    - The VAE to be modified for seamless tiling. This parameter is crucial as it determines the base model that will undergo modifications to support circular tiling.
    - Comfy dtype: `VAE`
    - Python dtype: `comfy.sd.VAE`
- **`tiling`**
    - Specifies the mode of tiling to be applied: enabling tiling on both axes, only on the x-axis, only on the y-axis, or disabling it. This affects how the VAE's internal model is adjusted for seamless image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`copy_vae`**
    - Determines whether to modify the original VAE in place or to make a copy before applying the tiling modifications. This choice impacts whether the original VAE remains unchanged.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`vae`**
    - Comfy dtype: `VAE`
    - The modified VAE with seamless tiling capabilities enabled as specified. This VAE can then be used for generating images with seamless transitions.
    - Python dtype: `comfy.sd.VAE`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MakeCircularVAE:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "vae": ("VAE",),
                "tiling": (["enable", "x_only", "y_only", "disable"],),
                "copy_vae": (["Make a copy", "Modify in place"],),
            }
        }

    RETURN_TYPES = ("VAE",)
    FUNCTION = "run"
    CATEGORY = "latent"

    def run(self, vae, tiling, copy_vae):
        if copy_vae == "Modify in place":
            vae_copy = vae
        else:
            vae_copy = copy.deepcopy(vae)
        
        if tiling == "enable":
            make_circular_asymm(vae_copy.first_stage_model, True, True)
        elif tiling == "x_only":
            make_circular_asymm(vae_copy.first_stage_model, True, False)
        elif tiling == "y_only":
            make_circular_asymm(vae_copy.first_stage_model, False, True)
        else:
            make_circular_asymm(vae_copy.first_stage_model, False, False)
        
        return (vae_copy,)

```
