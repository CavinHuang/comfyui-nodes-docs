---
tags:
- Image
- ImageTransformation
---

# Image Tile Offset (mtb)
## Documentation
- Class name: `Image Tile Offset (mtb)`
- Category: `mtb/generate`
- Output node: `False`

The Image Tile Offset (mtb) node is designed to adjust the positioning of tiles within an image, allowing for the customization of tile offsets. This functionality is crucial for tasks that require precise alignment of image segments, such as in image stitching or texture mapping.
## Input types
### Required
- **`image`**
    - The input image to be processed for tile offset adjustment. This parameter is essential for defining the base image on which the tile offset operation will be performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`tilesX`**
    - Specifies the number of horizontal tiles into which the image is divided. This parameter is crucial for determining the horizontal segmentation of the image for tile adjustment.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tilesY`**
    - Specifies the number of vertical tiles into which the image is divided. This parameter is crucial for determining the vertical segmentation of the image for tile adjustment.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after applying the tile offset adjustments. This image reflects the changes made to the tile positioning, showcasing the alignment modifications.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_ImageTileOffset:
    """Mimics an old photoshop technique to check for seamless textures"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "tilesX": ("INT", {"default": 2, "min": 1}),
                "tilesY": ("INT", {"default": 2, "min": 1}),
            }
        }

    CATEGORY = "mtb/generate"

    RETURN_TYPES = ("IMAGE",)

    FUNCTION = "tile_image"

    def tile_image(
        self, image: torch.Tensor, tilesX: int = 2, tilesY: int = 2
    ):
        if tilesX < 1 or tilesY < 1:
            raise ValueError("The number of tiles must be at least 1.")

        batch_size, height, width, channels = image.shape
        tile_height = height // tilesY
        tile_width = width // tilesX

        output_image = torch.zeros_like(image)

        for i, j in itertools.product(range(tilesY), range(tilesX)):
            start_h = i * tile_height
            end_h = start_h + tile_height
            start_w = j * tile_width
            end_w = start_w + tile_width

            tile = image[:, start_h:end_h, start_w:end_w, :]

            output_start_h = (i + 1) % tilesY * tile_height
            output_start_w = (j + 1) % tilesX * tile_width
            output_end_h = output_start_h + tile_height
            output_end_w = output_start_w + tile_width

            output_image[
                :, output_start_h:output_end_h, output_start_w:output_end_w, :
            ] = tile

        return (output_image,)

```
