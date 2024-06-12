---
tags:
- Blur
- MaskBlur
- VisualEffects
---

# Blur Mask (Fast)
## Documentation
- Class name: `BlurMaskFast`
- Category: `mask/filters`
- Output node: `False`

The BlurMaskFast node is designed to apply a Gaussian blur to masks, allowing for the softening of edges and the creation of a smoother mask appearance. This operation is particularly useful in image processing tasks where the harshness of mask boundaries needs to be reduced.
## Input types
### Required
- **`masks`**
    - Specifies the masks to be blurred. This input is crucial for defining the areas within the image where the blur effect will be applied.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`radius_x`**
    - Determines the horizontal radius of the Gaussian blur. A larger radius results in a more pronounced blur effect horizontally.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`radius_y`**
    - Determines the vertical radius of the Gaussian blur. A larger radius results in a more pronounced blur effect vertically.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a mask that has been smoothed by the Gaussian blur process, with softer edges compared to the original.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BlurMaskFast:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "masks": ("MASK",),
                "radius_x": ("INT", {
                    "default": 1,
                    "min": 0,
                    "max": 1023,
                    "step": 1
                }),
                "radius_y": ("INT", {
                    "default": 1,
                    "min": 0,
                    "max": 1023,
                    "step": 1
                }),
            },
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "blur_mask"

    CATEGORY = "mask/filters"

    def blur_mask(self, masks, radius_x, radius_y):
        
        if radius_x + radius_y == 0:
            return (masks,)
        
        dx = radius_x * 2 + 1
        dy = radius_y * 2 + 1
        
        dup = copy.deepcopy(masks.cpu().numpy())
        
        for index, mask in enumerate(dup):
            dup[index] = cv2.GaussianBlur(mask, (dx, dy), 0)
        
        return (torch.from_numpy(dup),)

```
