
# Documentation
- Class name: SaltMaskAdd
- Category: SALT/Masking/Filter
- Output node: False

SaltMaskAdd节点用于对两个掩码张量进行元素级别的加法运算，并通过应用钳位操作确保结果值落在指定范围内。该节点对于合并掩码区域以创建复合掩码或通过添加另一个掩码的值来增强掩码内的某些特征至关重要。

# Input types
## Required
- masks_a
    - 要进行加法运算的第一组掩码张量。这些掩码是加法操作的主要输入之一，对生成的复合掩码有重要贡献。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- masks_b
    - 要进行加法运算的第二组掩码张量。这些掩码与第一组结合产生最终的复合掩码，影响加法运算的结果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- MASKS
    - 节点的输出，表示通过将输入掩码相加创建的复合掩码，其值经过钳位以确保保持在有效范围内。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskAdd:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks_a": ("MASK",),
                        "masks_b": ("MASK",),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "add_masks"

    def add_masks(self, masks_a, masks_b):
        if masks_a.shape != masks_b.shape or len(masks_a.shape) != 3 or len(masks_b.shape) != 3:
            raise ValueError("Both input tensors must be of shape [N, H, W].")
        added_masks = torch.clamp(masks_a + masks_b, 0, 255)
        return (added_masks,)  

```
