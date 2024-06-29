---
tags:
- Mask
---

# Separate Mask Components
## Documentation
- Class name: `Separate Mask Components`
- Category: `Masquerade Nodes`
- Output node: `False`

This node is designed to process a given mask by separating it into multiple contiguous components, effectively breaking down a complex mask into simpler, individual parts. It returns these separated components along with a mapping that can be utilized in subsequent operations, particularly useful in batch processing scenarios.
## Input types
### Required
- **`mask`**
    - The mask input is a crucial component for the operation of this node, as it represents the complex mask that needs to be broken down into simpler, contiguous components. The processing of this mask determines the output of separated mask components and their mapping.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`mask`**
    - Comfy dtype: `IMAGE`
    - The output masks represent the separated contiguous components derived from the original complex mask input.
    - Python dtype: `torch.Tensor`
- **`mask_mappings`**
    - Comfy dtype: `MASK_MAPPING`
    - The mask mappings provide a reference to the original mask from which each separated component was derived, facilitating further processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SeparateMaskComponents:
    """
    Separates a mask into multiple contiguous components. Returns the individual masks created as well as a MASK_MAPPING which can be used in other nodes when dealing with batches.
    """
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE","MASK_MAPPING")
    RETURN_NAMES = ("mask", "mask_mappings")
    FUNCTION = "separate"

    CATEGORY = "Masquerade Nodes"

    def separate(self, mask):
        mask = tensor2mask(mask)

        thresholded = torch.gt(mask,0).unsqueeze(1)
        B, H, W = mask.shape
        components = torch.arange(B * H * W, device=mask.device, dtype=mask.dtype).reshape(B, 1, H, W) + 1
        components[~thresholded] = 0

        while True:
            previous_components = components
            components = torch.nn.functional.max_pool2d(components, kernel_size=3, stride=1, padding=1)
            components[~thresholded] = 0
            if torch.equal(previous_components, components):
                break

        components = components.reshape(B, H, W)
        segments = torch.unique(components)
        result = torch.zeros([len(segments) - 1, H, W])
        index = 0
        mapping = torch.zeros([len(segments) - 1], device=mask.device, dtype=torch.int)
        for i in range(len(segments)):
            segment = segments[i].item()
            if segment == 0:
                continue
            image_index = int((segment - 1) // (H * W))
            segment_mask = (components[image_index,:,:] == segment)
            result[index][segment_mask] = mask[image_index][segment_mask]
            mapping[index] = image_index
            index += 1

        return (result,mapping,)

```
