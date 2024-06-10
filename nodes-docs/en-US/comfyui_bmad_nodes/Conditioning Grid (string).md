---
tags:
- Conditioning
---

# Conditioning Grid (string)
## Documentation
- Class name: `Conditioning Grid (string)`
- Category: `Bmad/conditioning`
- Output node: `False`

This node automates the process of generating conditioning for a grid layout by encoding text inputs using a ClipTextEncode node. Each text input is transformed into a conditioning that is then applied to the grid's AreaConditioners, streamlining the creation of conditioned grids for generative tasks.
## Input types
### Required
- **`clip`**
    - The CLIP model used for encoding the text inputs into conditionings. It plays a crucial role in interpreting the text and converting it into a format that can be utilized for conditioning.
    - Comfy dtype: `CLIP`
    - Python dtype: `comfy.sd.CLIP`
- **`base`**
    - A base text input that serves as the foundational conditioning for the grid. This input is encoded and used as a starting point for further conditioning.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`columns`**
    - The number of columns in the grid. This determines the grid's horizontal dimension and affects how text inputs are organized and conditioned.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rows`**
    - The number of rows in the grid. This determines the grid's vertical dimension and affects how text inputs are organized and conditioned.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - The width of each cell in the grid, in pixels. This affects the spatial resolution of the conditioning applied to each grid cell.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height of each cell in the grid, in pixels. This affects the spatial resolution of the conditioning applied to each grid cell.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`strength`**
    - The strength of the conditioning applied to the grid. This parameter influences the intensity of the conditioning effect on the generated content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The resulting conditioning for the grid, ready to be used in generative tasks. It encapsulates the encoded text inputs applied to the grid's layout.
    - Python dtype: `CONDITIONING`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningGridStr:
    """
    Node similar to ConditioningGridCond, but automates an additional step, using a ClipTextEncode per text input.
    Each conditioning obtained from the text inputs is then used as input for the Grid's AreaConditioners.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "clip": ("CLIP",),
            "base": ("STRING", {"default": '', "multiline": False}),
            "columns": grid_len_INPUT,
            "rows": grid_len_INPUT,
            "width": ("INT", {"default": 256, "min": 16, "max": 2048, "step": 1}),
            "height": ("INT", {"default": 256, "min": 16, "max": 2048, "step": 1}),
            "strength": ("FLOAT", {"default": 3, }),
        }}

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "set_conditioning"
    CATEGORY = "Bmad/conditioning"

    def set_conditioning(self, clip, base, columns, rows, width, height, strength, **kwargs):
        text_encode_node = nodes.CLIPTextEncode()
        cond_grid_node = ConditioningGridCond()

        encoded_base = text_encode_node.encode(clip, base)[0]
        encoded_grid = {}
        for r in range(rows):
            for c in range(columns):
                cell = f"r{r + 1}_c{c + 1}"
                encoded_grid[cell] = text_encode_node.encode(clip, kwargs[cell])[0]

        return cond_grid_node.set_conditioning(encoded_base, columns, rows, width, height, strength, **encoded_grid)

```
