---
tags:
- ComfyrollNodes
- Index
---

# 📉 CR XY Index
## Documentation
- Class name: `CR XY Index`
- Category: `🧩 Comfyroll Studio/✨ Essential/📉 XY Grid`
- Output node: `False`

The CR XY Index node is designed to calculate the X and Y positions in a grid based on a given index. It facilitates the organization and navigation of elements within a grid structure by converting a linear index into two-dimensional coordinates.
## Input types
### Required
- **`x_columns`**
    - Specifies the number of columns in the grid. It determines how the index is translated into the X coordinate, affecting the grid's horizontal layout.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y_rows`**
    - Defines the number of rows in the grid. It influences the calculation of the Y coordinate from the index, impacting the grid's vertical structure.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`index`**
    - The linear index to be converted into X and Y coordinates. This index helps in locating a specific element within the grid structure.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`x`**
    - Comfy dtype: `INT`
    - The calculated X coordinate in the grid, derived from the provided index.
    - Python dtype: `int`
- **`y`**
    - Comfy dtype: `INT`
    - The Y coordinate in the grid, calculated based on the index and the grid dimensions.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing detailed information and guidance on using the CR XY Index node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_XYIndex: 

    @classmethod
    def INPUT_TYPES(s):
        gradient_profiles = ["Lerp"]    
    
        return {"required": {"x_columns":("INT", {"default": 5.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "y_rows":("INT", {"default": 5.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                             "index": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),                             
                }
        }

    RETURN_TYPES = ("INT", "INT", "STRING", )
    RETURN_NAMES = ("x", "y", "show_help", )    
    FUNCTION = "index"
    CATEGORY = icons.get("Comfyroll/XY Grid") 

    def index(self, x_columns, y_rows, index):

        # Index values for all XY nodes start from 1
        index -=1
        
        x = index % x_columns
        y = int(index / x_columns)  
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/XY-Grid-Nodes#cr-xy-index"

        return (x, y, show_help, )

```
