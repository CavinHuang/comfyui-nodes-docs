---
tags:
- Image
- ImageThresholding
---

# DistanceTransform
## Documentation
- Class name: `DistanceTransform`
- Category: `Bmad/CV/Thresholding`
- Output node: `False`

This node applies a distance transform to a binary image, converting it into a grayscale image where each pixel's intensity is proportional to its distance from the nearest binary foreground pixel. It supports different distance types and mask sizes to tailor the transformation.
## Input types
### Required
- **`binary_image`**
    - The binary image to which the distance transform will be applied. It serves as the input for calculating the distance to the nearest foreground pixel.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`distance_type`**
    - Specifies the type of distance calculation to use, allowing for customization of the distance transform effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`mask_size`**
    - Determines the size of the mask used in the distance transform, affecting the granularity of the distance calculation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting grayscale image where each pixel's intensity reflects its distance to the nearest foreground pixel, following the distance transform.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DistanceTransform:
    distance_types_map = {
        "DIST_L2": cv.DIST_L2,
        "DIST_L1": cv.DIST_L1,
        "DIST_C": cv.DIST_C,
    }
    distance_types = list(distance_types_map.keys())

    mask_sizes_map = {
        "DIST_MASK_3": cv.DIST_MASK_3,
        "DIST_MASK_5": cv.DIST_MASK_5,
        "DIST_MASK_PRECISE": cv.DIST_MASK_PRECISE
    }
    mask_sizes = list(mask_sizes_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "binary_image": ("IMAGE",),
                "distance_type": (s.distance_types, {"default": s.distance_types[0]}),
                "mask_size": (s.mask_sizes, {"default": s.mask_sizes[0]}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply"
    CATEGORY = "Bmad/CV/Thresholding"

    def apply(self, binary_image, distance_type, mask_size):
        binary_image = tensor2opencv(binary_image, 1)
        distance_transform = cv.distanceTransform(
            binary_image,
            self.distance_types_map[distance_type],
            self.mask_sizes_map[mask_size])
        distance_transform = opencv2tensor(distance_transform)
        return (distance_transform,)

```
