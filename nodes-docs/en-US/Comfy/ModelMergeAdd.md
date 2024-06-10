---
tags:
- ModelMerge
---

# ModelMergeAdd
## Documentation
- Class name: `ModelMergeAdd`
- Category: `advanced/model_merging`
- Output node: `False`

The ModelMergeAdd node is designed for merging two models by adding key patches from one model to another. This process involves cloning the first model and then applying patches from the second model, allowing for the combination of features or behaviors from both models.
## Input types
### Required
- **`model1`**
    - The first model to be cloned and to which patches from the second model will be added. It serves as the base model for the merging process.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`model2`**
    - The second model from which key patches are extracted and added to the first model. It contributes additional features or behaviors to the merged model.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The result of merging two models by adding key patches from the second model to the first. This merged model combines features or behaviors from both models.
    - Python dtype: `comfy.model_base.Model`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ModelAdd:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model1": ("MODEL",),
                              "model2": ("MODEL",),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "merge"

    CATEGORY = "advanced/model_merging"

    def merge(self, model1, model2):
        m = model1.clone()
        kp = model2.get_key_patches("diffusion_model.")
        for k in kp:
            m.add_patches({k: kp[k]}, 1.0, 1.0)
        return (m, )

```
