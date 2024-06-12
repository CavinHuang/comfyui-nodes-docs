---
tags:
- Mask
- MaskRegion
---

# Skeletonize Mask Regions
## Documentation
- Class name: `SaltMaskSkeletonization`
- Category: `SALT/Masking/Filter`
- Output node: `False`

The SaltMaskSkeletonization node is designed to transform input mask images into their skeletonized versions, effectively reducing the masks to their simplest form while preserving their overall geometry. This process is useful for applications requiring a minimal representation of shapes within the masks.
## Input types
### Required
- **`masks`**
    - The input masks to be skeletonized, where each mask represents a distinct region to be processed into its skeletal form.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
### Optional
- **`iterations`**
    - Specifies the number of times the erosion operation is applied to each mask, influencing the thinness of the resulting skeleton.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
- **`strength`**
    - Determines the intensity of the skeletonization process, affecting the final skeletal structure's prominence.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output tensor containing the skeletonized versions of the input masks, with each skeleton representing the minimal structure of the original mask.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskSkeletonization:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "iterations": ("INT", {"default": 1, "min": 1, "max": 10, "step": 1}),
                "strength": ("INT", {"default": 1, "min": 1, "max": 12, "step": 1})
            }
        }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "skeletonization"

    def skeletonization(self, masks, iterations=[1], strength=[1]):
        if not isinstance(iterations, list):
            iterations = [iterations]
        if not isinstance(strength, list):
            strength = [strength]

        iterations = [int(val) for val in iterations]
        strength = [int(val) for val in strength]

        regions = []
        for i, mask in enumerate(masks):
            pil_image = ImageOps.invert(mask2pil(mask.unsqueeze(0)))
            image_array = np.array(pil_image.convert('L'))

            skeleton = np.zeros_like(image_array)
            element = cv2.getStructuringElement(cv2.MORPH_CROSS, (3, 3))
            while True:
                eroded = image_array
                for _ in range(iterations[i if i < len(iterations) else -1]):
                    eroded = cv2.erode(eroded, element)

                temp = cv2.dilate(eroded, element)
                temp = cv2.subtract(image_array, temp)
                skeleton = cv2.bitwise_or(skeleton, temp)
                image_array = eroded.copy()

                if cv2.countNonZero(image_array) == 0:
                    break

                for _ in range(strength[i if i < len(strength) else -1]):
                    image_array = image_array + image_array

            skeleton_pil = Image.fromarray(skeleton)
            region_tensor = pil2mask(skeleton_pil)
            regions.append(region_tensor)

        regions_tensor = torch.cat(regions, dim=0)
        return (regions_tensor,)

```
