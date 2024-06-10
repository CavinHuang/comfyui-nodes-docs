---
tags:
- ModelMerge
---

# CLIPMergeSubtract
## Documentation
- Class name: `CLIPMergeSubtract`
- Category: `advanced/model_merging`
- Output node: `False`

The CLIPMergeSubtract node is designed for advanced model merging operations, specifically to subtract one CLIP model from another, adjusted by a multiplier. This node enables the customization of CLIP models by selectively subtracting features or weights from one model based on another, facilitating the creation of new, modified CLIP models.
## Input types
### Required
- **`clip1`**
    - The first CLIP model to be used in the subtraction operation. It serves as the base model from which features will be subtracted.
    - Comfy dtype: `CLIP`
    - Python dtype: `comfy.model_base.CLIP`
- **`clip2`**
    - The second CLIP model whose features will be subtracted from the first model. This model provides the features or weights to be subtracted.
    - Comfy dtype: `CLIP`
    - Python dtype: `comfy.model_base.CLIP`
- **`multiplier`**
    - A multiplier that adjusts the scale of subtraction, allowing for fine-tuning of the extent to which features from the second model are subtracted from the first.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`clip`**
    - Comfy dtype: `CLIP`
    - The resulting CLIP model after subtracting features from the first model based on the second model, adjusted by the multiplier.
    - Python dtype: `comfy.model_base.CLIP`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CLIPSubtract:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip1": ("CLIP",),
                              "clip2": ("CLIP",),
                              "multiplier": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("CLIP",)
    FUNCTION = "merge"

    CATEGORY = "advanced/model_merging"

    def merge(self, clip1, clip2, multiplier):
        m = clip1.clone()
        kp = clip2.get_key_patches()
        for k in kp:
            if k.endswith(".position_ids") or k.endswith(".logit_scale"):
                continue
            m.add_patches({k: kp[k]}, - multiplier, multiplier)
        return (m, )

```
