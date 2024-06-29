---
tags:
- Crop
- Image
- ImageTransformation
---

# ImageInsetCrop
## Documentation
- Class name: `easy imageInsetCrop`
- Category: `EasyUse/Image`
- Output node: `False`

The node provides functionality for cropping an image based on specified inset dimensions, adjusting the crop area according to the given measurements and ensuring the dimensions do not exceed the image's boundaries. It supports cropping by percentage or absolute values, with additional adjustments to align the crop area to a grid, enhancing compatibility with certain image processing operations.
## Input types
### Required
- **`image`**
    - The image to be cropped, provided as a multi-dimensional array representing the image data.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`measurement`**
    - Specifies the unit of measurement for the crop dimensions, allowing for either percentage-based or absolute value cropping, which influences how the crop boundaries are calculated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`left`**
    - The left boundary of the crop area, defined either as a percentage of the image's width or as an absolute value, depending on the measurement unit.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`right`**
    - The right boundary of the crop area, similar to 'left', but for the right side of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`top`**
    - The top boundary of the crop area, defined in the same manner as 'left' and 'right', but for the top edge of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bottom`**
    - The bottom boundary of the crop area, defined similarly to the other boundaries, for the bottom edge of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The cropped image, returned as a multi-dimensional array with the same structure as the input image but with dimensions adjusted according to the specified crop boundaries.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class imageInsetCrop:

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

  CATEGORY = "EasyUse/Image"

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

    log_node_info("Image Inset Crop", f'Cropping image {width}x{height} width inset by {inset_left},{inset_right}, ' +
                 f'and height inset by {inset_top}, {inset_bottom}')
    image = image[:, inset_top:inset_bottom, inset_left:inset_right, :]

    return (image,)

```
