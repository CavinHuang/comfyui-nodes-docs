---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Iterative Upscale (Image)
## Documentation
- Class name: `IterativeImageUpscale`
- Category: `ImpactPack/Upscale`
- Output node: `False`

The IterativeImageUpscale node is designed to enhance the resolution of images through a process that iteratively applies image upscaling techniques. This node aims to improve image quality and detail, making it suitable for applications requiring high-resolution images from lower-resolution sources.
## Input types
### Required
- **`pixels`**
    - The 'pixels' parameter represents the input image data in pixel format, serving as the foundation for the upscaling process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`upscale_factor`**
    - The 'upscale_factor' parameter specifies the multiplier for increasing the resolution of the image, directly impacting the upscaling intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`steps`**
    - The 'steps' parameter determines the number of iterations or steps the upscaling process will undergo, affecting the gradual improvement in image quality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`temp_prefix`**
    - The 'temp_prefix' parameter is used for specifying a temporary file prefix for intermediate results, aiding in debugging or intermediate analysis.
    - Comfy dtype: `STRING`
    - Python dtype: `str or None`
- **`upscaler`**
    - The 'upscaler' parameter indicates the upscaling model or technique to be used, influencing the method of resolution enhancement.
    - Comfy dtype: `UPSCALER`
    - Python dtype: `object`
- **`vae`**
    - The 'vae' parameter refers to the variational autoencoder used in the process, crucial for encoding and decoding images during upscaling.
    - Comfy dtype: `VAE`
    - Python dtype: `object`
- **`step_mode`**
    - The 'step_mode' parameter defines the mode of operation for each upscaling step, such as 'simple' or other advanced methods, affecting the approach to image enhancement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a higher-resolution version of the input image, achieved through iterative upscaling techniques.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ImageBatch](../../Comfy/Nodes/ImageBatch.md)



## Source code
```python
class IterativeImageUpscale:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "pixels": ("IMAGE", ),
                     "upscale_factor": ("FLOAT", {"default": 1.5, "min": 1, "max": 10000, "step": 0.1}),
                     "steps": ("INT", {"default": 3, "min": 1, "max": 10000, "step": 1}),
                     "temp_prefix": ("STRING", {"default": ""}),
                     "upscaler": ("UPSCALER",),
                     "vae": ("VAE",),
                     "step_mode": (["simple", "geometric"], {"default": "simple"})
                    },
                "hidden": {"unique_id": "UNIQUE_ID"}
                }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    def doit(self, pixels, upscale_factor, steps, temp_prefix, upscaler, vae, step_mode="simple", unique_id=None):
        if temp_prefix == "":
            temp_prefix = None

        core.update_node_status(unique_id, "VAEEncode (first)", 0)
        if upscaler.is_tiled:
            latent = nodes.VAEEncodeTiled().encode(vae, pixels, upscaler.tile_size)[0]
        else:
            latent = nodes.VAEEncode().encode(vae, pixels)[0]

        refined_latent = IterativeLatentUpscale().doit(latent, upscale_factor, steps, temp_prefix, upscaler, step_mode, unique_id)

        core.update_node_status(unique_id, "VAEDecode (final)", 1.0)
        if upscaler.is_tiled:
            pixels = nodes.VAEDecodeTiled().decode(vae, refined_latent[0], upscaler.tile_size)[0]
        else:
            pixels = nodes.VAEDecode().decode(vae, refined_latent[0])[0]

        core.update_node_status(unique_id, "", None)

        return (pixels, )

```
