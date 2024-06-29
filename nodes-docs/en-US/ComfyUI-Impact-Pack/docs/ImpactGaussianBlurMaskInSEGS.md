---
tags:
- Blur
- VisualEffects
---

# Gaussian Blur Mask (SEGS)
## Documentation
- Class name: `ImpactGaussianBlurMaskInSEGS`
- Category: `ImpactPack/Util`
- Output node: `False`

This node applies a Gaussian blur to the masks within a collection of segmentation elements (SEGS), potentially enhancing the visual quality or aiding in the processing of these elements. It allows for the adjustment of the blur intensity and size, enabling fine-tuned control over the appearance of the segmentation masks.
## Input types
### Required
- **`segs`**
    - The collection of segmentation elements (SEGS) to which the Gaussian blur will be applied. This parameter is crucial for specifying the input data that will undergo the blurring process.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[str, List[SEG]]`
- **`kernel_size`**
    - Specifies the size of the Gaussian kernel used for blurring. A larger kernel size results in a more pronounced blur effect, allowing for greater control over the visual outcome.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma`**
    - Determines the standard deviation of the Gaussian kernel. This parameter influences the spread of the blur; a higher sigma value leads to a softer, more diffuse blur effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The modified collection of segmentation elements (SEGS) with the masks blurred using the specified Gaussian parameters. This output reflects the visual alteration performed on the input data.
    - Python dtype: `Tuple[str, List[SEG]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GaussianBlurMaskInSEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "segs": ("SEGS", ),
                     "kernel_size": ("INT", {"default": 10, "min": 0, "max": 100, "step": 1}),
                     "sigma": ("FLOAT", {"default": 10.0, "min": 0.1, "max": 100.0, "step": 0.1}),
                }}

    RETURN_TYPES = ("SEGS", )

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs, kernel_size, sigma):
        new_segs = []
        for seg in segs[1]:
            mask = utils.tensor_gaussian_blur_mask(seg.cropped_mask, kernel_size, sigma)
            mask = torch.squeeze(mask, dim=-1).squeeze(0).numpy()
            seg = SEG(seg.cropped_image, mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, seg.control_net_wrapper)
            new_segs.append(seg)

        return ((segs[0], new_segs), )

```
