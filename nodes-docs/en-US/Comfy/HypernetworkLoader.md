---
tags:
- Loader
- ModelIO
- ModelLoader
---

# HypernetworkLoader
## Documentation
- Class name: `HypernetworkLoader`
- Category: `loaders`
- Output node: `False`

The HypernetworkLoader node is designed to enhance or modify the capabilities of a given model by applying a hypernetwork. It loads a specified hypernetwork and applies it to the model, potentially altering its behavior or performance based on the strength parameter. This process allows for dynamic adjustments to the model's architecture or parameters, enabling more flexible and adaptive AI systems.
## Input types
### Required
- **`model`**
    - The model to which the hypernetwork will be applied. This parameter is crucial as it determines the base architecture that will be enhanced or modified by the hypernetwork.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`hypernetwork_name`**
    - The name of the hypernetwork to be loaded and applied to the model. This parameter specifies which hypernetwork is used, impacting the model's modified behavior or performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength`**
    - A scalar that adjusts the intensity of the hypernetwork's effect on the model. It allows for fine-tuning how significantly the hypernetwork alters the model's behavior or performance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model after the hypernetwork has been applied. This output reflects the alterations made to the original model, showcasing the impact of the hypernetwork.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class HypernetworkLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "hypernetwork_name": (folder_paths.get_filename_list("hypernetworks"), ),
                              "strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "load_hypernetwork"

    CATEGORY = "loaders"

    def load_hypernetwork(self, model, hypernetwork_name, strength):
        hypernetwork_path = folder_paths.get_full_path("hypernetworks", hypernetwork_name)
        model_hypernetwork = model.clone()
        patch = load_hypernetwork_patch(hypernetwork_path, strength)
        if patch is not None:
            model_hypernetwork.set_model_attn1_patch(patch)
            model_hypernetwork.set_model_attn2_patch(patch)
        return (model_hypernetwork,)

```
