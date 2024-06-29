---
tags:
- ImageEnhancement
---

# VariationNoiseDetailerHookProvider
## Documentation
- Class name: `VariationNoiseDetailerHookProvider`
- Category: `ImpactPack/Detailer`
- Output node: `False`

This node provides a mechanism to introduce variation into the noise used in detail enhancement processes, leveraging a specified seed and strength to generate a modified noise pattern. It aims to enrich the textural details and variability in generated images or segments by blending original noise with a variation-induced noise.
## Input types
### Required
- **`seed`**
    - The seed parameter is crucial for generating the variation-induced noise, ensuring reproducibility and consistency in the noise pattern across different executions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`strength`**
    - The strength parameter determines the degree to which the variation-induced noise influences the final noise output, allowing for fine-tuned control over the textural changes introduced.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`detailer_hook`**
    - Comfy dtype: `DETAILER_HOOK`
    - Outputs a detailer hook configured with variation-induced noise, ready to be used in enhancing the details of generated images or segments.
    - Python dtype: `DetailerHook`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class VariationNoiseDetailerHookProvider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01})}
                }

    RETURN_TYPES = ("DETAILER_HOOK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detailer"

    def doit(self, seed, strength):
        hook = hooks.VariationNoiseDetailerHookProvider(seed, strength)
        return (hook, )

```
