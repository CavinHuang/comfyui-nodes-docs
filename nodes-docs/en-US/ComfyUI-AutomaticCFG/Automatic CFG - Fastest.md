---
tags:
- ModelGuidance
---

# Automatic CFG - Fastest
## Documentation
- Class name: `Automatic CFG - Fastest`
- Category: `model_patches/automatic_cfg/presets`
- Output node: `False`

This node applies a high-speed configuration patch to a model, optimizing it for faster performance without compromising on the quality of generated content. It utilizes an advanced configuration to streamline the model's operation, making it ideal for scenarios requiring quick adjustments.
## Input types
### Required
- **`model`**
    - The model to be patched with the high-speed configuration. It is the core component that undergoes optimization for enhanced performance.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The optimized model, patched with a high-speed configuration for improved performance.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class simpleDynamicCFGHighSpeed:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "model": ("MODEL",),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "model_patches/automatic_cfg/presets"

    def patch(self, model):
        advcfg = advancedDynamicCFG()
        m = advcfg.patch(model=model, automatic_cfg = "hard",
                         skip_uncond = True, uncond_sigma_start = 7.5, uncond_sigma_end = 1,
                         latent_intensity_rescale = False, latent_intensity_rescale_cfg = 7.6,
                         latent_intensity_rescale_sigma_start = 15, latent_intensity_rescale_sigma_end = 7.5,
                         latent_intensity_rescale_method = "hard")[0]
        return (m, )

```
