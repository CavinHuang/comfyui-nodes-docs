---
tags:
- XYPlotData
---

# XY Input: Aesthetic Score
## Documentation
- Class name: `XY Input: Aesthetic Score`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

This node is designed to generate aesthetic score values for XY plotting, allowing users to visualize and analyze the aesthetic quality of images or outputs based on specified criteria. It supports both positive and negative aesthetic scores, enabling a comprehensive assessment of aesthetic attributes.
## Input types
### Required
- **`target_ascore`**
    - Specifies the target aesthetic score type, either 'positive' or 'negative', to determine the nature of the aesthetic evaluation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`batch_count`**
    - Determines the number of aesthetic score values to generate, facilitating batch processing for efficiency and scalability.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`first_ascore`**
    - Sets the starting point of the aesthetic score range, enabling customization of the evaluation scope.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`last_ascore`**
    - Defines the end point of the aesthetic score range, allowing for precise control over the evaluation interval.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`X or Y`**
    - Comfy dtype: `XY`
    - Outputs the generated aesthetic score values, categorized as either 'AScore+' for positive or 'AScore-' for negative, suitable for XY plotting.
    - Python dtype: `Tuple[str, List[float]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_AScore:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "target_ascore": (["positive", "negative"],),
                "batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "first_ascore": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1000.0, "step": 0.01}),
                "last_ascore": ("FLOAT", {"default": 10.0, "min": 0.0, "max": 1000.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, target_ascore, batch_count, first_ascore, last_ascore):
        if target_ascore == "positive":
            xy_type = "AScore+"
        else:
            xy_type = "AScore-"
        xy_value = generate_floats(batch_count, first_ascore, last_ascore)
        return ((xy_type, xy_value),) if xy_value else (None,)

```
