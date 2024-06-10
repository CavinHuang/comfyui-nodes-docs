---
tags:
- ImageMask
- ImageMaskConversion
- Mask
- MaskGeneration
---

# Convert Masks to Images
## Documentation
- Class name: `Convert Masks to Images`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node is designed to convert mask data into image format, effectively transforming binary or grayscale mask representations into RGB images. It supports processing masks of various dimensions, including individual masks and batches of masks, by expanding their channels to match the RGB color space. This functionality is crucial for visualizing masks in a more interpretable form or preparing them for further image processing tasks.
## Input types
### Required
- **`masks`**
    - The input masks to be converted into images. This parameter accepts masks of different dimensions, including individual masks and batches of masks, and transforms them into RGB images for visualization or further processing.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`IMAGES`**
    - Comfy dtype: `IMAGE`
    - The output images converted from the input masks. These images are in RGB format, suitable for visualization or further image processing tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_To_Image:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                    }
                }

    CATEGORY = "WAS Suite/Image/Masking"

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("IMAGES",)

    FUNCTION = "mask_to_image"

    def mask_to_image(self, masks):
        if masks.ndim == 4:
            # If input has shape [N, C, H, W]
            tensor = masks.permute(0, 2, 3, 1)
            tensor_rgb = torch.cat([tensor] * 3, dim=-1)
            return (tensor_rgb,)
        elif masks.ndim == 3:
            # If Input has shape [N, H, W]
            tensor = masks.unsqueeze(-1)
            tensor_rgb = torch.cat([tensor] * 3, dim=-1)
            return (tensor_rgb, )
        elif masks.ndim == 2:
            # If input has shape [H, W]
            tensor = masks.unsqueeze(0).unsqueeze(-1)
            tensor_rgb = torch.cat([tensor] * 3, dim=-1)
            return (tensor_rgb,)
        else:
            cstr("Invalid input shape. Expected [N, C, H, W] or [H, W].").error.print()
            return masks

```
