---
tags:
- Mask
- MaskBatch
---

# 🔧 Mask Expand Batch
## Documentation
- Class name: `MaskExpandBatch+`
- Category: `essentials`
- Output node: `False`

The MaskExpandBatch node is designed to process a batch of masks, applying expansion or contraction operations to each mask in the batch. This node enables the modification of mask boundaries, either dilating (expanding) or eroding (contracting) them, based on specified parameters. It is particularly useful in image processing tasks where precise control over mask dimensions is required.
## Input types
### Required
- **`mask`**
    - The 'mask' parameter represents the input batch of masks to be processed. It is crucial for defining the masks on which the expansion or contraction operations will be applied, directly influencing the node's output.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`size`**
    - The 'size' parameter specifies the magnitude of the expansion or contraction. Positive values indicate expansion, while negative values indicate contraction, directly affecting the size of the masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - The 'method' parameter determines the technique used for expanding or contracting the masks, offering a choice between different algorithms for mask manipulation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a batch of masks that have been either expanded or contracted based on the provided parameters, suitable for further image processing applications.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskExpandBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
                "size": ("INT", { "default": 16, "min": 1, "step": 1, }),
                "method": (["expand", "repeat all", "repeat first", "repeat last"],)
            }
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, mask, size, method):
        orig_size = mask.shape[0]

        if orig_size == size:
            return (mask,)

        if size <= 1:
            return (mask[:size],)

        if 'expand' in method:
            out = torch.empty([size] + list(mask.shape)[1:], dtype=mask.dtype, device=mask.device)
            if size < orig_size:
                scale = (orig_size - 1) / (size - 1)
                for i in range(size):
                    out[i] = mask[min(round(i * scale), orig_size - 1)]
            else:
                scale = orig_size / size
                for i in range(size):
                    out[i] = mask[min(math.floor((i + 0.5) * scale), orig_size - 1)]
        elif 'all' in method:
            out = mask.repeat([math.ceil(size / mask.shape[0])] + [1] * (len(mask.shape) - 1))[:size]
        elif 'first' in method:
            if size < mask.shape[0]:
                out = mask[:size]
            else:
                out = torch.cat([mask[:1].repeat(size-mask.shape[0], 1, 1), mask], dim=0)
        elif 'last' in method:
            if size < mask.shape[0]:
                out = mask[:size]
            else:
                out = torch.cat((mask, mask[-1:].repeat((size-mask.shape[0], 1, 1))), dim=0)

        return (out,)

```
