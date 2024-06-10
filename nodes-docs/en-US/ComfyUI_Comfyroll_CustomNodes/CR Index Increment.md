---
tags:
- ComfyrollNodes
- Index
---

# 🔢 CR Index Increment
## Documentation
- Class name: `CR Index Increment`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔢 Index`
- Output node: `False`

The CR Index Increment node is designed to modify an index value by incrementing it with a specified interval. It provides a simple yet effective way to iterate through sequences or collections by adjusting the index according to the defined interval.
## Input types
### Required
- **`index`**
    - The 'index' parameter represents the current position in a sequence or collection. It is the base value that will be incremented to move to the next position.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interval`**
    - The 'interval' parameter specifies the amount by which the 'index' should be incremented. This allows for flexible stepping through a sequence or collection.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`index`**
    - Comfy dtype: `INT`
    - The updated index after being incremented by the specified interval.
    - Python dtype: `int`
- **`interval`**
    - Comfy dtype: `INT`
    - The 'interval' parameter as it was input, unchanged by the operation.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and information about the CR Index Increment node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_IncrementIndex:

    @classmethod
    def INPUT_TYPES(s):
        return {"required":{
                    "index": ("INT", {"default": 1, "min": -10000, "max": 10000, "forceInput": True}),
                    "interval": ("INT", {"default": 1, "min": -10000, "max": 10000}),
                    }
        }

    RETURN_TYPES = ("INT", "INT", "STRING", )
    RETURN_NAMES = ("index", "interval", "show_help", )
    FUNCTION = "increment"
    CATEGORY = icons.get("Comfyroll/Utils/Index")
    
    def increment(self, index, interval):
        index+=interval
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Index-Nodes#cr-index-increment"
        return (index, show_help, )

```
