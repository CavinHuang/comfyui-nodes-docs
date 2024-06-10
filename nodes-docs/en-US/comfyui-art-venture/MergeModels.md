---
tags:
- ModelMerge
---

# Merge Models
## Documentation
- Class name: `MergeModels`
- Category: `Art Venture/Utils`
- Output node: `False`

The MergeModels node is designed to blend two models together based on a specified ratio, effectively merging their characteristics and features. This process allows for the creation of hybrid models that combine the strengths or attributes of both input models.
## Input types
### Required
- **`model1`**
    - The first model to be merged. It serves as the base model onto which patches from the second model are applied, influenced by the specified ratio.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`model2`**
    - The second model to be merged. Key patches from this model are applied to the first model, with the extent of their influence determined by the ratio.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`ratio`**
    - A floating-point value that determines the balance between the two models in the merging process. A ratio closer to 1.0 gives more weight to the second model's characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The resulting model after merging the two input models according to the specified ratio.
    - Python dtype: `comfy.model_base.Model`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilModelMerge:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model1": ("MODEL",),
                "model2": ("MODEL",),
                "ratio": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("MODEL",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "merge_models"

    def merge_models(self, model1, model2, ratio=1.0):
        m = model1.clone()
        kp = model2.get_key_patches("diffusion_model.")

        for k in kp:
            k_unet = k[len("diffusion_model.") :]
            if k_unet == "input_blocks.0.0.weight":
                w = kp[k][0]
                if w.shape[1] == 9:
                    w = w[:, 0:4, :, :]
                m.add_patches({k: (w,)}, 1.0 - ratio, ratio)
            else:
                m.add_patches({k: kp[k]}, 1.0 - ratio, ratio)

        return (m,)

```
