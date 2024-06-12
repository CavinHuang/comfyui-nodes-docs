---
tags:
- Style
---

# Load Style Model
## Documentation
- Class name: `StyleModelLoader`
- Category: `loaders`
- Output node: `False`

The StyleModelLoader node is designed to load a style model from a specified path. It focuses on retrieving and initializing style models that can be used to apply specific artistic styles to images, thereby enabling the customization of visual outputs based on the loaded style model.
## Input types
### Required
- **`style_model_name`**
    - Specifies the name of the style model to be loaded. This name is used to locate the model file within a predefined directory structure, allowing for the dynamic loading of different style models based on user input or application needs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`style_model`**
    - Comfy dtype: `STYLE_MODEL`
    - Returns the loaded style model, ready for use in applying styles to images. This enables the dynamic customization of visual outputs by applying different artistic styles.
    - Python dtype: `StyleModel`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StyleModelLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "style_model_name": (folder_paths.get_filename_list("style_models"), )}}

    RETURN_TYPES = ("STYLE_MODEL",)
    FUNCTION = "load_style_model"

    CATEGORY = "loaders"

    def load_style_model(self, style_model_name):
        style_model_path = folder_paths.get_full_path("style_models", style_model_name)
        style_model = comfy.sd.load_style_model(style_model_path)
        return (style_model,)

```
