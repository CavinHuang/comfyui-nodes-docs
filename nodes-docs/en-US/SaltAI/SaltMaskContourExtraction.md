---
tags:
- Mask
- MaskEnhancement
- MaskRegion
---

# Countour Mask Regions Extraction
## Documentation
- Class name: `SaltMaskContourExtraction`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node is designed for extracting contours from mask regions using multiple threshold values. It applies a series of thresholds to identify and draw contours around regions of interest within the masks, effectively highlighting their boundaries.
## Input types
### Required
- **`masks`**
    - The input masks for which contours are to be extracted. These masks serve as the primary data on which the contour extraction process is applied.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
### Optional
- **`thresholds`**
    - A list of threshold values used to identify contours within the masks. Each threshold value defines a specific level of intensity for which contours are detected and drawn, allowing for a multi-faceted analysis of the mask regions.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output consists of tensors representing the extracted contours from the input masks. These tensors highlight the boundaries of regions within the masks, based on the specified threshold values.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskContourExtraction:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "thresholds": ("INT", {"default": 128, "min": 0, "max": 255, "step": 1}),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "contour_extraction"

    def contour_extraction(self, masks, thresholds=[50, 100, 150, 200]):
        regions = []

        if not isinstance(thresholds, list):
            thresholds = [thresholds]

        for mask in masks:
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))
            image_array = np.array(pil_image.convert('L'))

            combined_contours = np.zeros_like(image_array)

            for threshold in thresholds:
                _, thresh_image = cv2.threshold(image_array, threshold, 255, cv2.THRESH_BINARY)
                contours, _ = cv2.findContours(thresh_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                cv2.drawContours(combined_contours, contours, -1, (255, 255, 255), 1)

            contour_pil = Image.fromarray(combined_contours)
            region_tensor = pil2mask(contour_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
