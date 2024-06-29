---
tags:
- RandomGeneration
- Seed
---

# Seed Explorer (Inspire)
## Documentation
- Class name: `SeedExplorer __Inspire`
- Category: `InspirePack/Prompt`
- Output node: `False`

The SeedExplorer __Inspire node is designed to facilitate exploration and manipulation of seed values within a generative workflow. It enables dynamic adjustment and application of seeds to influence the generation process, providing a means to explore variations and ensure consistency across generated outputs.
## Input types
### Required
- **`latent`**
    - Represents the initial latent space or image data that the node will manipulate using the provided seed values. It serves as the starting point for the seed exploration process.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`seed_prompt`**
    - A string input containing seed values and possibly other directives for generating variations. It's used to guide the generation process by specifying seed values and their intended effects.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`enable_additional`**
    - A boolean flag that enables or disables the application of additional seed and strength parameters for further manipulation of the generation process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`additional_seed`**
    - An integer representing an additional seed value to be applied alongside the main seed prompt for enhanced control over the generation outcomes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`additional_strength`**
    - A floating-point value specifying the strength of the effect of the additional seed on the generation process. It allows for fine-tuning the impact of the additional seed.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise_mode`**
    - Specifies whether the noise generation should occur on the GPU or CPU, affecting the performance and efficiency of the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`initial_batch_seed_mode`**
    - Determines the mode of seed application for the initial batch, influencing how seeds are applied and varied across multiple generations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`noise`**
    - Comfy dtype: `NOISE`
    - The manipulated noise tensor resulting from the application of seed values and additional parameters. It represents the direct output of the seed exploration process.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeedExplorer:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "latent": ("LATENT",),
                "seed_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "pysssss.autocomplete": False}),
                "enable_additional": ("BOOLEAN", {"default": True, "label_on": "true", "label_off": "false"}),
                "additional_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "additional_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "noise_mode": (["GPU(=A1111)", "CPU"],),
                "initial_batch_seed_mode": (["incremental", "comfy"],),
            }
        }

    RETURN_TYPES = ("NOISE",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    @staticmethod
    def apply_variation(start_noise, seed_items, noise_device, mask=None):
        noise = start_noise
        for x in seed_items:
            if isinstance(x, str):
                item = x.split(':')
            else:
                item = x

            if len(item) == 2:
                try:
                    variation_seed = int(item[0])
                    variation_strength = float(item[1])

                    noise = utils.apply_variation_noise(noise, noise_device, variation_seed, variation_strength, mask=mask)
                except Exception:
                    print(f"[ERROR] IGNORED: SeedExplorer failed to processing '{x}'")
                    traceback.print_exc()
        return noise

    def doit(self, latent, seed_prompt, enable_additional, additional_seed, additional_strength, noise_mode,
             initial_batch_seed_mode):
        latent_image = latent["samples"]
        device = comfy.model_management.get_torch_device()
        noise_device = "cpu" if noise_mode == "CPU" else device

        seed_prompt = seed_prompt.replace("\n", "")
        items = seed_prompt.strip().split(",")

        if items == ['']:
            items = []

        if enable_additional:
            items.append((additional_seed, additional_strength))

        try:
            hd = items[0]
            tl = items[1:]

            if isinstance(hd, tuple):
                hd_seed = int(hd[0])
            else:
                hd_seed = int(hd)

            noise = utils.prepare_noise(latent_image, hd_seed, None, noise_device, initial_batch_seed_mode)
            noise = noise.to(device)
            noise = SeedExplorer.apply_variation(noise, tl, noise_device)
            noise = noise.cpu()

            return (noise,)

        except Exception:
            print(f"[ERROR] IGNORED: SeedExplorer failed")
            traceback.print_exc()

        noise = torch.zeros(latent_image.size(), dtype=latent_image.dtype, layout=latent_image.layout,
                            device=noise_device)
        return (noise,)

```
