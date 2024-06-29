---
tags:
- Mask
- MaskBatch
---

# 🔧 Mask Batch
## Documentation
- Class name: `MaskBatch+`
- Category: `essentials`
- Output node: `False`

The MaskBatch node is designed to combine two mask tensors into a single batched tensor. It ensures that the masks are compatible in size, potentially resizing one to match the other, before concatenating them along the batch dimension.
## Input types
### Required
- **`mask1`**
    - The first mask tensor to be batched. It is one of the inputs that will be combined with another mask tensor to form a batched tensor.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask2`**
    - The second mask tensor to be batched alongside the first mask. This tensor may be resized to ensure compatibility with the first mask before they are concatenated.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a batched tensor combining the input masks, potentially after resizing one to match the other's dimensions.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask1": ("MASK",),
                "mask2": ("MASK",),
            }
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, mask1, mask2):
        if mask1.shape[1:] != mask2.shape[1:]:
            mask2 = F.interpolate(mask2.unsqueeze(1), size=(mask1.shape[1], mask1.shape[2]), mode="bicubic").squeeze(1)

        out = torch.cat((mask1, mask2), dim=0)
        return (out,)

```
