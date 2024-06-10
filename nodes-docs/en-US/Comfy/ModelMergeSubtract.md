---
tags:
- ModelMerge
---

# ModelMergeSubtract
## Documentation
- Class name: `ModelMergeSubtract`
- Category: `advanced/model_merging`
- Output node: `False`

This node is designed for advanced model merging operations, specifically to subtract the parameters of one model from another based on a specified multiplier. It enables the customization of model behaviors by adjusting the influence of one model's parameters over another, facilitating the creation of new, hybrid models.
## Input types
### Required
- **`model1`**
    - The base model from which parameters will be subtracted.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`model2`**
    - The model whose parameters will be subtracted from the base model.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`multiplier`**
    - A floating-point value that scales the subtraction effect on the base model's parameters.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The resulting model after subtracting the parameters of one model from another, scaled by the multiplier.
    - Python dtype: `comfy.model_base.Model`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ModelSubtract:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model1": ("MODEL",),
                              "model2": ("MODEL",),
                              "multiplier": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "merge"

    CATEGORY = "advanced/model_merging"

    def merge(self, model1, model2, multiplier):
        m = model1.clone()
        kp = model2.get_key_patches("diffusion_model.")
        for k in kp:
            m.add_patches({k: kp[k]}, - multiplier, multiplier)
        return (m, )

```
