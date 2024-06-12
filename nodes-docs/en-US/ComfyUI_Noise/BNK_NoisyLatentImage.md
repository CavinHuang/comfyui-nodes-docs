---
tags:
- LatentNoise
- Noise
---

# Noisy Latent Image
## Documentation
- Class name: `BNK_NoisyLatentImage`
- Category: `latent/noise`
- Output node: `False`

The Noisy Latent Image node generates a tensor of random noise as latent images, configurable by dimensions and batch size, and intended for use in generative models where noise serves as a foundational element for image synthesis.
## Input types
### Required
- **`source`**
    - Specifies the computational resource (CPU or GPU) to be used for generating the noise, affecting the execution speed and efficiency.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - Determines the initialization value for random number generation, ensuring reproducibility of the noise patterns.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - Sets the width of the generated latent images, influencing the dimensions of the output noise tensor.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Sets the height of the generated latent images, influencing the dimensions of the output noise tensor.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - Defines the number of latent images to generate in a single batch, allowing for batch processing of noise generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The generated tensor of random noise, structured as latent images for further processing or model input.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class NoisyLatentImage:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "source":(["CPU", "GPU"], ),
            "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            "width": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
            "height": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
            "batch_size": ("INT", {"default": 1, "min": 1, "max": 64}),
            }}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "create_noisy_latents"

    CATEGORY = "latent/noise"
        
    def create_noisy_latents(self, source, seed, width, height, batch_size):
        torch.manual_seed(seed)
        if source == "CPU":
            device = "cpu"
        else:
            device = comfy.model_management.get_torch_device()
        noise = torch.randn((batch_size,  4, height // 8, width // 8), dtype=torch.float32, device=device).cpu()
        return ({"samples":noise}, )

```
