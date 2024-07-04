
# Documentation
- Class name: ReverseImageBatch
- Category: KJNodes/image
- Output node: False

ReverseImageBatch节点用于反转图像批次中的顺序，为图像序列操作提供了一种简单而有效的方法。

# Input types
## Required
- images
    - 需要反转顺序的图像批次。此输入对于确定输出中图像的排列顺序至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 顺序反转后的图像批次。这个输出对于需要特定图像序列的应用来说是至关重要的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ReverseImageBatch:
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "reverseimagebatch"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Reverses the order of the images in a batch.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "images": ("IMAGE",),
        },
    } 
    
    def reverseimagebatch(self, images):
        reversed_images = torch.flip(images, [0])
        return (reversed_images, )

```
