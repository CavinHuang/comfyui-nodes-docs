---
tags:
- Conditioning
---

# Conditioning Grid (cond)
## Documentation
- Class name: `Conditioning Grid (cond)`
- Category: `Bmad/conditioning`
- Output node: `False`

This node is designed to apply conditioning to a grid structure, enabling the customization of content generation based on specific grid coordinates. It facilitates the creation of complex, grid-based conditioning scenarios, allowing for detailed control over the generation process.
## Input types
### Required
- **`columns`**
    - Specifies the number of columns in the grid, determining the grid's horizontal dimension.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rows`**
    - Defines the number of rows in the grid, setting the grid's vertical dimension.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - The width of each grid cell, influencing the spatial resolution of the conditioning applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height of each grid cell, affecting the spatial resolution of the conditioning applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`strength`**
    - Determines the intensity of the conditioning effect, allowing for fine-tuning of the generated content's characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`base`**
    - The base conditioning that serves as the starting point for further modifications. It's crucial for establishing the initial context or theme of the generated content.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The conditioned output, representing the modified grid structure with applied conditioning.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningGridCond:
    """
    Does the job of multiple area conditions of the same size adjacent to each other.
    Saves space, and is easier and quicker to set up and modify.


    Inputs related notes
    ----------
    base : conditioning
        for most cases, you can set the base from a ClipTextEncode with an empty string.
        If you wish to have something between the cells as common ground, lower the strength and set
        the base with the shared elements.
    columns and rows : integer
        after setting the desired grid size, call the menu option "update inputs" to update
        the node's conditioning input sockets.

        In most cases, columns and rows, should not be converted to input.

        dev note: I've considered disabling columns and rows options to convert to input
        on the javascript side, which (that I am aware) could be done with a modification
        to the core/WidgetInputs.js -> isConvertableWidget(...).
        However, upon reflection, I think there may be use cases in which the inputs are set for the
        maximum size but only a selected number of columns or rows given via input are used.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "columns": grid_len_INPUT,
            "rows": grid_len_INPUT,
            "width": ("INT", {"default": 256, "min": 16, "max": 2048, "step": 1}),
            "height": ("INT", {"default": 256, "min": 16, "max": 2048, "step": 1}),
            "strength": ("FLOAT", {"default": 3, }),
            "base": ("CONDITIONING",)
        }}

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "set_conditioning"
    CATEGORY = "Bmad/conditioning"

    def set_conditioning(self, base, columns, rows, width, height, strength, **kwargs):
        cond = base
        cond_set_area_node = nodes.ConditioningSetArea()
        cond_combine_node = nodes.ConditioningCombine()

        for r in range(rows):
            for c in range(columns):
                arg_name = f"r{r + 1}_c{c + 1}"
                new_cond = kwargs[arg_name]
                new_cond_area = cond_set_area_node.append(new_cond, width, height, c * width, r * height, strength)[0]
                new_cond = cond_combine_node.combine(new_cond_area, cond)[0]

                cond = new_cond
        return (cond,)

```
