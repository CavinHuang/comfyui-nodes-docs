---
tags:
- VAE
---

# VAE Encode Batched 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_VAEEncodeBatched`
- Category: `Video Helper Suite 🎥🅥🅗🅢/batched nodes`
- Output node: `False`

The VHS_VAEEncodeBatched node is designed for batch processing of images through a Variational Autoencoder (VAE) to produce latent representations. It efficiently handles large sets of images by dividing them into smaller batches, encoding each batch separately, and then merging the results. This node is part of the Video Helper Suite, aimed at facilitating video processing and manipulation tasks.
## Input types
### Required
- **`pixels`**
    - The 'pixels' parameter represents the images to be encoded into latent space. It is crucial for the node's operation as it provides the raw data for the VAE to process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The 'vae' parameter specifies the Variational Autoencoder model used for encoding the images. It determines the encoding mechanism and the structure of the generated latent space.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`per_batch`**
    - The 'per_batch' parameter controls the number of images processed in each batch. It allows for flexible management of memory usage and computational load during the encoding process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a latent representation of the input images, encoded by the VAE. It serves as a compressed, feature-rich version of the original data.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class VAEEncodeBatched:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pixels": ("IMAGE", ), "vae": ("VAE", ),
                "per_batch": ("INT", {"default": 16, "min": 1})
                }
            }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/batched nodes"

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "encode"

    def encode(self, vae, pixels, per_batch):
        t = []
        for start_idx in range(0, pixels.shape[0], per_batch):
            try:
                sub_pixels = vae.vae_encode_crop_pixels(pixels[start_idx:start_idx+per_batch])
            except:
                sub_pixels = VAEEncode.vae_encode_crop_pixels(pixels[start_idx:start_idx+per_batch])
            t.append(vae.encode(sub_pixels[:,:,:,:3]))
        return ({"samples": torch.cat(t, dim=0)}, )

```
