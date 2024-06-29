---
tags:
- ImageSize
- ImageTransformation
---

# ImageSize
## Documentation
- Class name: `easy imageSize`
- Category: `EasyUse/Image`
- Output node: `True`

The `easy imageSize` node is designed to calculate the dimensions of an image, returning the width and height as integers. This node simplifies the process of obtaining image size metrics, making it accessible for various image processing and analysis tasks.
## Input types
### Required
- **`image`**
    - The `image` parameter is the input image for which the dimensions are to be calculated. It plays a crucial role in the node's operation by providing the necessary data to determine the image's width and height.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`width_int`**
    - Comfy dtype: `INT`
    - The width of the input image in pixels, returned as an integer.
    - Python dtype: `int`
- **`height_int`**
    - Comfy dtype: `INT`
    - The height of the input image in pixels, returned as an integer.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class imageSize:
  def __init__(self):
    pass

  @classmethod
  def INPUT_TYPES(cls):
    return {
      "required": {
        "image": ("IMAGE",),
      }
    }

  RETURN_TYPES = ("INT", "INT")
  RETURN_NAMES = ("width_int", "height_int")
  OUTPUT_NODE = True
  FUNCTION = "image_width_height"

  CATEGORY = "EasyUse/Image"

  def image_width_height(self, image):
    _, raw_H, raw_W, _ = image.shape

    width = raw_W
    height = raw_H

    if width is not None and height is not None:
      result = (width, height)
    else:
      result = (0, 0)
    return {"ui": {"text": "Width: "+str(width)+" , Height: "+str(height)}, "result": result}

```
