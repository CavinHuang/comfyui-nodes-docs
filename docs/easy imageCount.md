
# Documentation
- Class name: easy imageCount
- Category: EasyUse/Image
- Output node: False

easy imageCount 节点旨在统计给定批次中的图像数量，为工作流程中的图像集合提供了一种直观的量化方法。

# Input types
## Required
- images
    - images 参数代表要统计的图像批次。它对于确定存在的图像总数至关重要，直接影响节点的输出结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- count
    - count 输出代表输入批次中的图像总数，提供一个简单的整数计数。
    - Comfy dtype: INT
    - Python dtype: int


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
