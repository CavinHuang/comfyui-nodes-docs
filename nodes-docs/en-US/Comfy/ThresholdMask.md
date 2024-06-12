---
tags:
- Mask
- MaskGeneration
---

# ThresholdMask
## Documentation
- Class name: `ThresholdMask`
- Category: `mask`
- Output node: `False`

The ThresholdMask node is designed to convert an image into a binary mask based on a specified threshold value. It evaluates each pixel against the threshold and categorizes it accordingly, facilitating image segmentation or object detection tasks.
## Input types
### Required
- **`mask`**
    - The 'mask' parameter represents the input image to be thresholded. It is crucial for determining which pixels will be included in the output mask based on the threshold value.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`value`**
    - The 'value' parameter sets the threshold for the conversion process. Pixels with values above this threshold will be considered part of the mask, influencing the binary segmentation outcome.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a binary mask where pixels above the threshold are marked, useful for segmentation or highlighting specific features in an image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ThresholdMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "mask": ("MASK",),
                    "value": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                }
        }

    CATEGORY = "mask"

    RETURN_TYPES = ("MASK",)
    FUNCTION = "image_to_mask"

    def image_to_mask(self, mask, value):
        mask = (mask > value).float()
        return (mask,)

```
