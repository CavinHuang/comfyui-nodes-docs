---
tags:
- ModelGuidance
---

# XY Input: CFG Scale
## Documentation
- Class name: `XY Input: CFG Scale`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

The node 'XY Input: CFG Scale' is designed to process and generate configuration scale (CFG Scale) values for XY plotting purposes within an efficiency-focused context. It aims to facilitate the visualization and analysis of CFG Scale values by generating a range of floating-point numbers based on input parameters, ensuring these values adhere to specified bounds. This node is integral for tasks that require precise CFG Scale adjustments and visual representation, contributing to the optimization and efficiency analysis of various processes.
## Input types
### Required
- **`batch_count`**
    - Specifies the number of CFG Scale values to generate. It influences the node's execution by determining the size of the output array of CFG Scale values.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`first_cfg`**
    - Defines the starting point of the CFG Scale range. It affects the lower bound of the generated CFG Scale values, ensuring the output starts from this specified value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`last_cfg`**
    - Sets the ending point of the CFG Scale range. It impacts the upper bound of the generated CFG Scale values, ensuring the output ends at this specified value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`X or Y`**
    - Comfy dtype: `XY`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [XY Plot](../../efficiency-nodes-comfyui/Nodes/XY Plot.md)



## Source code
```python
class TSC_XYplot_CFG:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "first_cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 100.0}),
                "last_cfg": ("FLOAT", {"default": 9.0, "min": 0.0, "max": 100.0}),
            }
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, batch_count, first_cfg, last_cfg):
        xy_type = "CFG Scale"
        xy_value = generate_floats(batch_count, first_cfg, last_cfg)
        return ((xy_type, xy_value),) if xy_value else (None,)

```
