---
tags:
- Mask
- MaskBatch
---

# 🔧 Mask From Batch
## Documentation
- Class name: `MaskFromBatch+`
- Category: `essentials`
- Output node: `False`

The MaskFromBatch node is designed to extract a specific segment from a given mask based on a starting point and a length. This functionality is crucial for operations that require working with subsets of data within larger datasets, enabling precise control over the portion of the mask to be utilized.
## Input types
### Required
- **`mask`**
    - The 'mask' parameter represents the input mask from which a segment will be extracted. It is essential for specifying the data that will be operated on.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`start`**
    - The 'start' parameter specifies the beginning index of the segment to be extracted from the mask, allowing for targeted operations on specific portions of the data.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`length`**
    - The 'length' parameter determines the size of the segment to be extracted from the mask. A negative value indicates that the entire length from the start index to the end of the mask should be used, providing flexibility in the segment size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a segment of the input mask, determined by the 'start' and 'length' parameters. This allows for focused manipulation or analysis of specific parts of the mask.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskFromBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK", ),
                "start": ("INT", { "default": 0, "min": 0, "step": 1, }),
                "length": ("INT", { "default": -1, "min": -1, "step": 1, }),
            }
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, mask, start, length):
        if length<0:
            length = mask.shape[0]
        start = min(start, mask.shape[0]-1)
        length = min(mask.shape[0]-start, length)
        return (mask[start:start + length], )

```
