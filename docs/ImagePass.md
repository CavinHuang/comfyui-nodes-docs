
# Documentation
- Class name: ImagePass
- Category: KJNodes/misc
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImagePass节点充当图像数据的直接传递通道，允许图像在不进行任何修改的情况下传递。这个节点对于需要在各种处理阶段保持图像完整性的工作流程至关重要。它提供了一种简单而有效的方式来确保图像数据在复杂的处理链中保持不变。

# Input types
## Required
- image
    - 'image'输入类型接受一个将要通过节点传递的图像，确保原始图像数据不会被改变。这个输入对于维护图像在处理过程中的原始状态非常重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是未经改动的输入图像，确保原始图像数据没有被修改。这个输出保证了图像在通过节点时保持其原始形态和特性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImagePass:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
            },
        }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "passthrough"
    CATEGORY = "KJNodes/misc"
    DESCRIPTION = """
Passes the image through without modifying it.
"""

    def passthrough(self, image):
        return image,

```
