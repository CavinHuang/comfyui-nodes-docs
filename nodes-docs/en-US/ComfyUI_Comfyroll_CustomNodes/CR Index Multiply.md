---
tags:
- MathematicalFunctions
- Multiplication
---

# 🔢 CR Index Multiply
## Documentation
- Class name: `CR Index Multiply`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔢 Index`
- Output node: `False`

This node multiplies a given index by a specified factor, potentially altering the flow or behavior of subsequent operations based on the new index value. It's designed to dynamically adjust indices within a workflow, facilitating flexible data manipulation or access patterns.
## Input types
### Required
- **`index`**
    - The 'index' parameter represents the starting point or current state of an index that will be multiplied. It's crucial for determining the base value that will be adjusted by the multiplication, affecting the node's execution and results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`factor`**
    - The 'factor' parameter specifies the multiplier applied to the index. It defines how much the index will be scaled, playing a key role in the calculation and the resulting modified index value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`index`**
    - Comfy dtype: `INT`
    - The modified index after multiplication, reflecting the new position or state as a result of the operation.
    - Python dtype: `int`
- **`factor`**
    - Comfy dtype: `INT`
    - The factor used in the multiplication, returned unchanged.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help or documentation related to the index multiplication operation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_MultiplyIndex:

    @classmethod
    def INPUT_TYPES(s):
        return {"required":{
                    "index": ("INT", {"default": 1, "min": 0, "max": 10000, "forceInput": True}),
                    "factor": ("INT", {"default": 1, "min": 0, "max": 10000}),
                    }
        }


    RETURN_TYPES = ("INT", "INT", "STRING", )
    RETURN_NAMES = ("index", "factor", "show_help", )
    FUNCTION = "multiply"
    CATEGORY = icons.get("Comfyroll/Utils/Index")
    
    def multiply(self, index, factor):
        index = index * factor
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Index-Nodes#cr-index-multiply"
        return (index, factor, show_help, ) 

```
