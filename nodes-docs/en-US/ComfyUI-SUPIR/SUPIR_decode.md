---
tags:
- VAE
---

# SUPIR Decode
## Documentation
- Class name: `SUPIR_decode`
- Category: `SUPIR`
- Output node: `False`

The SUPIR_decode node is designed to transform encoded latent representations back into images or other forms of visual data. It utilizes a specific decoding process, potentially involving a VAE (Variational Autoencoder), to reconstruct the original data from its compressed form, focusing on preserving the essential details and characteristics of the input while minimizing loss during the decoding phase.
## Input types
### Required
- **`SUPIR_VAE`**
    - Represents the Variational Autoencoder model used for the decoding process, crucial for transforming latent representations back into their original form.
    - Comfy dtype: `SUPIRVAE`
    - Python dtype: `torch.nn.Module`
- **`latents`**
    - The encoded latent representations that are to be decoded back into images or similar visual data, serving as the direct input for the reconstruction process.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`use_tiled_vae`**
    - A boolean flag indicating whether the decoding process should utilize a tiled approach, potentially improving handling of larger images by processing them in segments.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`decoder_tile_size`**
    - Specifies the size of the tiles used in the tiled VAE approach, affecting the granularity of the decoding process and the handling of image details.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image reconstructed from the encoded latent representations, showcasing the decoding capability of the node to transform compressed data back into visual form.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SUPIR_decode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "SUPIR_VAE": ("SUPIRVAE",),
            "latents": ("LATENT",),
            "use_tiled_vae": ("BOOLEAN", {"default": True}),
            "decoder_tile_size": ("INT", {"default": 512, "min": 64, "max": 8192, "step": 64}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "decode"
    CATEGORY = "SUPIR"

    def decode(self, SUPIR_VAE, latents, use_tiled_vae, decoder_tile_size):
        device = mm.get_torch_device()
        mm.unload_all_models()
        samples = latents["samples"]
        dtype = SUPIR_VAE.dtype
        orig_H, orig_W = latents["original_size"]
        
        B, H, W, C = samples.shape
                
        pbar = comfy.utils.ProgressBar(B)
  
        SUPIR_VAE.to(device)
        samples = samples.to(device)

        if use_tiled_vae:
            from .SUPIR.utils.tilevae import VAEHook
            # Store the `original_forward` only if it hasn't been stored already
            if not hasattr(SUPIR_VAE.decoder, 'original_forward'):
                SUPIR_VAE.decoder.original_forward = SUPIR_VAE.decoder.forward
            SUPIR_VAE.decoder.forward = VAEHook(
                SUPIR_VAE.decoder, decoder_tile_size // 8, is_decoder=True, fast_decoder=False,
                fast_encoder=False, color_fix=False, to_gpu=True)
        else:
            # Only assign `original_forward` back if it exists
            if hasattr(SUPIR_VAE.decoder, 'original_forward'):
                SUPIR_VAE.decoder.forward = SUPIR_VAE.decoder.original_forward

        out = []
        for sample in samples:
            autocast_condition = (dtype != torch.float32) and not comfy.model_management.is_device_mps(device)
            with torch.autocast(comfy.model_management.get_autocast_device(device), dtype=dtype) if autocast_condition else nullcontext():
                sample = 1.0 / 0.13025 * sample
                decoded_image = SUPIR_VAE.decode(sample.unsqueeze(0)).float()
                out.append(decoded_image)
                pbar.update(1)

        decoded_out= torch.cat(out, dim=0)
        if decoded_out.shape[2] != orig_H or decoded_out.shape[3] != orig_W:
            print("Restoring original dimensions: ", orig_W,"x",orig_H)
            decoded_out = F.interpolate(decoded_out, size=(orig_H, orig_W), mode="bicubic")

        decoded_out = torch.clip(decoded_out, 0, 1)
        decoded_out = decoded_out.cpu().to(torch.float32).permute(0, 2, 3, 1)
        

        return (decoded_out,)

```
