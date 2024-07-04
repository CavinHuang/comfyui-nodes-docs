
# Documentation
- Class name: `UnGridify (image)`
- Category: `Bmad/image`
- Output node: `False`

UnGridify (image) 节点旨在将网格化的图像拆解为其组成部分的子图像或瓦片。它有效地逆转了将多个小图像组装成单个大型网格图像的过程，从而允许对每个瓦片进行单独的处理或分析。

# Input types
## Required
- image
    - 需要拆解成组成瓦片的网格图像。这个图像预期是之前通过将多个小图像排列成网格格式构建而成的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- columns
    - 网格中的列数。这决定了图像在水平方向上如何被分割。
    - Comfy dtype: INT
    - Python dtype: int
- rows
    - 网格中的行数。这决定了图像在垂直方向上如何被分割。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 从网格图像中提取出的瓦片列表，其中每个瓦片都是原始网格的一部分小图像。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


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
