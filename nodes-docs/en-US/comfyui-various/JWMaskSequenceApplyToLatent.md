---
tags:
- Mask
---

# Apply Mask Sequence to Latent
## Documentation
- Class name: `JWMaskSequenceApplyToLatent`
- Category: `jamesWalker55`
- Output node: `False`

This node applies a mask sequence to a latent representation, modifying the latent samples by incorporating the mask sequence into their structure. It's designed to integrate specific mask patterns into the latent space, enabling targeted modifications or enhancements.
## Input types
### Required
- **`samples`**
    - The latent representation to which the mask sequence will be applied. This parameter is crucial for determining the base structure that will be modified by the mask.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
- **`mask_sequence`**
    - The mask sequence to be applied to the latent samples. This parameter defines the specific modifications or enhancements to be made to the latent structure.
    - Comfy dtype: `MASK_SEQUENCE`
    - Python dtype: `torch.Tensor`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The modified latent representation after applying the mask sequence. This output reflects the integration of the mask pattern into the original latent samples.
    - Python dtype: `dict`
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
