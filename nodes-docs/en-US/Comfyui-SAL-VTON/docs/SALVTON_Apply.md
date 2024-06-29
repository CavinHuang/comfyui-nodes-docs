---
tags:
- Face
---

# Apply SAL-VTON
## Documentation
- Class name: `SALVTON_Apply`
- Category: `Clothing - SAL-VTON`
- Output node: `False`

The SALVTON_Apply node is designed for applying the SAL-VTON (Virtual Try-On) process, enabling the overlay of a garment onto a person's image with the assistance of a garment mask. This node leverages deep learning models to achieve realistic try-on effects by considering the shape and fit of the garment relative to the person's body.
## Input types
### Required
- **`garment`**
    - The garment image to be overlaid onto the person's image. It plays a crucial role in the virtual try-on process by providing the specific item of clothing to be fitted.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`person`**
    - The person's image onto which the garment will be applied. This image serves as the base for the virtual try-on, determining how the garment will be positioned and fitted.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`garment_mask`**
    - A mask image for the garment, used to accurately overlay the garment onto the person's image by defining the garment's boundaries.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after applying the virtual try-on process, showcasing the person with the garment realistically fitted onto them.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SALVTONApply:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "garment": ("IMAGE", ),
                "person": ("IMAGE",),
                "garment_mask": ("IMAGE",)
            }
        }

    CATEGORY = node_category

    RETURN_TYPES = ("IMAGE", )
    FUNCTION = "apply_salvaton"

    def apply_salvaton(self, garment, person, garment_mask):
        return (inferSAL(folder_paths.get_folder_paths('salvton')[0], person, garment, garment_mask),)

```
