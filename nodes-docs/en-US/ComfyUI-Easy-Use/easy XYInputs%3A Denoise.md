---
tags:
- Batch
- DataVisualization
- XYPlotData
---

# XY Inputs: Denoise //EasyUse
## Documentation
- Class name: `easy XYInputs: Denoise`
- Category: `EasyUse/XY Inputs`
- Output node: `False`

This node is designed to facilitate the exploration and visualization of denoising effects in generative models. It allows users to adjust denoising parameters over a batch of data, providing a graphical representation of the impact of different denoising levels on the generated outputs.
## Input types
### Required
- **`batch_count`**
    - Specifies the number of batches to process, allowing for the examination of denoising effects across multiple sets of data.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`first_denoise`**
    - Sets the initial denoising level, marking the starting point for the exploration of denoising effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`last_denoise`**
    - Defines the final denoising level, enabling users to observe how increasing or decreasing denoising intensity affects the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`X or Y`**
    - Comfy dtype: `X_Y`
    - Provides a graphical representation of the denoising process, illustrating the effects of different denoising levels on the data.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Denoise:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "batch_count": ("INT", {"default": 3, "min": 0, "max": 50}),
                "first_denoise": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.1}),
                "last_denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.1}),
            }
        }

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, batch_count, first_denoise, last_denoise):
        axis = "advanced: Denoise"
        values = generate_floats(batch_count, first_denoise, last_denoise)
        return ({"axis": axis, "values": values},) if values else (None,)

```
