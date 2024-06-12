---
tags:
- ModelGuidance
---

# Automatic CFG
## Documentation
- Class name: `Automatic CFG`
- Category: `model_patches/automatic_cfg/presets`
- Output node: `False`

The Automatic CFG node applies a dynamic configuration to models, enhancing their performance by adjusting parameters based on the 'boost' flag. This adjustment aims to optimize the model's operation, potentially improving efficiency and output quality.
## Input types
### Required
- **`model`**
    - The 'model' parameter represents the model to which the dynamic configuration will be applied. It is crucial for defining the base upon which the adjustments and optimizations are performed.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`boost`**
    - The 'boost' flag determines the intensity of the configuration adjustments. Enabling 'boost' applies a more aggressive optimization strategy, potentially leading to significant enhancements in model performance.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The output is a modified version of the input model, optimized through dynamic configuration adjustments for improved performance.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class simpleDynamicCFG:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "model": ("MODEL",),
                                "boost" : ("BOOLEAN", {"default": True}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "model_patches/automatic_cfg/presets"

    def patch(self, model, boost):
        advcfg = advancedDynamicCFG()
        m = advcfg.patch(model,
                         skip_uncond = boost,
                         uncond_sigma_start = 15,  uncond_sigma_end = 1,
                         automatic_cfg = "hard" if boost else "soft"
                         )[0]
        return (m, )

```
