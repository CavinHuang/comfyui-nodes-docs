---
tags:
- VAE
---

# SUPIR Encode
## Documentation
- Class name: `SUPIR_encode`
- Category: `SUPIR`
- Output node: `False`

The SUPIR_encode node is designed for encoding images into a latent space representation using a specified VAE model. It supports both standard and tiled encoding methods, allowing for flexible adaptation to different image sizes and computational constraints.
## Input types
### Required
- **`SUPIR_VAE`**
    - The VAE model used for encoding the image. This model dictates the encoding process and the structure of the generated latent space.
    - Comfy dtype: `SUPIRVAE`
    - Python dtype: `torch.nn.Module`
- **`image`**
    - The image to be encoded. This input is the primary data that the node processes to produce a latent representation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`use_tiled_vae`**
    - A flag indicating whether to use a tiled approach for VAE encoding, which can be beneficial for processing large images or for reducing memory usage.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`encoder_tile_size`**
    - The size of the tiles used in the tiled VAE encoding process. This parameter is relevant only if 'use_tiled_vae' is True.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`encoder_dtype`**
    - Specifies the data type for the encoder's output, allowing for control over the precision and size of the generated latent representation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent space representation of the encoded image. This output is crucial for further processing or generation tasks within the VAE framework.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SUPIR_encode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "SUPIR_VAE": ("SUPIRVAE",),
            "image": ("IMAGE",),
            "use_tiled_vae": ("BOOLEAN", {"default": True}),
            "encoder_tile_size": ("INT", {"default": 512, "min": 64, "max": 8192, "step": 64}),
            "encoder_dtype": (
                    [
                        'bf16',
                        'fp32',
                        'auto'
                    ], {
                        "default": 'auto'
                    }),
            }
        }

    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("latent",)
    FUNCTION = "encode"
    CATEGORY = "SUPIR"

    def encode(self, SUPIR_VAE, image, encoder_dtype, use_tiled_vae, encoder_tile_size):
        device = mm.get_torch_device()
        mm.unload_all_models()
        if encoder_dtype == 'auto':
            try:
                if mm.should_use_bf16():
                    print("Encoder using bf16")
                    vae_dtype = 'bf16'
                else:
                    print("Encoder using fp32")
                    vae_dtype = 'fp32'
            except:
                raise AttributeError("ComfyUI version too old, can't autodetect properly. Set your dtypes manually.")
        else:
            vae_dtype = encoder_dtype
            print(f"Encoder using {vae_dtype}")

        dtype = convert_dtype(vae_dtype)

        image = image.permute(0, 3, 1, 2)
        B, C, H, W = image.shape
        downscale_ratio = 32
        orig_H, orig_W = H, W
        if W % downscale_ratio != 0:
            W = W - (W % downscale_ratio)
        if H % downscale_ratio != 0:
            H = H - (H % downscale_ratio)
        if orig_H % downscale_ratio != 0 or orig_W % downscale_ratio != 0:
            image = F.interpolate(image, size=(H, W), mode="bicubic")
        resized_image = image.to(device)        
        
        if use_tiled_vae:
            from .SUPIR.utils.tilevae import VAEHook
            # Store the `original_forward` only if it hasn't been stored already
            if not hasattr(SUPIR_VAE.encoder, 'original_forward'):
                SUPIR_VAE.encoder.original_forward = SUPIR_VAE.encoder.forward
            SUPIR_VAE.encoder.forward = VAEHook(
                SUPIR_VAE.encoder, encoder_tile_size, is_decoder=False, fast_decoder=False,
                fast_encoder=False, color_fix=False, to_gpu=True)
        else:
            # Only assign `original_forward` back if it exists
            if hasattr(SUPIR_VAE.encoder, 'original_forward'):
                SUPIR_VAE.encoder.forward = SUPIR_VAE.encoder.original_forward
        
        pbar = comfy.utils.ProgressBar(B)
        out = []
        for img in resized_image:

            SUPIR_VAE.to(dtype).to(device)

            autocast_condition = (dtype != torch.float32) and not comfy.model_management.is_device_mps(device)
            with torch.autocast(comfy.model_management.get_autocast_device(device), dtype=dtype) if autocast_condition else nullcontext():

                z = SUPIR_VAE.encode(img.unsqueeze(0))
                z = z * 0.13025
                out.append(z)
                pbar.update(1)

        if len(out[0].shape) == 4:
            samples_out_stacked = torch.cat(out, dim=0)
        else:
            samples_out_stacked = torch.stack(out, dim=0)
        return ({"samples":samples_out_stacked, "original_size": [orig_H, orig_W]},)

```
