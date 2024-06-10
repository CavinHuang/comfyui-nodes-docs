---
tags:
- Mask
---

# IsMaskEmpty
## Documentation
- Class name: `IsMaskEmpty`
- Category: `segment_anything`
- Output node: `False`

The IsMaskEmptyNode node is designed to determine if a given mask is entirely empty, meaning it contains no marked areas. It provides a simple yet essential functionality for mask analysis within the context of segmentation tasks, enabling the identification of masks that lack any significant content.
## Input types
### Required
- **`mask`**
    - The 'mask' parameter represents the input mask to be analyzed. It is crucial for determining whether the mask is empty or contains any marked areas, directly influencing the node's output.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`boolean_number`**
    - Comfy dtype: `NUMBER`
    - The output is a boolean value represented as a number (0 for false, meaning the mask is not empty, and 1 for true, indicating the mask is empty), indicating whether the input mask is entirely devoid of marked areas.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class IsMaskEmptyNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
            },
        }
    RETURN_TYPES = ["NUMBER"]
    RETURN_NAMES = ["boolean_number"]

    FUNCTION = "main"
    CATEGORY = "segment_anything"

    def main(self, mask):
        return (torch.all(mask == 0).int().item(), )

```
