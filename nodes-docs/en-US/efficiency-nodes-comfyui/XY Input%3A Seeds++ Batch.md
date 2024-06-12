---
tags:
- Batch
- DataVisualization
- XYPlotData
---

# XY Input: Seeds++ Batch
## Documentation
- Class name: `XY Input: Seeds++ Batch`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

This node is designed to generate a sequence of values representing a batch of seeds, which can be used to control the initialization or variation of processes in a batched manner. It allows for the specification of the batch size and outputs a structured representation of seed values for batch processing.
## Input types
### Required
- **`batch_count`**
    - Specifies the number of seeds to generate for the batch. This count directly influences the size of the output seed sequence, enabling control over the batch size for processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`X or Y`**
    - Comfy dtype: `XY`
    - Outputs a tuple containing the type of batch ('Seeds++ Batch') and a list of integers representing the seed values for each batch entry.
    - Python dtype: `Tuple[str, List[int]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_SeedsBatch:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
            "batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),},
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, batch_count):
        if batch_count == 0:
            return (None,)
        xy_type = "Seeds++ Batch"
        xy_value = list(range(batch_count))
        return ((xy_type, xy_value),)

```
