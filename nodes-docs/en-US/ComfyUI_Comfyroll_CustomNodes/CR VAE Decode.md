---
tags:
- VAE
---

# ⚙️ CR VAE Decode
## Documentation
- Class name: `CR VAE Decode`
- Category: `🧩 Comfyroll Studio/✨ Essential/📦 Core`
- Output node: `False`

The CR_VAEDecode node is designed to decode latent representations into images using a specified VAE model. It supports optional circular and tiled decoding modes to enhance the output image's visual characteristics.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter represents the latent representations to be decoded into images. It plays a crucial role in determining the visual content of the output images.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The 'vae' parameter specifies the VAE model used for decoding the latent representations into images. The choice of VAE model can significantly affect the quality and characteristics of the output images.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`tiled`**
    - The 'tiled' parameter indicates whether tiled decoding should be used, which can help in generating larger images without running into memory constraints.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`circular`**
    - The 'circular' parameter enables circular padding mode in convolutional layers of the VAE model, potentially enhancing the visual quality of the output images by avoiding edge artifacts.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The output image generated from the decoded latent representation.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for the CR_VAEDecode node.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_VAEDecode:

    @classmethod
    def INPUT_TYPES(s):
    
        return {"required": {
                    "samples": ("LATENT", ),
                    "vae": ("VAE", ),
                    "tiled": ("BOOLEAN", {"default": False}),
                    "circular": ("BOOLEAN", {"default": False}),                     
                    }
        }
    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "vae_decode"
    CATEGORY = icons.get("Comfyroll/Essential/Core")

    def vae_decode(self, samples, vae, circular=False, tiled=False):
            
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-vae-decode"    

        if circular == True:
            for layer in [layer for layer in vae.first_stage_model.modules() if isinstance(layer, torch.nn.Conv2d)]:
                layer.padding_mode = "circular"       
        
        if tiled == True:
            c = vae.decode_tiled(samples["samples"], tile_x=512, tile_y=512, )
        else:
            c = vae.decode(samples["samples"])
        
        return (c, show_help, )

```
