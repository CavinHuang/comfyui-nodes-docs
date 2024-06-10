---
tags:
- BoundingBox
- Image
- ImageTransformation
---

# 🔧 Mask Bounding Box
## Documentation
- Class name: `MaskBoundingBox+`
- Category: `essentials`
- Output node: `False`

The MaskBoundingBox node is designed to calculate the axis-aligned bounding box (AABB) of given masks. It aims to identify the minimal rectangular area that entirely encompasses the non-zero regions of each mask, providing a foundational tool for further image processing or analysis tasks.
## Input types
### Required
- **`mask`**
    - The input mask for which the bounding box is to be calculated. This parameter is crucial for determining the area of interest within the mask and directly influences the output bounding box.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`padding`**
    - Specifies the amount of padding to add to the calculated bounding box, allowing for adjustments to the box size beyond the exact non-zero regions of the mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blur`**
    - Defines the level of blur to apply to the mask before calculating the bounding box, potentially smoothing out irregularities and affecting the final box dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `float`
### Optional
- **`image_optional`**
    - An optional image parameter that, if provided, can be used in conjunction with the mask for enhanced bounding box calculations, incorporating visual context.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASK`**
    - Comfy dtype: `MASK`
    - The output mask after applying the bounding box calculation, potentially adjusted for padding and blur.
    - Python dtype: `torch.Tensor`
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - An optional output image that has been cropped or adjusted based on the bounding box calculations, incorporating any specified padding or blur effects.
    - Python dtype: `torch.Tensor`
- **`x`**
    - Comfy dtype: `INT`
    - The x-coordinate of the upper-left corner of the calculated bounding box.
    - Python dtype: `int`
- **`y`**
    - Comfy dtype: `INT`
    - The y-coordinate of the upper-left corner of the calculated bounding box.
    - Python dtype: `int`
- **`width`**
    - Comfy dtype: `INT`
    - The width of the calculated bounding box.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height of the calculated bounding box.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskBoundingBox:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
                "padding": ("INT", { "default": 0, "min": 0, "max": 4096, "step": 1, }),
                "blur": ("INT", { "default": 0, "min": 0, "max": 128, "step": 1, }),
            },
            "optional": {
                "image_optional": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("MASK", "IMAGE", "INT", "INT", "INT", "INT")
    RETURN_NAMES = ("MASK", "IMAGE", "x", "y", "width", "height")
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, mask, padding, blur, image_optional=None):
        if mask.dim() == 2:
            mask = mask.unsqueeze(0)

        if image_optional is None:
            image_optional = mask.unsqueeze(3).repeat(1, 1, 1, 3)

        # resize the image if it's not the same size as the mask
        if image_optional.shape[1] != mask.shape[1] or image_optional.shape[2] != mask.shape[2]:
            image_optional = p(image_optional)
            image_optional = comfy.utils.common_upscale(image_optional, mask.shape[2], mask.shape[1], upscale_method='bicubic', crop='center')
            image_optional = pb(image_optional)
        
        # match batch size
        if image_optional.shape[0] < mask.shape[0]:
            image_optional = torch.cat((image_optional, image_optional[-1].unsqueeze(0).repeat(mask.shape[0]-image_optional.shape[0], 1, 1, 1)), dim=0)
        elif image_optional.shape[0] > mask.shape[0]:
            image_optional = image_optional[:mask.shape[0]]

        # blur the mask
        if blur > 0:
            if blur % 2 == 0:
                blur += 1
            mask = T.functional.gaussian_blur(mask.unsqueeze(1), blur).squeeze(1)
        
        _, y, x = torch.where(mask)
        x1 = max(0, x.min().item() - padding)
        x2 = min(mask.shape[2], x.max().item() + 1 + padding)
        y1 = max(0, y.min().item() - padding)
        y2 = min(mask.shape[1], y.max().item() + 1 + padding)

        # crop the mask
        mask = mask[:, y1:y2, x1:x2]
        image_optional = image_optional[:, y1:y2, x1:x2, :]
        
        return (mask, image_optional, x1, y1, x2 - x1, y2 - y1)

```
