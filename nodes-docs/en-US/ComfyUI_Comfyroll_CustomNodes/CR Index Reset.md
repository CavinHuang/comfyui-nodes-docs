---
tags:
- ComfyrollNodes
- Index
---

# 🔢 CR Index Reset
## Documentation
- Class name: `CR Index Reset`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔢 Index`
- Output node: `False`

This node is designed to reset an index to a specified value, providing a simple way to control and reset counters or indices within a workflow.
## Input types
### Required
- **`index`**
    - The current value of the index. It is a required input that determines the starting point before the reset.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`reset_to`**
    - The value to which the index will be reset. This allows for flexible resetting of the index to any specified value within the allowed range.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`index`**
    - Comfy dtype: `INT`
    - The reset value of the index, which is the same as the 'reset_to' input value.
    - Python dtype: `int`
- **`reset_to`**
    - Comfy dtype: `INT`
    - Echoes back the 'reset_to' input value, confirming the value to which the index was reset.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the help documentation for this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_IndexReset:

    @classmethod
    def INPUT_TYPES(s):
        return {"required":{
                    "index": ("INT", {"default": 1, "min": 0, "max": 10000, "forceInput": True}),
                    "reset_to": ("INT", {"default": 1, "min": 0, "max": 10000}),
                    }
        }


    RETURN_TYPES = ("INT", "INT", "STRING", )
    RETURN_NAMES = ("index", "reset_to", "show_help", )
    FUNCTION = "reset"
    CATEGORY = icons.get("Comfyroll/Utils/Index")
    
    def reset(self, index, reset_to):
        index = reset_to
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Index-Nodes#cr-index-reset"
        return (index, reset_to, show_help, )   

```
