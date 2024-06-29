---
tags:
- ImageSize
- ImageTransformation
---

# ImageSize (Side)
## Documentation
- Class name: `easy imageSizeBySide`
- Category: `EasyUse/Image`
- Output node: `True`

This node calculates the dimension of an image based on the specified side (longest or shortest), providing a simple way to obtain image resolution metrics.
## Input types
### Required
- **`image`**
    - The image for which the dimension is to be calculated, affecting the output by determining the longest or shortest side based on the image's width and height.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`side`**
    - Specifies whether to calculate the dimension based on the longest or shortest side of the image, directly influencing the result by selecting the appropriate dimension.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`resolution`**
    - Comfy dtype: `INT`
    - The calculated dimension (width or height) of the specified side (longest or shortest) of the image.
    - Python dtype: `int`
- **`ui`**
    - Displays the calculated dimension of the specified side of the image.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class imageSizeBySide:
  def __init__(self):
    pass

  @classmethod
  def INPUT_TYPES(cls):
    return {
      "required": {
        "image": ("IMAGE",),
        "side": (["Longest", "Shortest"],)
      }
    }

  RETURN_TYPES = ("INT",)
  RETURN_NAMES = ("resolution",)
  OUTPUT_NODE = True
  FUNCTION = "image_side"

  CATEGORY = "EasyUse/Image"

  def image_side(self, image, side):
    _, raw_H, raw_W, _ = image.shape

    width = raw_W
    height = raw_H
    if width is not None and height is not None:
      if side == "Longest":
         result = (width,) if width > height else (height,)
      elif side == 'Shortest':
         result = (width,) if width < height else (height,)
    else:
      result = (0,)
    return {"ui": {"text": str(result[0])}, "result": result}

```
