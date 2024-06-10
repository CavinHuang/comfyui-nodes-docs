---
tags:
- ComfyrollNodes
---

# ⚙️ CR Value
## Documentation
- Class name: `CR Value`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/⚙️ Other`
- Output node: `False`

The CR Value node is designed to convert a given value into multiple formats, specifically float, integer, and string, and provide a link to further documentation. It serves as a utility node for format conversion and information retrieval.
## Input types
### Required
- **`value`**
    - The 'value' parameter is the input that the node will convert into different formats. It plays a crucial role in determining the output formats (float, integer) and the information link provided.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - A floating-point representation of the input value.
    - Python dtype: `float`
- **`INT`**
    - Comfy dtype: `INT`
    - An integer representation of the input value.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL string pointing to further documentation about the CR Value node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_Value:

    @classmethod
    def INPUT_TYPES(cls):  
        return {"required": {"value": ("FLOAT", {"default": 1.0,},)}}

    RETURN_TYPES = ("FLOAT", "INT", "STRING", )
    RETURN_NAMES = ("FLOAT", "INT", "show_help", )
    CATEGORY = icons.get("Comfyroll/Utils/Other")
    FUNCTION = "get_value"

    def get_value(self, value):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-value"
        
        return (float(value), int(value), show_help, )

```
