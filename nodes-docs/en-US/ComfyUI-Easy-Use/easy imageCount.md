---
tags:
- Counting
---

# ImageCount
## Documentation
- Class name: `easy imageCount`
- Category: `EasyUse/Image`
- Output node: `False`

The `easy imageCount` node is designed to count the number of images in a given batch, providing a straightforward way to quantify image collections within a workflow.
## Input types
### Required
- **`images`**
    - The `images` parameter represents the batch of images to be counted. It is crucial for determining the total number of images present, affecting the node's output directly.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`count`**
    - Comfy dtype: `INT`
    - The `count` output represents the total number of images in the input batch, providing a simple integer count.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class imageCount:
  @classmethod
  def INPUT_TYPES(s):
    return {
      "required": {
        "images": ("IMAGE",),
      }
    }

  CATEGORY = "EasyUse/Image"

  RETURN_TYPES = ("INT",)
  RETURN_NAMES = ("count",)
  FUNCTION = "get_count"

  def get_count(self, images):
    return (images.size(0),)

```
