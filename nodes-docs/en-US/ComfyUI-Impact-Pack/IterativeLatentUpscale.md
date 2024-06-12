---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Iterative Upscale (Latent/on Pixel Space)
## Documentation
- Class name: `IterativeLatentUpscale`
- Category: `ImpactPack/Upscale`
- Output node: `False`

The IterativeLatentUpscale node is designed to progressively upscale latent images through a series of steps, either geometrically or linearly, to achieve a desired magnification factor. This node leverages various upscaling methods and models to refine the quality of the upscaled images at each iteration, ensuring enhanced detail and resolution.
## Input types
### Required
- **`samples`**
    - The initial latent samples to be upscaled. This input is crucial as it serves as the starting point for the iterative upscaling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`upscale_factor`**
    - The target magnification factor by which the latent samples are to be upscaled. This factor determines the final size of the upscaled images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`steps`**
    - The number of iterative steps to perform during the upscaling process. This parameter controls the granularity of the upscaling, affecting the intermediate sizes and quality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`temp_prefix`**
    - An optional prefix for temporary file saving during the upscaling process, facilitating intermediate result inspection.
    - Comfy dtype: `STRING`
    - Python dtype: `Optional[str]`
- **`upscaler`**
    - The upscaling model or method used to enhance the resolution and detail of the latent images during each iterative step.
    - Comfy dtype: `UPSCALER`
    - Python dtype: `Any`
- **`step_mode`**
    - Determines whether the upscaling factor is applied geometrically or linearly across the steps, influencing the progression of image sizes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The final upscaled latent representation after completing all iterative steps.
    - Python dtype: `Dict[str, torch.Tensor]`
- **`vae`**
    - Comfy dtype: `VAE`
    - The VAE model used for encoding and decoding during the upscaling process, integral to the transformation of latent representations.
    - Python dtype: `Any`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)



## Source code
```python
class IterativeLatentUpscale:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "samples": ("LATENT", ),
                     "upscale_factor": ("FLOAT", {"default": 1.5, "min": 1, "max": 10000, "step": 0.1}),
                     "steps": ("INT", {"default": 3, "min": 1, "max": 10000, "step": 1}),
                     "temp_prefix": ("STRING", {"default": ""}),
                     "upscaler": ("UPSCALER",),
                     "step_mode": (["simple", "geometric"], {"default": "simple"})
                    },
                "hidden": {"unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = ("LATENT", "VAE")
    RETURN_NAMES = ("latent", "vae")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    def doit(self, samples, upscale_factor, steps, temp_prefix, upscaler, step_mode="simple", unique_id=None):
        w = samples['samples'].shape[3]*8  # image width
        h = samples['samples'].shape[2]*8  # image height

        if temp_prefix == "":
            temp_prefix = None

        if step_mode == "geometric":
            upscale_factor_unit = pow(upscale_factor, 1.0/steps)
        else:  # simple
            upscale_factor_unit = max(0, (upscale_factor - 1.0) / steps)

        current_latent = samples
        scale = 1

        for i in range(steps-1):
            if step_mode == "geometric":
                scale *= upscale_factor_unit
            else:  # simple
                scale += upscale_factor_unit

            new_w = w*scale
            new_h = h*scale
            core.update_node_status(unique_id, f"{i+1}/{steps} steps | x{scale:.2f}", (i+1)/steps)
            print(f"IterativeLatentUpscale[{i+1}/{steps}]: {new_w:.1f}x{new_h:.1f} (scale:{scale:.2f}) ")
            step_info = i, steps
            current_latent = upscaler.upscale_shape(step_info, current_latent, new_w, new_h, temp_prefix)

        if scale < upscale_factor:
            new_w = w*upscale_factor
            new_h = h*upscale_factor
            core.update_node_status(unique_id, f"Final step | x{upscale_factor:.2f}", 1.0)
            print(f"IterativeLatentUpscale[Final]: {new_w:.1f}x{new_h:.1f} (scale:{upscale_factor:.2f}) ")
            step_info = steps-1, steps
            current_latent = upscaler.upscale_shape(step_info, current_latent, new_w, new_h, temp_prefix)

        core.update_node_status(unique_id, "", None)

        return (current_latent, upscaler.vae)

```
