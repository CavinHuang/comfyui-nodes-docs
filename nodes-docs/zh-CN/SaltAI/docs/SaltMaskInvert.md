
# Documentation
- Class name: SaltMaskInvert
- Category: SALT/Masking/Filter
- Output node: False

SaltMaskInvert节点用于反转掩码区域的像素值，实现掩码前景和背景的翻转。这一操作在需要聚焦于给定区域反向部分的图像处理任务中至关重要。

# Input types
## Required
- masks
    - 需要进行反转的输入掩码。这个参数至关重要，因为它直接影响反转过程，决定了掩码的哪些区域将被翻转。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- MASKS
    - 反转后的掩码，其像素值与原始输入相反。这个输出对于后续需要使用反转掩码区域的图像处理或分析任务非常重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskInvert:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "add_masks"

    def add_masks(self, masks):
        return (1. - masks,)

```
