---
tags:
- Mask
- MaskRegion
---

# Masks to Tensors
## Documentation
- Class name: `SaltMasksToImages`
- Category: `SALT/Masking`
- Output node: `False`

This node is designed to convert a collection of mask images into a tensor representation, facilitating the transition from image processing to tensor operations for further computational tasks.
## Input types
### Required
- **`masks`**
    - The masks input represents a collection of mask images that are to be converted into tensor format. This conversion is crucial for enabling subsequent tensor-based operations and analyses.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The output is a tensor comprising the converted images from the input masks, ready for further processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMasksToImages:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",)
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)

    CATEGORY = f"{NAME}/Masking"
    FUNCTION = "convert"

    def convert(self, masks):
        images = []
        for mask in masks:
            images.append(pil2tensor(mask2pil(mask)))
        images = torch.cat(images, dim=0)
        return (images, )

```
