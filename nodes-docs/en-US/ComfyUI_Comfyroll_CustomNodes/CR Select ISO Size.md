---
tags:
- ImageTransformation
---

# ⚙️ CR Select ISO Size
## Documentation
- Class name: `CR Select ISO Size`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/⚙️ Other`
- Output node: `False`

This node allows users to select an ISO paper size from a predefined list of sizes, and returns the dimensions (width and height) of the selected size along with a URL to a help page.
## Input types
### Required
- **`iso_size`**
    - Specifies the ISO paper size to be selected. The choice of size directly determines the dimensions (width and height) that will be returned.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The width of the selected ISO paper size.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height of the selected ISO paper size.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing additional information about selecting ISO sizes.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SelectISOSize:

    @classmethod
    def INPUT_TYPES(cls):
     
        sizes = list(iso_sizes.keys()) 
        
        return {
            "required": {
                "iso_size": (sizes, ),
            }
        }
    
    RETURN_TYPES =("INT", "INT","STRING", )
    RETURN_NAMES =("width", "height","show_help", )
    FUNCTION = "get_size"    
    CATEGORY = icons.get("Comfyroll/Utils/Other")

    def get_size(self, iso_size):
    
        if iso_size in iso_sizes:
            width, height = iso_sizes[iso_size]
        else:
            print("Size not found.")
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-select-iso-size"    
      
        return (width, height, show_help, )

```
