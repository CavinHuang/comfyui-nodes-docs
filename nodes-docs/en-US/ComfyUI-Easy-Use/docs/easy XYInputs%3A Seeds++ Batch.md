---
tags:
- Batch
- DataVisualization
- XYPlotData
---

# XY Inputs: Seeds++ Batch //EasyUse
## Documentation
- Class name: `easy XYInputs: Seeds++ Batch`
- Category: `EasyUse/XY Inputs`
- Output node: `False`

This node is designed to generate a batch of seed values for plotting or other batch processing tasks, where each seed represents a unique starting point for the generation process. It allows for the specification of the batch size, providing flexibility in how many seeds are generated and used.
## Input types
### Required
- **`batch_count`**
    - Specifies the number of seeds to generate in the batch. This parameter allows the user to control the scale of the batch operation, affecting the total number of unique starting points available for generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`X or Y`**
    - Comfy dtype: `X_Y`
    - Outputs a dictionary containing the axis label and the batch of seed values, ready for use in plotting or further processing.
    - Python dtype: `Dict[str, Union[str, int]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_SeedsBatch:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
            "batch_count": ("INT", {"default": 3, "min": 1, "max": 50}), },
        }

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, batch_count):

        axis = "advanced: Seeds++ Batch"
        xy_values = {"axis": axis, "values": batch_count}
        return (xy_values,)

```
