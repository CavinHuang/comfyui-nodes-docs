
# Documentation
- Class name: SaltMaskSubtract
- Category: SALT/Masking/Filter
- Output node: False

SaltMaskSubtract节点专门用于执行两组遮罩之间的减法运算，有效地计算它们之间的差异，以突出或移除遮罩内的特定区域。

# Input types
## Required
- masks_a
    - 作为被减数的第一组遮罩。这个输入在确定减法运算的基础上起着至关重要的作用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- masks_b
    - 作为减数的第二组遮罩。这个输入对于识别结果遮罩中需要被移除或突出的区域至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- MASKS
    - 从第一组遮罩中减去第二组遮罩的结果，生成一组新的突出差异的遮罩。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskSubtract:
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

    FUNCTION = "subtract_masks"

    def subtract_masks(self, masks_a, masks_b):
        subtracted_masks = torch.clamp(masks_a - masks_b, 0, 255)
        return (subtracted_masks,)

```
