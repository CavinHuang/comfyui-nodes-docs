---
tags:
- ModelMerge
---

# ModelMergeSimple
## Documentation
- Class name: `ModelMergeSimple`
- Category: `advanced/model_merging`
- Output node: `False`

The ModelMergeSimple node is designed for merging two models by blending their parameters based on a specified ratio. This node facilitates the creation of hybrid models that combine the strengths or characteristics of both input models.
## Input types
### Required
- **`model1`**
    - The first model to be merged. It serves as the base model onto which patches from the second model are applied.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`model2`**
    - The second model whose patches are applied onto the first model, influenced by the specified ratio.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_base.Model`
- **`ratio`**
    - Determines the blend ratio between the two models' parameters, affecting the degree to which each model influences the merged output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The resulting merged model, incorporating elements from both input models according to the specified ratio.
    - Python dtype: `comfy.model_base.Model`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)
    - [CR Apply LoRA Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Apply LoRA Stack.md)
    - [ModelMergeSimple](../../Comfy/Nodes/ModelMergeSimple.md)
    - Reroute



## Source code
```python
class ModelMergeSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model1": ("MODEL",),
                              "model2": ("MODEL",),
                              "ratio": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "merge"

    CATEGORY = "advanced/model_merging"

    def merge(self, model1, model2, ratio):
        m = model1.clone()
        kp = model2.get_key_patches("diffusion_model.")
        for k in kp:
            m.add_patches({k: kp[k]}, 1.0 - ratio, ratio)
        return (m, )

```
