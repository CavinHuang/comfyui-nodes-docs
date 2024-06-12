---
tags:
- ModelGuidance
---

# Automatic CFG - Negative
## Documentation
- Class name: `Automatic CFG - Negative`
- Category: `model_patches/automatic_cfg/presets`
- Output node: `False`

This node specializes in applying a dynamic configuration to models for generating content, with a focus on enhancing the generation process by adjusting the model's behavior based on negative prompts. It leverages an advanced configuration technique to fine-tune the model's output, aiming to mitigate the influence of negative aspects specified by the user.
## Input types
### Required
- **`model`**
    - The model parameter is the core component that the node modifies, applying a dynamic configuration to adjust its behavior for content generation.
    - Comfy dtype: `MODEL`
    - Python dtype: `MODEL`
- **`boost`**
    - The boost parameter determines whether to skip unconditional generation steps, effectively altering the model's generation process to focus more on the specified conditions.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `BOOLEAN`
- **`negative_strength`**
    - This parameter controls the strength of the negative conditioning, allowing for fine-tuning how strongly the model should mitigate or ignore the specified negative aspects during generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `FLOAT`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with applied dynamic configuration, tailored to enhance content generation by considering negative prompts.
    - Python dtype: `MODEL`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class simpleDynamicCFGlerpUncond:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "model": ("MODEL",),
                                "boost" : ("BOOLEAN", {"default": True}),
                                "negative_strength": ("FLOAT", {"default": 1, "min": 0.0, "max": 5.0, "step": 0.1, "round": 0.1}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "model_patches/automatic_cfg/presets"

    def patch(self, model, boost, negative_strength):
        advcfg = advancedDynamicCFG()
        m = advcfg.patch(model=model,
                         automatic_cfg="hard", skip_uncond=boost,
                         uncond_sigma_start = 15, uncond_sigma_end = 1,
                         lerp_uncond=negative_strength != 1, lerp_uncond_strength=negative_strength,
                         lerp_uncond_sigma_start = 15, lerp_uncond_sigma_end = 1
                         )[0]
        return (m, )

```
