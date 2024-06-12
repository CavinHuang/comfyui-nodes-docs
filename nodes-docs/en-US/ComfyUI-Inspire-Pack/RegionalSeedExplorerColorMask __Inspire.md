---
tags:
- RegionalPrompt
---

# Regional Seed Explorer By Color Mask (Inspire)
## Documentation
- Class name: `RegionalSeedExplorerColorMask __Inspire`
- Category: `InspirePack/Regional`
- Output node: `False`

This node specializes in exploring seed variations within a specific region defined by a color mask. It applies modifications to the noise pattern based on seed prompts and additional seed information, allowing for targeted adjustments in the generation process.
## Input types
### Required
- **`color_mask`**
    - The color mask used to define the region of interest for seed exploration. It determines where the seed variations will be applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask_color`**
    - The specific color in the mask that identifies the target region for applying seed variations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`noise`**
    - The initial noise pattern to which the seed variations will be applied. It serves as the base for generating targeted adjustments.
    - Comfy dtype: `NOISE`
    - Python dtype: `torch.Tensor`
- **`seed_prompt`**
    - A comma-separated list of seed prompts that guide the variations to be applied within the defined region.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`enable_additional`**
    - A flag indicating whether additional seed information should be considered in the exploration process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`additional_seed`**
    - An additional seed value to be included in the exploration process, providing further customization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`additional_strength`**
    - The strength of the influence of the additional seed on the exploration process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise_mode`**
    - Specifies whether the noise processing should occur on the CPU or GPU, affecting performance and resource utilization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`noise`**
    - Comfy dtype: `NOISE`
    - The modified noise pattern after applying the seed variations and additional seed information.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The original color mask used to define the target region, returned for reference or further processing.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalSeedExplorerColorMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "color_mask": ("IMAGE",),
                "mask_color": ("STRING", {"multiline": False, "default": "#FFFFFF"}),

                "noise": ("NOISE",),
                "seed_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "pysssss.autocomplete": False}),
                "enable_additional": ("BOOLEAN", {"default": True, "label_on": "true", "label_off": "false"}),
                "additional_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "additional_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "noise_mode": (["GPU(=A1111)", "CPU"],),
            },
        }

    RETURN_TYPES = ("NOISE", "MASK")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, color_mask, mask_color, noise, seed_prompt, enable_additional, additional_seed, additional_strength, noise_mode):
        device = comfy.model_management.get_torch_device()
        noise_device = "cpu" if noise_mode == "CPU" else device

        color_mask = color_mask.to(device)
        noise = noise.to(device)

        mask = color_to_mask(color_mask, mask_color)
        original_mask = mask
        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(noise.shape[2], noise.shape[3]), mode="bilinear").squeeze(0)

        mask = mask.to(device)

        try:
            seed_prompt = seed_prompt.replace("\n", "")
            items = seed_prompt.strip().split(",")

            if items == ['']:
                items = []

            if enable_additional:
                items.append((additional_seed, additional_strength))

            noise = prompt_support.SeedExplorer.apply_variation(noise, items, noise_device, mask)
        except Exception:
            print(f"[ERROR] IGNORED: RegionalSeedExplorerColorMask is failed.")
            traceback.print_exc()

        color_mask.cpu()
        noise = noise.cpu()
        original_mask = original_mask.cpu()
        return (noise, original_mask)

```
