---
tags:
- MaskInversion
---

# InvertMask (segment anything)
## Documentation
- Class name: `InvertMask (segment anything)`
- Category: `segment_anything`
- Output node: `False`

The InvertMask node is designed for the inversion of mask values, effectively flipping the masked and unmasked areas. This operation is fundamental in image processing tasks where the focus of interest needs to be switched between the foreground and background.
## Input types
### Required
- **`mask`**
    - The 'mask' parameter represents the input mask whose values are to be inverted. This inversion process is crucial for tasks that require toggling the areas of interest within an image.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a mask with inverted values, where previously masked areas are now unmasked and vice versa, facilitating operations that require the opposite area of interest.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [MaskToImage](../../Comfy/Nodes/MaskToImage.md)
    - [PorterDuffImageComposite](../../Comfy/Nodes/PorterDuffImageComposite.md)
    - [ImageCompositeMasked](../../Comfy/Nodes/ImageCompositeMasked.md)
    - [VAEEncodeForInpaint](../../Comfy/Nodes/VAEEncodeForInpaint.md)
    - [FeatherMask](../../Comfy/Nodes/FeatherMask.md)



## Source code
```python
class InvertMask:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("MASK",),
            }
        }
    CATEGORY = "segment_anything"
    FUNCTION = "main"
    RETURN_TYPES = ("MASK",)

    def main(self, mask):
        out = 1.0 - mask
        return (out,)

```
