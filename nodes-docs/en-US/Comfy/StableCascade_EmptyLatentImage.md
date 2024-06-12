---
tags:
- VAE
---

# StableCascade_EmptyLatentImage
## Documentation
- Class name: `StableCascade_EmptyLatentImage`
- Category: `latent/stable_cascade`
- Output node: `False`

This node is designed to generate empty latent images with specified dimensions and compression settings. It primarily serves in the initialization or preparation stages of image generation processes, where creating a blank canvas or base for further modifications is required.
## Input types
### Required
- **`width`**
    - Specifies the width of the generated latent image. It influences the spatial dimensions of the output latent representation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the generated latent image, affecting the vertical dimension of the output latent representation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`compression`**
    - Controls the compression level applied to the latent image dimensions, directly impacting the resolution and size of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - Indicates the number of latent images to generate in a single batch, allowing for batch processing of multiple images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`stage_c`**
    - Comfy dtype: `LATENT`
    - Represents the 'C' stage latent output of the generation process, typically a lower-resolution base for further image refinement.
    - Python dtype: `torch.Tensor`
- **`stage_b`**
    - Comfy dtype: `LATENT`
    - Denotes the 'B' stage latent output, offering a slightly higher resolution latent base for subsequent image development stages.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StableCascade_EmptyLatentImage:
    def __init__(self, device="cpu"):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "width": ("INT", {"default": 1024, "min": 256, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "height": ("INT", {"default": 1024, "min": 256, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "compression": ("INT", {"default": 42, "min": 4, "max": 128, "step": 1}),
            "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096})
        }}
    RETURN_TYPES = ("LATENT", "LATENT")
    RETURN_NAMES = ("stage_c", "stage_b")
    FUNCTION = "generate"

    CATEGORY = "latent/stable_cascade"

    def generate(self, width, height, compression, batch_size=1):
        c_latent = torch.zeros([batch_size, 16, height // compression, width // compression])
        b_latent = torch.zeros([batch_size, 4, height // 4, width // 4])
        return ({
            "samples": c_latent,
        }, {
            "samples": b_latent,
        })

```
