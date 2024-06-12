---
tags:
- Loader
- ModelIO
- ModelLoader
---

# HypernetworkLoader (dirty)
## Documentation
- Class name: `HypernetworkLoader (dirty)`
- Category: `Bmad/api/dirty loaders`
- Output node: `False`

The HypernetworkLoader node is designed to dynamically modify a given model by applying a hypernetwork patch. This process enhances the model's capabilities by integrating additional computational paths, thereby enabling more complex and nuanced behaviors. The node focuses on the customization and enhancement of models through the application of hypernetworks, facilitating a more versatile and adaptive model performance.
## Input types
### Required
- **`model`**
    - The 'model' parameter represents the base model to which the hypernetwork patch will be applied. It is crucial for defining the starting point of the enhancement process, as the hypernetwork's modifications are built upon this model.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`hypernetwork_name`**
    - The 'hypernetwork_name' parameter specifies the name of the hypernetwork to be applied to the model. It determines the specific computational modifications that will be integrated into the model, affecting its behavior and performance.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`strength`**
    - The 'strength' parameter controls the intensity of the hypernetwork's influence on the model. It adjusts how significantly the hypernetwork's modifications impact the model's behavior, allowing for fine-tuning of the enhancement process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The output 'model' is the enhanced version of the input model, having been modified by the applied hypernetwork patch. It represents the culmination of the node's process, showcasing the model's improved capabilities and performance.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DirtyHypernetworkLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"model": ("MODEL",),
                             "hypernetwork_name": ("STRING", {"default": ""}),
                             "strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             }}

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "load_hypernetwork"

    CATEGORY = "Bmad/api/dirty loaders"

    def load_hypernetwork(self, model, hypernetwork_name, strength):
        hypernetwork_name = DirtyLoaderUtils.find_matching_filename(
            hypernetwork_name, folder_paths.get_filename_list("hypernetworks"))

        loader = hyper.HypernetworkLoader()
        return loader.load_hypernetwork(model, hypernetwork_name, strength)

```
