---
tags:
- GridLayout
- Image
- Tiled
---

# UnGridify (image)
## Documentation
- Class name: `UnGridify (image)`
- Category: `Bmad/image`
- Output node: `False`

The UnGridify (image) node is designed to deconstruct a gridded image into its constituent tiles or sub-images. It effectively reverses the process of assembling multiple smaller images into a single, larger grid image, allowing for the individual manipulation or analysis of each tile.
## Input types
### Required
- **`image`**
    - The gridded image to be deconstructed into its constituent tiles. This image is expected to have been previously constructed by arranging multiple smaller images into a grid format.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`columns`**
    - The number of columns in the grid. This determines how the image is split horizontally.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rows`**
    - The number of rows in the grid. This determines how the image is split vertically.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - A list of tiles extracted from the gridded image, where each tile is a smaller image that was part of the original grid.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UnGridImage:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image": ("IMAGE",),
                             "columns": grid_len_INPUT,
                             "rows": grid_len_INPUT,
                             }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "ungridify"
    CATEGORY = "Bmad/image"
    OUTPUT_IS_LIST = (True,)

    def ungridify(self, image, columns, rows):
        tiles = []
        samples = image.movedim(-1, 1)
        _, _, height, width = samples.size()
        tile_height = height // rows
        tile_width = width // columns

        for y in range(0, rows * tile_height, tile_height):
            for x in range(0, columns * tile_width, tile_width):
                tile = samples[:, :, y:y + tile_height, x:x + tile_width]
                tile = tile.movedim(1, -1)
                tiles.append(tile)

        return (tiles,)

```
