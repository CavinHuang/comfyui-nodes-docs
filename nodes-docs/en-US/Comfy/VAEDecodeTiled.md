---
tags:
- VAE
---

# VAE Decode (Tiled)
## Documentation
- Class name: `VAEDecodeTiled`
- Category: `_for_testing`
- Output node: `False`

The VAEDecodeTiled node is designed for decoding latent representations into images, specifically optimized for handling large images by processing them in tiles. This method allows for efficient memory usage and can accommodate images that exceed the size limitations of standard decoding techniques.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter represents the latent representations that are to be decoded into images. It is crucial for the decoding process as it contains the encoded information that will be transformed back into visual form.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The 'vae' parameter is the variational autoencoder model used for the decoding process. It plays a central role in transforming the latent representations into images.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`tile_size`**
    - The 'tile_size' parameter specifies the dimensions of the tiles used in the tiled decoding process. It affects the granularity of the decoding, with smaller tiles potentially allowing for finer control over memory usage and processing time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image generated from the decoded latent representations, processed in a tiled manner to efficiently handle large image sizes.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [SaveImage](../../Comfy/Nodes/SaveImage.md)
    - [ImageListToImageBatch](../../ComfyUI-Impact-Pack/Nodes/ImageListToImageBatch.md)
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)
    - [AlphaChanelAdd](../../ComfyUI-Allor/Nodes/AlphaChanelAdd.md)
    - [GetImageSize](../../stability-ComfyUI-nodes/Nodes/GetImageSize.md)
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)
    - [ImageSender](../../ComfyUI-Impact-Pack/Nodes/ImageSender.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)



## Source code
```python
class VAEDecodeTiled:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"samples": ("LATENT", ), "vae": ("VAE", ),
                             "tile_size": ("INT", {"default": 512, "min": 320, "max": 4096, "step": 64})
                            }}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "decode"

    CATEGORY = "_for_testing"

    def decode(self, vae, samples, tile_size):
        return (vae.decode_tiled(samples["samples"], tile_x=tile_size // 8, tile_y=tile_size // 8, ), )

```
