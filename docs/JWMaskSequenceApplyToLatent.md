
# Documentation
- Class name: JWMaskSequenceApplyToLatent
- Category: jamesWalker55
- Output node: False

此节点将掩码序列应用于潜在表示，通过将掩码序列合并到潜在样本的结构中来修改它们。它旨在将特定的掩码模式整合到潜在空间中，从而实现有针对性的修改或增强。

# Input types
## Required
- samples
    - 将要应用掩码序列的潜在表示。这个参数对于确定将被掩码修改的基础结构至关重要。
    - Comfy dtype: LATENT
    - Python dtype: dict
- mask_sequence
    - 将被应用到潜在样本的掩码序列。这个参数定义了将对潜在结构进行的具体修改或增强。
    - Comfy dtype: MASK_SEQUENCE
    - Python dtype: torch.Tensor

# Output types
- latent
    - 应用掩码序列后的修改后的潜在表示。这个输出反映了掩码模式与原始潜在样本的整合结果。
    - Comfy dtype: LATENT
    - Python dtype: dict


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
