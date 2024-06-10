---
tags:
- ModelMerge
---

# CLIPMergeAdd
## Documentation
- Class name: `CLIPMergeAdd`
- Category: `advanced/model_merging`
- Output node: `False`

The `CLIPMergeAdd` node is designed for combining two CLIP model instances by adding the key patches from one model to another. This process is aimed at enhancing or modifying the capabilities of the first CLIP model based on the attributes of the second, without altering specific model parameters related to position or scaling.
## Input types
### Required
- **`clip1`**
    - The primary CLIP model instance to which patches will be added. It serves as the base model for the merging process.
    - Comfy dtype: `CLIP`
    - Python dtype: `comfy.model_base.CLIP`
- **`clip2`**
    - The secondary CLIP model instance from which key patches are extracted to be added to the first model. It contributes its attributes to enhance or modify the first model.
    - Comfy dtype: `CLIP`
    - Python dtype: `comfy.model_base.CLIP`
## Output types
- **`clip`**
    - Comfy dtype: `CLIP`
    - The resulting CLIP model after merging, which includes the added patches from the second model to the first, enhancing or modifying its capabilities.
    - Python dtype: `comfy.model_base.CLIP`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CLIPAdd:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip1": ("CLIP",),
                              "clip2": ("CLIP",),
                              }}
    RETURN_TYPES = ("CLIP",)
    FUNCTION = "merge"

    CATEGORY = "advanced/model_merging"

    def merge(self, clip1, clip2):
        m = clip1.clone()
        kp = clip2.get_key_patches()
        for k in kp:
            if k.endswith(".position_ids") or k.endswith(".logit_scale"):
                continue
            m.add_patches({k: kp[k]}, 1.0, 1.0)
        return (m, )

```
