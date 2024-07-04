
# Documentation
- Class name: JWMaskSequenceJoin
- Category: jamesWalker55
- Output node: False

该节点旨在将两个掩码序列合并成一个连接的掩码序列。它通过在指定维度上合并输入的掩码序列来操作，有效地将它们组合成一个统一的序列，可用于进一步的处理或分析。

# Input types
## Required
- mask_sequence_i
    - 该参数是输入的掩码序列，将与另一个掩码序列合并。它是节点操作的主要对象，直接影响输出结果的内容和结构。
    - Comfy dtype: MASK_SEQUENCE
    - Python dtype: unknown

# Output types
- mask_sequence
    - 输出的mask_sequence是通过连接两个输入掩码序列得到的结果。这个统一的序列可以用于后续需要组合视图的掩码操作。
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
