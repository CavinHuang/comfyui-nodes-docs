---
tags:
- GridLayout
- Image
- Tiled
---

# Repeat Into Grid (image)
## Documentation
- Class name: `Repeat Into Grid (image)`
- Category: `Bmad/image`
- Output node: `False`

This node tiles the input image samples into a grid of configurable dimensions, effectively repeating the image across a specified number of rows and columns to create a larger, grid-like composite image.
## Input types
### Required
- **`image`**
    - The input image to be tiled across the grid. It determines the base image that will be repeated across the specified grid dimensions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`columns`**
    - Specifies the number of columns in the grid. It determines how many times the input image is repeated horizontally.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rows`**
    - Specifies the number of rows in the grid. It determines how many times the input image is repeated vertically.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a single image composed of the input image tiled according to the specified rows and columns, forming a grid.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RepeatIntoGridImage:
    """
    Tiles the input samples into a grid of configurable dimensions.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image": ("IMAGE",),
                             "columns": grid_len_INPUT,
                             "rows": grid_len_INPUT,
                             }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "repeat_into_grid"
    CATEGORY = "Bmad/image"

    def repeat_into_grid(self, image, columns, rows):
        samples = image.movedim(-1, 1)
        samples = samples.repeat(1, 1, rows, columns)
        samples = samples.movedim(1, -1)
        return (samples,)

```
