---
tags:
- DataVisualization
- XYPlotData
---

# XY Input: Refiner On/Off
## Documentation
- Class name: `XY Input: Refiner On_Off`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

The node is designed to refine the XY plot inputs based on a specified percentage, enabling dynamic adjustment of the refinement process to optimize efficiency and accuracy in data visualization or processing tasks.
## Input types
### Required
- **`refine_at_percent`**
    - Specifies the percentage at which the refinement process should be initiated, allowing for precise control over when the refinement adjustments are applied to the XY plot.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`X or Y`**
    - Comfy dtype: `XY`
    - Outputs a tuple containing the type of refinement ('Refiner On/Off') and the corresponding XY values after applying the refinement at the specified percentage. This output aligns with the expected 'X or Y' designation, indicating either X or Y values are refined.
    - Python dtype: `Tuple[str, List[float]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_Refiner_OnOff:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "refine_at_percent": ("FLOAT",{"default": 0.80, "min": 0.00, "max": 1.00, "step": 0.01})},
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, refine_at_percent):
        xy_type = "Refiner On/Off"
        xy_value = [refine_at_percent, 1]
        return ((xy_type, xy_value),)

```
