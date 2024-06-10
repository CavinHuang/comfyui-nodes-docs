---
tags:
- Latent
---

# SDXL Empty Latent Image (rgthree)
## Documentation
- Class name: `SDXL Empty Latent Image (rgthree)`
- Category: `rgthree`
- Output node: `False`

This node is designed to generate an empty latent image based on specified dimensions and scale it according to a clip scale. It primarily serves as a foundational step in image generation processes, where the creation of an initial, blank latent space is required before further manipulations or additions.
## Input types
### Required
- **`dimensions`**
    - Specifies the dimensions of the latent image to be generated, offering a selection of predefined sizes with aspect ratios ranging from landscape to portrait and square. This parameter is crucial for determining the base size of the latent image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip_scale`**
    - Determines the scaling factor to be applied to the dimensions of the latent image, affecting the final size of the clip area. This parameter plays a significant role in adjusting the resolution of the generated image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`batch_size`**
    - Controls the number of latent images to generate in a single batch, allowing for efficient processing of multiple images simultaneously.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The generated empty latent image.
    - Python dtype: `torch.Tensor`
- **`CLIP_WIDTH`**
    - Comfy dtype: `INT`
    - The width of the clip area after applying the clip scale to the original dimensions.
    - Python dtype: `int`
- **`CLIP_HEIGHT`**
    - Comfy dtype: `INT`
    - The height of the clip area after applying the clip scale to the original dimensions.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - KSamplerAdvanced //Inspire
    - KSampler //Inspire
    - SeedExplorer //Inspire



## Source code
```python
class RgthreeSDXLEmptyLatentImage:

  NAME = get_name('SDXL Empty Latent Image')
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {
        "dimensions": (
          [
            # 'Custom',
            '1536 x 640   (landscape)',
            '1344 x 768   (landscape)',
            '1216 x 832   (landscape)',
            '1152 x 896   (landscape)',
            '1024 x 1024  (square)',
            ' 896 x 1152  (portrait)',
            ' 832 x 1216  (portrait)',
            ' 768 x 1344  (portrait)',
            ' 640 x 1536  (portrait)',
          ],
          {
            "default": '1024 x 1024  (square)'
          }),
        "clip_scale": ("FLOAT", {
          "default": 2.0,
          "min": 1.0,
          "max": 10.0,
          "step": .5
        }),
        "batch_size": ("INT", {
          "default": 1,
          "min": 1,
          "max": 64
        }),
      },
      # "optional": {
      #   "custom_width": ("INT", {"min": 1, "max": MAX_RESOLUTION, "step": 64}),
      #   "custom_height": ("INT", {"min": 1, "max": MAX_RESOLUTION, "step": 64}),
      # }
    }

  RETURN_TYPES = ("LATENT", "INT", "INT")
  RETURN_NAMES = ("LATENT", "CLIP_WIDTH", "CLIP_HEIGHT")
  FUNCTION = "generate"

  def generate(self, dimensions, clip_scale, batch_size):
    """Generates the latent and exposes the clip_width and clip_height"""
    if True:
      result = [x.strip() for x in dimensions.split('x')]
      width = int(result[0])
      height = int(result[1].split(' ')[0])
    latent = EmptyLatentImage().generate(width, height, batch_size)[0]
    return (
      latent,
      int(width * clip_scale),
      int(height * clip_scale),
    )

```
