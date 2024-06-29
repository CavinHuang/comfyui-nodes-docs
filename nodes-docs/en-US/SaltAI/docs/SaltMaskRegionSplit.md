---
tags:
- Mask
---

# Split Regions
## Documentation
- Class name: `SaltMaskRegionSplit`
- Category: `SALT/Masking/Filter`
- Output node: `False`

The SaltMaskRegionSplit node is designed to isolate and split different regions within a given set of masks, effectively segmenting them into distinct areas based on connectivity.
## Input types
### Required
- **`masks`**
    - The input masks to be segmented into distinct regions. This parameter is crucial for determining the segmentation outcome, as it directly influences the isolation of different areas within the masks.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`region1`**
    - Comfy dtype: `MASK`
    - Represents the first isolated region from the input masks.
    - Python dtype: `torch.Tensor`
- **`region2`**
    - Comfy dtype: `MASK`
    - Represents the second isolated region from the input masks.
    - Python dtype: `torch.Tensor`
- **`region3`**
    - Comfy dtype: `MASK`
    - Represents the third isolated region from the input masks.
    - Python dtype: `torch.Tensor`
- **`region4`**
    - Comfy dtype: `MASK`
    - Represents the fourth isolated region from the input masks.
    - Python dtype: `torch.Tensor`
- **`region5`**
    - Comfy dtype: `MASK`
    - Represents the fifth isolated region from the input masks.
    - Python dtype: `torch.Tensor`
- **`region6`**
    - Comfy dtype: `MASK`
    - Represents the sixth isolated region from the input masks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskRegionSplit:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK", "MASK", "MASK", "MASK", "MASK", "MASK")
    RETURN_NAMES = ("region1", "region2", "region3", "region4", "region5", "region6")

    FUNCTION = "isolate_regions"

    def isolate_regions(self, masks):
        region_outputs = []

        for mask in masks:
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))
            mask_array = np.array(pil_image.convert('L'))

            num_labels, labels_im = cv2.connectedComponents(mask_array)

            outputs = [np.zeros_like(mask_array) for _ in range(6)]

            for i in range(1, min(num_labels, 7)):
                outputs[i-1][labels_im == i] = 255

            for output in outputs:
                output_pil = Image.fromarray(output)
                region_tensor = pil2mask(output_pil)
                region_outputs.append(region_tensor)

        regions_tensor = torch.stack(region_outputs, dim=0).view(len(masks), 6, *mask.size())
        return tuple(regions_tensor.unbind(dim=1))

```
