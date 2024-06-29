---
tags:
- Mask
- MaskBatch
---

# Mask Batch Multi
## Documentation
- Class name: `MaskBatchMulti`
- Category: `KJNodes/masking`
- Output node: `False`

The `MaskBatchMulti` node is designed to create a batch of images by combining multiple masks. It allows for dynamic input count adjustment, enabling the combination of a variable number of masks into a single batch. This functionality is particularly useful in scenarios where the aggregation of mask data is required for further image processing or analysis.
## Input types
### Required
- **`inputcount`**
    - Specifies the number of input masks to be combined into a single batch. This parameter allows for dynamic adjustment of the node's input capacity, facilitating the aggregation of varying numbers of masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mask_i`**
    - Represents a mask to be included in the batch, where 'i' can range from 1 to the number specified by 'inputcount'. Each mask contributes to the aggregated batch, enabling complex mask combinations for advanced image processing tasks.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`masks`**
    - Comfy dtype: `MASK`
    - The combined batch of masks resulting from the aggregation of the input masks. This output is useful for downstream image processing tasks that require batched mask data.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskBatchMulti:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "inputcount": ("INT", {"default": 2, "min": 2, "max": 1000, "step": 1}),
                "mask_1": ("MASK", ),
                "mask_2": ("MASK", ),
            },
    }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("masks",)
    FUNCTION = "combine"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Creates an image batch from multiple masks.  
You can set how many inputs the node has,  
with the **inputcount** and clicking update.
"""

    def combine(self, inputcount, **kwargs):
        mask = kwargs["mask_1"]
        for c in range(1, inputcount):
            new_mask = kwargs[f"mask_{c + 1}"]
            if mask.shape[1:] != new_mask.shape[1:]:
                new_mask = F.interpolate(new_mask.unsqueeze(1), size=(mask.shape[1], mask.shape[2]), mode="bicubic").squeeze(1)
            mask = torch.cat((mask, new_mask), dim=0)
        return (mask,)

```
