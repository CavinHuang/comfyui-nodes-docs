---
tags:
- VAE
---

# VAE Decode
## Documentation
- Class name: `VAEDecode`
- Category: `latent`
- Output node: `False`

The VAEDecode node is designed for decoding latent representations into images using a specified Variational Autoencoder (VAE). It serves the purpose of generating images from compressed data representations, facilitating the reconstruction of images from their latent space encodings.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter represents the latent representations to be decoded into images. It is crucial for the decoding process as it provides the compressed data from which the images are reconstructed.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The 'vae' parameter specifies the Variational Autoencoder model to be used for decoding the latent representations into images. It is essential for determining the decoding mechanism and the quality of the reconstructed images.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image reconstructed from the provided latent representation using the specified VAE model.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [SaveImage](../../Comfy/Nodes/SaveImage.md)
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)
    - Reroute
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [RIFE VFI](../../ComfyUI-Frame-Interpolation/Nodes/RIFE VFI.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [FILM VFI](../../ComfyUI-Frame-Interpolation/Nodes/FILM VFI.md)
    - [ColorMatch](../../ComfyUI-KJNodes/Nodes/ColorMatch.md)



## Source code
```python
class VAEDecode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples": ("LATENT", ), "vae": ("VAE", )}}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "decode"

    CATEGORY = "latent"

    def decode(self, vae, samples):
        return (vae.decode(samples["samples"]), )

```
