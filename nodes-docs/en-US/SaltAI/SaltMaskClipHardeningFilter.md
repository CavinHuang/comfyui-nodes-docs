---
tags:
- Mask
- MaskRegion
---

# Clip Harden Region
## Documentation
- Class name: `SaltMaskClipHardeningFilter`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node applies a clip hardening filter to mask regions, enhancing their edges and details through a sharpening process. It allows for adjustable strength to control the intensity of the effect.
## Input types
### Required
- **`masks`**
    - The masks to be processed, enhancing their clarity and definition.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
### Optional
- **`strength`**
    - Controls the intensity of the sharpening effect applied to the masks. A higher value results in a more pronounced effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The processed masks with enhanced edges and details after applying the clip hardening filter.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskClipHardeningFilter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "strength": ("FLOAT", {"default": 1.5, "min": 0.1, "max": 6.0, "step": 0.01}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "sharpening_filter"

    def sharpening_filter(self, masks, strength=1.5):
        if not isinstance(strength, list):
            strength = [strength]

        regions = []
        for i, mask in enumerate(masks):
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))
            image_array = np.array(pil_image.convert('RGB'))

            current_strength = strength[i if i < len(strength) else -1]

            kernel = np.array([[-1, -1, -1],
                               [-1, 8 * current_strength, -1],
                               [-1, -1, -1]])

            sharpened = cv2.filter2D(image_array, -1, kernel)
            sharpened = np.clip(sharpened, 0, 255).astype(np.uint8)

            sharpened_pil = Image.fromarray(sharpened)
            region_tensor = pil2mask(sharpened_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
