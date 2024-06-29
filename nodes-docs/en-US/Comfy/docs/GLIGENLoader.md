---
tags:
- Loader
- ModelIO
- ModelLoader
---

# GLIGENLoader
## Documentation
- Class name: `GLIGENLoader`
- Category: `loaders`
- Output node: `False`

The GLIGENLoader node is designed for loading GLIGEN models, which are specialized generative models. It facilitates the process of retrieving and initializing these models from specified paths, making them ready for further generative tasks.
## Input types
### Required
- **`gligen_name`**
    - The name of the GLIGEN model to be loaded. This parameter specifies which model file to retrieve and load, playing a crucial role in the initialization of the GLIGEN model for use.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`gligen`**
    - Comfy dtype: `GLIGEN`
    - The loaded GLIGEN model, ready for use in generative tasks. This output represents the fully initialized model that has been loaded from the specified path.
    - Python dtype: `Gligen`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [GLIGENTextBoxApply](../../Comfy/Nodes/GLIGENTextBoxApply.md)



## Source code
```python
class GLIGENLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "gligen_name": (folder_paths.get_filename_list("gligen"), )}}

    RETURN_TYPES = ("GLIGEN",)
    FUNCTION = "load_gligen"

    CATEGORY = "loaders"

    def load_gligen(self, gligen_name):
        gligen_path = folder_paths.get_full_path("gligen", gligen_name)
        gligen = comfy.sd.load_gligen(gligen_path)
        return (gligen,)

```
