---
tags:
- Mask
- MaskList
---

# Mask List to Masks
## Documentation
- Class name: `MaskListToMaskBatch`
- Category: `ImpactPack/Operation`
- Output node: `False`

The MaskListToMaskBatch node is designed to transform a list of individual masks into a single batch of masks, handling differences in dimensions by upsampling and concatenating them as necessary. This operation facilitates the processing of multiple masks in a unified manner, optimizing for batch operations in image processing tasks.
## Input types
### Required
- **`mask`**
    - The 'mask' input represents a list of individual masks to be transformed into a batch. It is crucial for batch processing of images, allowing for the handling of multiple masks in a unified operation.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a batch of masks, either as a single 3D mask if the input list contains one mask, or a concatenated batch of 3D masks if the input list contains multiple masks. This facilitates batch processing in image manipulation tasks.
    - Python dtype: `Tuple[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskListToMaskBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "mask": ("MASK", ),
                      }
                }

    INPUT_IS_LIST = True

    RETURN_TYPES = ("MASK", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Operation"

    def doit(self, mask):
        if len(mask) == 1:
            mask = make_3d_mask(mask[0])
            return (mask,)
        elif len(mask) > 1:
            mask1 = make_3d_mask(mask[0])

            for mask2 in mask[1:]:
                mask2 = make_3d_mask(mask2)
                if mask1.shape[1:] != mask2.shape[1:]:
                    mask2 = comfy.utils.common_upscale(mask2.movedim(-1, 1), mask1.shape[2], mask1.shape[1], "lanczos", "center").movedim(1, -1)
                mask1 = torch.cat((mask1, mask2), dim=0)

            return (mask1,)
        else:
            empty_mask = torch.zeros((1, 64, 64), dtype=torch.float32, device="cpu").unsqueeze(0)
            return (empty_mask,)

```
