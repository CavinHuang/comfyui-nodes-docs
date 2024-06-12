---
tags:
- Crop
- Image
- ImageTransformation
---

# CropMask
## Documentation
- Class name: `CropMask`
- Category: `mask`
- Output node: `False`

The CropMask node is designed for cropping a specified area from a given mask. It allows users to define the region of interest by specifying coordinates and dimensions, effectively extracting a portion of the mask for further processing or analysis.
## Input types
### Required
- **`mask`**
    - The mask input represents the mask image to be cropped. It is essential for defining the area to be extracted based on the specified coordinates and dimensions.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`x`**
    - The x coordinate specifies the starting point on the horizontal axis from which the cropping should begin.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y`**
    - The y coordinate determines the starting point on the vertical axis for the cropping operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - Width defines the horizontal extent of the crop area from the starting point.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Height specifies the vertical extent of the crop area from the starting point.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a cropped mask, which is a portion of the original mask defined by the specified coordinates and dimensions.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [VAEEncodeForInpaint](../../Comfy/Nodes/VAEEncodeForInpaint.md)
    - [MaskToImage](../../Comfy/Nodes/MaskToImage.md)



## Source code
```python
class CropMask:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("MASK",),
                "x": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
                "y": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
                "width": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                "height": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
            }
        }

    CATEGORY = "mask"

    RETURN_TYPES = ("MASK",)

    FUNCTION = "crop"

    def crop(self, mask, x, y, width, height):
        mask = mask.reshape((-1, mask.shape[-2], mask.shape[-1]))
        out = mask[:, y:y + height, x:x + width]
        return (out,)

```
