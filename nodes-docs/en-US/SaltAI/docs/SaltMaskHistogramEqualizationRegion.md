# Hisogram Equalize Mask Regions
## Documentation
- Class name: `SaltMaskHistogramEqualizationRegion`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node applies histogram equalization to each mask in a collection of masks, enhancing the contrast of regions within the masks. It is designed to improve the visibility and differentiation of features within each mask by adjusting the distribution of intensities.
## Input types
### Required
- **`masks`**
    - The collection of masks to be processed. Each mask is enhanced individually to improve its contrast through histogram equalization.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The enhanced masks with improved contrast, resulting from the application of histogram equalization to each original mask.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskHistogramEqualizationRegion:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "histogram_equalization"

    def histogram_equalization(self, masks):
        regions = []
        for mask in masks:
            pil_image = mask2pil(mask.unsqueeze(0))
            image_array = np.array(pil_image.convert('L'))            
            equalized = cv2.equalizeHist(image_array)
            equalized_pil = ImageOps.invert(Image.fromarray(equalized))
            region_tensor = pil2mask(equalized_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
