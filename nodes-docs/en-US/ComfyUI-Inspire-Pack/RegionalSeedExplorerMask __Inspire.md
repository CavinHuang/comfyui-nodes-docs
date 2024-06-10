---
tags:
- RegionalPrompt
---

# Regional Seed Explorer By Mask (Inspire)
## Documentation
- Class name: `RegionalSeedExplorerMask __Inspire`
- Category: `InspirePack/Regional`
- Output node: `False`

The RegionalSeedExplorerMask node is designed to apply variations to noise patterns based on seed prompts and masks, enabling the exploration of diverse visual outcomes within specified regions. It leverages masks to focus changes, allowing for targeted modifications and enhancements in image generation processes.
## Input types
### Required
- **`mask`**
    - The mask parameter specifies the region within the noise pattern where the seed prompt variations will be applied, enabling targeted modifications.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`noise`**
    - The noise parameter represents the initial noise pattern to which the seed prompt variations will be applied, serving as the base for generating diverse visual outcomes.
    - Comfy dtype: `NOISE`
    - Python dtype: `torch.Tensor`
- **`seed_prompt`**
    - The seed_prompt parameter contains the seed prompts that define the variations to be applied to the noise pattern, guiding the generation of specific visual outcomes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`enable_additional`**
    - This parameter controls whether additional seed prompts and their corresponding strengths are included in the variation process, allowing for more complex modifications.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`additional_seed`**
    - When additional modifications are enabled, this parameter specifies the additional seed prompt to be applied.
    - Comfy dtype: `INT`
    - Python dtype: `str`
- **`additional_strength`**
    - This parameter determines the strength of the additional seed prompt's effect on the noise pattern, allowing for fine-tuned adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise_mode`**
    - The noise_mode parameter specifies whether the processing should be performed on the CPU or GPU, affecting performance and resource utilization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`noise`**
    - Comfy dtype: `NOISE`
    - The modified noise pattern, reflecting the applied seed prompt variations within the specified mask region.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalSeedExplorerMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),

                "noise": ("NOISE",),
                "seed_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "pysssss.autocomplete": False}),
                "enable_additional": ("BOOLEAN", {"default": True, "label_on": "true", "label_off": "false"}),
                "additional_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "additional_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "noise_mode": (["GPU(=A1111)", "CPU"],),
            },
        }

    RETURN_TYPES = ("NOISE",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, mask, noise, seed_prompt, enable_additional, additional_seed, additional_strength, noise_mode):
        device = comfy.model_management.get_torch_device()
        noise_device = "cpu" if noise_mode == "CPU" else device

        noise = noise.to(device)
        mask = mask.to(device)

        if len(mask.shape) == 2:
            mask = mask.unsqueeze(0)

        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(noise.shape[2], noise.shape[3]), mode="bilinear").squeeze(0)

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

        noise = noise.cpu()
        mask.cpu()
        return (noise,)

```
