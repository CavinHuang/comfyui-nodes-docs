---
tags:
- Mask
---

# Join Mask Sequence
## Documentation
- Class name: `JWMaskSequenceJoin`
- Category: `jamesWalker55`
- Output node: `False`

This node is designed to join two mask sequences into a single, concatenated mask sequence. It operates by merging the input mask sequences along a specified dimension, effectively combining them into a unified sequence that can be used for further processing or analysis.
## Input types
### Required
- **`mask_sequence_i`**
    - unknown
    - Comfy dtype: `MASK_SEQUENCE`
    - Python dtype: `unknown`
## Output types
- **`mask_sequence`**
    - Comfy dtype: `MASK_SEQUENCE`
    - The resulting mask sequence obtained by concatenating the two input mask sequences. This unified sequence can be utilized for subsequent operations that require a combined view of the input masks.
    - Python dtype: `torch.Tensor`
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
