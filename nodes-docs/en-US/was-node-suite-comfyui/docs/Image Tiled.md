---
tags:
- Image
- Tiled
---

# Image Tiled
## Documentation
- Class name: `Image Tiled`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

This node is designed to process an image by dividing it into a specified number of smaller, equally-sized tiles. It aims to facilitate image analysis or manipulation tasks that benefit from focusing on smaller sections of an image at a time.
## Input types
### Required
- **`image`**
    - The input image to be tiled. This parameter is crucial as it determines the source image that will be divided into smaller tiles.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`num_tiles`**
    - Specifies the number of tiles the input image should be divided into. This parameter directly influences the granularity of the tiling process, affecting both the number and size of the resulting tiles.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGES`**
    - Comfy dtype: `IMAGE`
    - The output is a collection of smaller, equally-sized tiles derived from the input image. These tiles can be individually analyzed or manipulated further.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Tile_Batch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "num_tiles": ("INT", {"default":4, "max": 64, "min":2, "step":1}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("IMAGES",)
    FUNCTION = "tile_image"

    CATEGORY = "WAS Suite/Image/Process"

    def tile_image(self, image, num_tiles=6):
        image = tensor2pil(image.squeeze(0))
        img_width, img_height = image.size

        num_rows = int(num_tiles ** 0.5)
        num_cols = (num_tiles + num_rows - 1) // num_rows
        tile_width = img_width // num_cols
        tile_height = img_height // num_rows

        tiles = []
        for y in range(0, img_height, tile_height):
            for x in range(0, img_width, tile_width):
                tile = image.crop((x, y, x + tile_width, y + tile_height))
                tiles.append(pil2tensor(tile))

        tiles = torch.stack(tiles, dim=0).squeeze(1)

        return (tiles, )

```
