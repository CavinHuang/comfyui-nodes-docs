---
tags:
- Mask
- MaskMorphology
---

# Dilate/Erode Mask
## Documentation
- Class name: `DilateErodeMask`
- Category: `mask/filters`
- Output node: `False`

The DilateErodeMask node is designed to modify mask images by either dilating or eroding them, based on the specified radius and shape. This process adjusts the boundaries of objects within the mask, either expanding or contracting them to achieve the desired morphological effect.
## Input types
### Required
- **`masks`**
    - Specifies the mask images to be processed. The modification of these masks through dilation or erosion alters the boundaries of the objects they contain, depending on the operation's parameters.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`radius`**
    - Determines the extent of the dilation or erosion effect. A positive radius dilates the mask, expanding object boundaries, while a negative radius erodes the mask, contracting them.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`shape`**
    - Defines the shape of the structuring element used in the dilation or erosion process. This can be either a 'box' or a 'circle', influencing the morphological transformation's nature.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The modified mask image after applying the dilation or erosion operation, reflecting the adjusted boundaries of objects within the mask.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DilateErodeMask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "masks": ("MASK",),
                "radius": ("INT", {
                    "default": 0,
                    "min": -1023,
                    "max": 1023,
                    "step": 1
                }),
                "shape": (["box", "circle"],),
            },
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "dilate_mask"

    CATEGORY = "mask/filters"

    def dilate_mask(self, masks, radius, shape):
        
        if radius == 0:
            return (masks,)
        
        s = abs(radius)
        d = s * 2 + 1
        k = np.zeros((d, d), np.uint8)
        if shape == "circle":
            k = cv2.circle(k, (s,s), s, 1, -1)
        else:
            k += 1
        
        dup = copy.deepcopy(masks.cpu().numpy())
        
        for index, mask in enumerate(dup):
            if radius > 0:
                dup[index] = cv2.dilate(mask, k, iterations=1)
            else:
                dup[index] = cv2.erode(mask, k, iterations=1)
        
        return (torch.from_numpy(dup),)

```
