---
tags:
- ImageTransformation
---

# ⚙️ CR Select Resize Method
## Documentation
- Class name: `CR Select Resize Method`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/⚙️ Other`
- Output node: `False`

This node allows users to select a method for resizing images, providing options between fitting and cropping to achieve the desired dimensions. It's designed to facilitate the customization of image processing workflows by offering a straightforward choice that influences how images are resized.
## Input types
### Required
- **`method`**
    - Specifies the resizing method to be used, either 'Fit' or 'Crop', affecting how the image will be resized to meet the desired dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`method`**
    - Comfy dtype: `*`
    - Returns the selected method for resizing the image.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the documentation or help page related to the selected resize method.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SelectResizeMethod:

    @classmethod
    def INPUT_TYPES(cls):
    
        methods = ["Fit", "Crop"]
        
        return {
            "required": {
                "method": (methods, ),
            }
        }
    
    RETURN_TYPES =(any_type, "STRING", )
    RETURN_NAMES =("method", "show_help", )
    FUNCTION = "set_switch"    
    CATEGORY = icons.get("Comfyroll/Utils/Other")

    def set_switch(self, method):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-select-resize-method"    
      
        return (method, show_help, )

```
