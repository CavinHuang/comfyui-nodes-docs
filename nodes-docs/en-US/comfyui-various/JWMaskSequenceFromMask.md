---
tags:
- Mask
---

# Mask Sequence From Mask
## Documentation
- Class name: `JWMaskSequenceFromMask`
- Category: `jamesWalker55`
- Output node: `False`

This node transforms a given mask into a mask sequence, allowing for batch processing of masks by replicating the input mask across a specified batch size. It's designed to facilitate operations on multiple instances of the same mask simultaneously, streamlining workflows that require uniform mask application across several items.
## Input types
### Required
- **`mask`**
    - The input mask to be transformed into a mask sequence. It serves as the base mask that will be replicated across the batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`batch_size`**
    - Specifies the number of times the input mask should be replicated in the resulting mask sequence, enabling parallel processing of the same mask across multiple items.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask_sequence`**
    - Comfy dtype: `MASK_SEQUENCE`
    - The output is a sequence of masks, each a replica of the input mask, arranged to facilitate batch processing of the same mask across multiple items.
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
