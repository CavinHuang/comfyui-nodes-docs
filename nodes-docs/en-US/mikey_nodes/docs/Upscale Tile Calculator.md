---
tags:
- Image
- Tiled
---

# Upscale Tile Calculator (Mikey)
## Documentation
- Class name: `Upscale Tile Calculator`
- Category: `Mikey/Image`
- Output node: `False`

This node is designed to calculate the dimensions of a tile based on the resolution specified, providing a way to adjust image tiles to a desired resolution. It abstracts the complexity of determining optimal tile dimensions for image processing tasks, facilitating the manipulation and analysis of image data.
## Input types
### Required
- **`image`**
    - The image parameter represents the input image for which the tile dimensions are to be calculated. It plays a crucial role in determining the final tile width and height based on the specified tile resolution.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`tile_resolution`**
    - The tile_resolution parameter specifies the desired resolution for the tile. It directly influences the calculation of the tile's width and height, ensuring that the output tile dimensions align with the specified resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image, unchanged from the input.
    - Python dtype: `torch.Tensor`
- **`tile_width`**
    - Comfy dtype: `INT`
    - The calculated width of the tile based on the specified tile resolution.
    - Python dtype: `int`
- **`tile_height`**
    - Comfy dtype: `INT`
    - The calculated height of the tile based on the specified tile resolution.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UpscaleTileCalculator:
    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',),
                            # 'upscale_by': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 10.0, 'step': 0.1}),
                             'tile_resolution': ('INT', {'default': 512, 'min': 1, 'max': 8192, 'step': 8})}}

    RETURN_TYPES = ('IMAGE', 'INT', 'INT')
    RETURN_NAMES = ('image', 'tile_width', 'tile_height')
    FUNCTION = 'calculate'
    CATEGORY = 'Mikey/Image'

    def upscale(self, image, upscale_method, width, height, crop):
        samples = image.movedim(-1,1)
        s = comfy.utils.common_upscale(samples, width, height, upscale_method, crop)
        s = s.movedim(1,-1)
        return (s,)

    def resize(self, image, width, height, upscale_method, crop):
        w, h = find_latent_size(image.shape[2], image.shape[1])
        #print('Resizing image from {}x{} to {}x{}'.format(image.shape[2], image.shape[1], w, h))
        img = self.upscale(image, upscale_method, w, h, crop)[0]
        return (img, )

    def calculate(self, image, tile_resolution):
        width, height = image.shape[2], image.shape[1]
        tile_width, tile_height = find_tile_dimensions(width, height, 1.0, tile_resolution)
        #print('Tile width: ' + str(tile_width), 'Tile height: ' + str(tile_height))
        return (image, tile_width, tile_height)

```
