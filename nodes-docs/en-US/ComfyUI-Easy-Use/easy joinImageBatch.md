---
tags:
- Batch
- Image
- ImageBatch
---

# JoinImageBatch
## Documentation
- Class name: `easy joinImageBatch`
- Category: `EasyUse/Image`
- Output node: `False`

The `easy joinImageBatch` node is designed to transform a batch of images into a single, larger image. This process involves combining multiple images into one cohesive visual output, effectively creating a composite image from a collection of individual images.
## Input types
### Required
- **`images`**
    - The collection of images to be combined into a single composite image. This parameter is crucial for determining the content and layout of the final composite output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`mode`**
    - Specifies the method or mode used to combine the images into a single batch. This parameter influences the arrangement and blending of individual images within the composite output.
    - Comfy dtype: `['horizontal', 'vertical']`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Represents the output of the node, which is a single, composite image created from the input batch of images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class JoinImageBatch:
  """Turns an image batch into one big image."""

  @classmethod
  def INPUT_TYPES(s):
    return {
      "required": {
        "images": ("IMAGE",),
        "mode": (("horizontal", "vertical"), {"default": "horizontal"}),
      },
    }

  RETURN_TYPES = ("IMAGE",)
  RETURN_NAMES = ("image",)
  FUNCTION = "join"
  CATEGORY = "EasyUse/Image"

  def join(self, images, mode):
    n, h, w, c = images.shape
    image = None
    if mode == "vertical":
      # for vertical we can just reshape
      image = images.reshape(1, n * h, w, c)
    elif mode == "horizontal":
      # for horizontal we have to swap axes
      image = torch.transpose(torch.transpose(images, 1, 2).reshape(1, n * w, h, c), 1, 2)
    return (image,)

```
