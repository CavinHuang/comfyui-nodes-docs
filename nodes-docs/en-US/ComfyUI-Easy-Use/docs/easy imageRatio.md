---
tags:
- AspectRatio
- ImageSize
- ImageTransformation
---

# ImageRatio
## Documentation
- Class name: `easy imageRatio`
- Category: `EasyUse/Image`
- Output node: `True`

The `easy imageRatio` node calculates the simplified width and height ratios of an image, providing both integer and floating-point representations. This functionality is essential for understanding the aspect ratio of images in a more digestible form, which can be particularly useful for resizing, scaling, or any form of image manipulation where maintaining aspect ratio is crucial.
## Input types
### Required
- **`image`**
    - The input image for which the width and height ratios are to be calculated. This image's dimensions are used to compute the greatest common divisor (GCD) and subsequently the simplified width and height ratios.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Tuple[int, int, int, int]`
## Output types
- **`width_ratio_int`**
    - Comfy dtype: `INT`
    - The simplified width ratio of the image as an integer.
    - Python dtype: `int`
- **`height_ratio_int`**
    - Comfy dtype: `INT`
    - The simplified height ratio of the image as an integer.
    - Python dtype: `int`
- **`width_ratio_float`**
    - Comfy dtype: `FLOAT`
    - The simplified width ratio of the image as a floating-point number, identical to the integer ratio in this context.
    - Python dtype: `float`
- **`height_ratio_float`**
    - Comfy dtype: `FLOAT`
    - The simplified height ratio of the image as a floating-point number, identical to the integer ratio in this context.
    - Python dtype: `float`
- **`ui`**
    - A user interface element displaying the image ratio in a human-readable format, such as '4:3'.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class imageRatio:
  def __init__(self):
    pass

  @classmethod
  def INPUT_TYPES(cls):
    return {
      "required": {
        "image": ("IMAGE",),
      }
    }

  RETURN_TYPES = ("INT", "INT", "FLOAT", "FLOAT")
  RETURN_NAMES = ("width_ratio_int", "height_ratio_int", "width_ratio_float", "height_ratio_float")
  OUTPUT_NODE = True
  FUNCTION = "image_ratio"

  CATEGORY = "EasyUse/Image"

  def gcf(self, a, b):
    while b:
      a, b = b, a % b
    return a

  def image_ratio(self, image):
    _, raw_H, raw_W, _ = image.shape

    width = raw_W
    height = raw_H

    ratio = self.gcf(width, height)

    if width is not None and height is not None:
      width_ratio = width // ratio
      height_ratio = height // ratio
      result = (width_ratio, height_ratio, width_ratio, height_ratio)
    else:
      width_ratio = 0
      height_ratio = 0
      result = (0, 0, 0.0, 0.0)
    text = f"Image Ratio is {str(width_ratio)}:{str(height_ratio)}"

    return {"ui": {"text": text}, "result": result}

```
