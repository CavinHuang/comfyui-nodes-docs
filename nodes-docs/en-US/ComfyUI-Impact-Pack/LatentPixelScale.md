---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Latent Scale (on Pixel Space)
## Documentation
- Class name: `LatentPixelScale`
- Category: `ImpactPack/Upscale`
- Output node: `False`

The LatentPixelScale node is designed to upscale latent representations of images using various methods, including nearest-exact, bilinear, lanczos, and area. It can operate on both individual samples and tiled representations, optionally utilizing a specific upscaling model for enhanced results. This node facilitates the enhancement of image quality or resolution in the latent space before decoding back to pixel space, making it a crucial component in workflows that require high-quality image generation or manipulation.
## Input types
### Required
- **`samples`**
    - The latent representation of images to be upscaled. This is the core input that determines the quality and characteristics of the output images.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`scale_method`**
    - Specifies the method used for upscaling. The choice of method can significantly affect the quality and characteristics of the upscaled images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scale_factor`**
    - The factor by which the latent images are to be upscaled. A higher scale factor results in a larger output image, affecting the level of detail and resolution.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`vae`**
    - The variational autoencoder used for decoding and encoding the latent representations. This parameter is crucial for ensuring that the upscaled images remain compatible with the specific characteristics of the VAE model.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`use_tiled_vae`**
    - Determines whether the VAE operations should be performed on tiled representations of the images. This can affect performance and quality, especially for large images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`upscale_model_opt`**
    - An optional upscaling model that can be used for enhanced upscaling results. When provided, this model is used instead of the standard methods specified by scale_method.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `torch.nn.Module`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The upscaled latent representations, ready for further processing or decoding back to pixel space.
    - Python dtype: `torch.Tensor`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The decoded image from the upscaled latent representation, providing a visual output of the upscaling process.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)



## Source code
```python
class LatentPixelScale:
    upscale_methods = ["nearest-exact", "bilinear", "lanczos", "area"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "samples": ("LATENT", ),
                     "scale_method": (s.upscale_methods,),
                     "scale_factor": ("FLOAT", {"default": 1.5, "min": 0.1, "max": 10000, "step": 0.1}),
                     "vae": ("VAE", ),
                     "use_tiled_vae": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    },
                "optional": {
                        "upscale_model_opt": ("UPSCALE_MODEL", ),
                    }
                }

    RETURN_TYPES = ("LATENT", "IMAGE")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    def doit(self, samples, scale_method, scale_factor, vae, use_tiled_vae, upscale_model_opt=None):
        if upscale_model_opt is None:
            latimg = core.latent_upscale_on_pixel_space2(samples, scale_method, scale_factor, vae, use_tile=use_tiled_vae)
        else:
            latimg = core.latent_upscale_on_pixel_space_with_model2(samples, scale_method, upscale_model_opt, scale_factor, vae, use_tile=use_tiled_vae)
        return latimg

```
