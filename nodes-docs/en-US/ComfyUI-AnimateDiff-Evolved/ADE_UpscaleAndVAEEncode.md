---
tags:
- VAE
---

# Scale Ref Image and VAE Encode 🎭🅐🅓②
## Documentation
- Class name: `ADE_UpscaleAndVAEEncode`
- Category: `Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V`
- Output node: `False`

The ADE_UpscaleAndVAEEncode node is designed for processing images by first upscaling them to a higher resolution and then encoding them into a latent representation using a Variational Autoencoder (VAE). This node is part of the AnimateDiff suite, specifically tailored for enhancing image quality before applying further generative or transformational processes.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image to be upscaled and encoded. It plays a crucial role in determining the quality and resolution of the final latent representation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The 'vae' parameter specifies the Variational Autoencoder model used for encoding the upscaled image into its latent representation. It affects the encoding efficiency and the quality of the generated latent space.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`latent_size`**
    - The 'latent_size' parameter indicates the size of the latent representation to be generated. It determines the dimensions of the output latent space.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`scale_method`**
    - The 'scale_method' parameter defines the method used for upscaling the image. It influences the quality of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`crop`**
    - The 'crop' parameter specifies the cropping method applied after upscaling, affecting the final image composition.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a latent representation of the input image, encoded by the VAE after upscaling. It captures the essential features of the image in a compressed form, suitable for further generative tasks.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UpscaleAndVaeEncode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "vae": ("VAE",),
                "latent_size": ("LATENT",),
                "scale_method": (ScaleMethods._LIST_IMAGE,),
                "crop": (CropMethods._LIST, {"default": CropMethods.CENTER},),
            }
        }
    
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "preprocess_images"

    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V"

    def preprocess_images(self, image: torch.Tensor, vae: VAE, latent_size: torch.Tensor, scale_method: str, crop: str):
        b, c, h, w = latent_size["samples"].size()
        image = image.movedim(-1,1)
        image = comfy.utils.common_upscale(samples=image, width=w*8, height=h*8, upscale_method=scale_method, crop=crop)
        image = image.movedim(1,-1)
        # now that images are the expected size, VAEEncode them
        try:  # account for old ComfyUI versions (TODO: remove this when other changes require ComfyUI update)
            if not hasattr(vae, "vae_encode_crop_pixels"):
                image = VAEEncode.vae_encode_crop_pixels(image)
        except Exception:
            pass
        return ({"samples": vae.encode(image[:,:,:,:3])},)

```
