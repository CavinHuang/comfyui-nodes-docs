---
tags:
- Mask
- MaskRegion
---

# Bilateral Filter Mask Regions
## Documentation
- Class name: `SaltMaskBilateralFilter`
- Category: `SALT/Masking/Filter`
- Output node: `False`

The SaltMaskBilateralFilter node applies a bilateral filter to mask regions to smooth them while preserving edges, enhancing the quality of mask regions by reducing noise and maintaining structural integrity.
## Input types
### Required
- **`masks`**
    - The input masks to be processed with the bilateral filter, aiming to smooth the mask regions while preserving their edges.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
### Optional
- **`diameter`**
    - Specifies the diameter of each pixel neighborhood that is used during filtering.
    - Comfy dtype: `INT`
    - Python dtype: `List[int] or int`
- **`sigmaColor`**
    - Represents the filter sigma in the color space, controlling how much colors in the neighborhood will be mixed together.
    - Comfy dtype: `FLOAT`
    - Python dtype: `List[float] or float`
- **`sigmaSpace`**
    - Determines the filter sigma in the coordinate space, affecting the spatial closeness of pixels to be considered during filtering.
    - Comfy dtype: `FLOAT`
    - Python dtype: `List[float] or float`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output tensor of regions after applying the bilateral filter, where each region has been smoothed while preserving edges.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskBilateralFilter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "diameter": ("INT", {"default": 9, "min": 1, "max": 31, "step": 1}),
                "sigmaColor": ("FLOAT", {"default": 75.0, "min": 0.0, "max": 200.0, "step": 0.1}),
                "sigmaSpace": ("FLOAT", {"default": 75.0, "min": 0.0, "max": 200.0, "step": 0.1}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "bilateral_filter"

    def bilateral_filter(self, masks, diameter=9, sigmaColor=75.0, sigmaSpace=75.0):
        if not isinstance(diameter, list):
            diameter = [diameter]
        if not isinstance(sigmaColor, list):
            sigmaColor = [sigmaColor]
        if not isinstance(sigmaSpace, list):
            sigmaSpace = [sigmaSpace]

        regions = []
        for i, mask in enumerate(masks):
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))
            image_array = np.array(pil_image.convert('RGB'))

            current_diameter = diameter[i if i < len(diameter) else -1]
            current_sigmaColor = sigmaColor[i if i < len(sigmaColor) else -1]
            current_sigmaSpace = sigmaSpace[i if i < len(sigmaSpace) else -1]

            filtered = cv2.bilateralFilter(image_array, current_diameter, current_sigmaColor, current_sigmaSpace)

            filtered_pil = Image.fromarray(filtered)
            region_tensor = pil2mask(filtered_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
