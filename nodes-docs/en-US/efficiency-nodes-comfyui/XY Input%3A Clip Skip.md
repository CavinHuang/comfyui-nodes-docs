---
tags:
- DataVisualization
- XYPlotData
---

# XY Input: Clip Skip
## Documentation
- Class name: `XY Input: Clip Skip`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

This node is designed to process and validate clip skip values for efficiency in generating XY plots. It focuses on adjusting clip skip values within specified bounds and ensuring they are appropriate for the target checkpoint, either 'Base' or 'Refiner'. The node plays a crucial role in optimizing the generation process by fine-tuning the clip skip parameters, which are essential for controlling the granularity of the plot data.
## Input types
### Required
- **`target_ckpt`**
    - Specifies the target checkpoint for which the clip skip values are being adjusted. It determines the context ('Base' or 'Refiner') in which the clip skip values are applied, affecting the output XY plot's granularity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
- **`batch_count`**
    - Defines the number of batches for which clip skip values are generated. It influences the volume of data processed and the detail level in the resulting XY plot.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`first_clip_skip`**
    - The starting point of the clip skip range. It sets the lower limit for clip skip adjustments, impacting the plot's detail level.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`last_clip_skip`**
    - The ending point of the clip skip range. It sets the upper limit for clip skip adjustments, impacting the plot's detail level.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`X or Y`**
    - Comfy dtype: `XY`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_ClipSkip:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "target_ckpt": (["Base","Refiner"],),
                "batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "first_clip_skip": ("INT", {"default": -1, "min": -24, "max": -1, "step": 1}),
                "last_clip_skip": ("INT", {"default": -3, "min": -24, "max": -1, "step": 1}),
            },
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, target_ckpt, batch_count, first_clip_skip, last_clip_skip):
        if target_ckpt == "Base":
            xy_type = "Clip Skip"
        else:
            xy_type = "Clip Skip (Refiner)"
        xy_value = generate_ints(batch_count, first_clip_skip, last_clip_skip)
        return ((xy_type, xy_value),) if xy_value else (None,)

```
