---
tags:
- ImageSize
- ImageTransformation
---

# ImageSize (LongerSide)
## Documentation
- Class name: `easy imageSizeByLongerSide`
- Category: `EasyUse/Image`
- Output node: `True`

This node is designed to determine the dimensions of an image by identifying and measuring the longer side. It simplifies the process of working with image dimensions in scenarios where the size of the longer side is crucial, offering a straightforward approach to image size adjustment while preserving the aspect ratio.
## Input types
### Required
- **`image`**
    - The image input is essential for determining its dimensions, with a specific focus on measuring the longer side to accurately adjust the image size.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
## Output types
- **`resolution`**
    - Comfy dtype: `INT`
    - Outputs the resolution as an integer, representing the size of the longer side of the image.
    - Python dtype: `int`
- **`ui`**
    - Provides a user-friendly textual representation of the dimension of the longer side of the image.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class imageSizeByLongerSide:
  def __init__(self):
    pass

  @classmethod
  def INPUT_TYPES(cls):
    return {
      "required": {
        "image": ("IMAGE",),
      }
    }

  RETURN_TYPES = ("INT",)
  RETURN_NAMES = ("resolution",)
  OUTPUT_NODE = True
  FUNCTION = "image_longer_side"

  CATEGORY = "EasyUse/Image"

  def image_longer_side(self, image):
    _, raw_H, raw_W, _ = image.shape

    width = raw_W
    height = raw_H
    if width is not None and height is not None:
      if width > height:
         result = (width,)
      else:
         result = (height,)
    else:
      result = (0,)
    return {"ui": {"text": str(result[0])}, "result": result}

```
