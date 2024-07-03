
# Documentation
- Class name: JWMaskSequenceFromMask
- Category: jamesWalker55
- Output node: False

JWMaskSequenceFromMask 节点的功能是将单个输入蒙版转换为蒙版序列，从而实现蒙版的批量处理。它通过在指定的批次大小下复制输入蒙版，使得同一蒙版可以同时应用于多个项目，从而简化了需要在多个项目上统一应用蒙版的工作流程。

# Input types
## Required
- mask
    - 这是需要转换为蒙版序列的输入蒙版。它作为基础蒙版，将在整个批次中被复制。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- batch_size
    - 指定在结果蒙版序列中应该复制输入蒙版的次数。这使得同一蒙版可以在多个项目上并行处理。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask_sequence
    - 输出是一个蒙版序列，其中每个蒙版都是输入蒙版的复制品。这种排列方式有助于在多个项目上批量处理相同的蒙版。
    - Comfy dtype: MASK_SEQUENCE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWMaskSequenceFromMask", "Mask Sequence From Mask")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "mask": ("MASK",),
            "batch_size": ("INT", {"default": 1, "min": 1, "step": 1}),
        }
    }
    RETURN_TYPES = ("MASK_SEQUENCE",)
    FUNCTION = "execute"

    def execute(
        self,
        mask: torch.Tensor,
        batch_size: int,
    ):
        assert isinstance(mask, torch.Tensor)
        assert isinstance(batch_size, int)
        assert len(mask.shape) == 2

        mask_seq = mask.reshape((1, 1, *mask.shape))
        mask_seq = mask_seq.repeat(batch_size, 1, 1, 1)

        return (mask_seq,)

```
