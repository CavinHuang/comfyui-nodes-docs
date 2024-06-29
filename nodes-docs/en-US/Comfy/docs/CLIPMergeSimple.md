---
tags:
- ModelMerge
---

# CLIPMergeSimple
## Documentation
- Class name: `CLIPMergeSimple`
- Category: `advanced/model_merging`
- Output node: `False`

This node specializes in merging two CLIP models based on a specified ratio, effectively blending their characteristics. It selectively applies patches from one model to another, excluding specific components like position IDs and logit scale, to create a hybrid model that combines features from both source models.
## Input types
### Required
- **`clip1`**
    - The first CLIP model to be merged. It serves as the base model for the merging process.
    - Comfy dtype: `CLIP`
    - Python dtype: `comfy.model_base.Model`
- **`clip2`**
    - The second CLIP model to be merged. Its key patches, except for position IDs and logit scale, are applied to the first model based on the specified ratio.
    - Comfy dtype: `CLIP`
    - Python dtype: `comfy.model_base.Model`
- **`ratio`**
    - Determines the proportion of features from the second model to blend into the first model. A ratio of 1.0 means fully adopting the second model's features, while 0.0 retains only the first model's features.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`clip`**
    - Comfy dtype: `CLIP`
    - The resulting merged CLIP model, incorporating features from both input models according to the specified ratio.
    - Python dtype: `comfy.model_base.Model`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [CR Apply LoRA Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Apply LoRA Stack.md)
    - [CLIPSetLastLayer](../../Comfy/Nodes/CLIPSetLastLayer.md)



## Source code
```python
class CLIPMergeSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip1": ("CLIP",),
                              "clip2": ("CLIP",),
                              "ratio": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("CLIP",)
    FUNCTION = "merge"

    CATEGORY = "advanced/model_merging"

    def merge(self, clip1, clip2, ratio):
        m = clip1.clone()
        kp = clip2.get_key_patches()
        for k in kp:
            if k.endswith(".position_ids") or k.endswith(".logit_scale"):
                continue
            m.add_patches({k: kp[k]}, 1.0 - ratio, ratio)
        return (m, )

```
