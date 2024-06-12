---
tags:
- Batch
- DataVisualization
- XYPlotData
---

# XY Input: Denoise
## Documentation
- Class name: `XY Input: Denoise`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

This node is designed to generate a set of floating-point values representing denoising levels for a batch of data. It abstracts the process of calculating denoise values across a specified range, facilitating the visualization or analysis of denoising effects in a computational efficiency context.
## Input types
### Required
- **`batch_count`**
    - Specifies the number of denoise values to generate, allowing for control over the granularity of the denoising analysis.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`first_denoise`**
    - Defines the starting point of the denoise range, enabling customization of the denoising process's lower bound.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`last_denoise`**
    - Sets the endpoint of the denoise range, allowing for the adjustment of the upper limit in the denoising analysis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`X or Y`**
    - Comfy dtype: `XY`
    - Outputs a tuple containing the type of values ('Denoise') and the generated floating-point denoise values, suitable for plotting or further analysis.
    - Python dtype: `Tuple[str, List[float]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_Denoise:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "first_denoise": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "last_denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, batch_count, first_denoise, last_denoise):
        xy_type = "Denoise"
        xy_value = generate_floats(batch_count, first_denoise, last_denoise)
        return ((xy_type, xy_value),) if xy_value else (None,)

```
