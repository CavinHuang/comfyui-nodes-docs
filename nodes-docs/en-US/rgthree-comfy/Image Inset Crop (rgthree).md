---
tags:
- Crop
- Image
- ImageTransformation
---

# Image Inset Crop (rgthree)
## Documentation
- Class name: `Image Inset Crop (rgthree)`
- Category: `rgthree`
- Output node: `False`

The Image Inset Crop node allows for the cropping of images based on specified inset values, which can be defined in either pixels or percentages. This functionality enables precise control over the cropping area, allowing users to adjust the visible portion of an image according to their needs.
## Input types
### Required
- **`image`**
    - The image to be cropped. This input is essential for defining the source image on which the cropping operation will be performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`measurement`**
    - Specifies the unit of measurement for the inset values (Pixels or Percentage). This determines how the inset values are interpreted and applied to the cropping operation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`left`**
    - The inset value from the left edge of the image. This defines how much of the left side of the image will be cropped.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`right`**
    - The inset value from the right edge of the image. This defines how much of the right side of the image will be cropped.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`top`**
    - The inset value from the top edge of the image. This defines how much of the top side of the image will be cropped.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bottom`**
    - The inset value from the bottom edge of the image. This defines how much of the bottom side of the image will be cropped.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The cropped image, adjusted according to the specified inset values.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeImageInsetCrop:
  """Image Inset Crop, with percentages."""

  NAME = get_name('Image Inset Crop')
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {
        "image": ("IMAGE",),
        "measurement": (['Pixels', 'Percentage'],),
        "left": ("INT", {
          "default": 0,
          "min": 0,
          "max": MAX_RESOLUTION,
          "step": 8
        }),
        "right": ("INT", {
          "default": 0,
          "min": 0,
          "max": MAX_RESOLUTION,
          "step": 8
        }),
        "top": ("INT", {
          "default": 0,
          "min": 0,
          "max": MAX_RESOLUTION,
          "step": 8
        }),
        "bottom": ("INT", {
          "default": 0,
          "min": 0,
          "max": MAX_RESOLUTION,
          "step": 8
        }),
      },
    }

  RETURN_TYPES = ("IMAGE",)
  FUNCTION = "crop"

  # pylint: disable = too-many-arguments
  def crop(self, measurement, left, right, top, bottom, image=None):
    """Does the crop."""

    _, height, width, _ = image.shape

    if measurement == 'Percentage':
      left = int(width - (width * (100 - left) / 100))
      right = int(width - (width * (100 - right) / 100))
      top = int(height - (height * (100 - top) / 100))
      bottom = int(height - (height * (100 - bottom) / 100))

    # Snap to 8 pixels
    left = left // 8 * 8
    right = right // 8 * 8
    top = top // 8 * 8
    bottom = bottom // 8 * 8

    if left == 0 and right == 0 and bottom == 0 and top == 0:
      return (image,)

    inset_left, inset_right, inset_top, inset_bottom = get_new_bounds(width, height, left, right,
                                                                      top, bottom)
    if inset_top > inset_bottom:
      raise ValueError(
        f"Invalid cropping dimensions top ({inset_top}) exceeds bottom ({inset_bottom})")
    if inset_left > inset_right:
      raise ValueError(
        f"Invalid cropping dimensions left ({inset_left}) exceeds right ({inset_right})")

    log_node_info(
      self.NAME, f'Cropping image {width}x{height} width inset by {inset_left},{inset_right}, ' +
      f'and height inset by {inset_top}, {inset_bottom}')
    image = image[:, inset_top:inset_bottom, inset_left:inset_right, :]

    return (image,)

```
