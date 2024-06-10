---
tags:
- DepthMap
- Image
- Inpaint
---

# Denoise to Compositing Mask
## Documentation
- Class name: `INPAINT_DenoiseToCompositingMask`
- Category: `inpaint`
- Output node: `False`

This node is designed to transform a noisy mask into a cleaner, more usable mask for compositing purposes. It adjusts the mask based on provided offset and threshold parameters to enhance its quality for further image processing tasks.
## Input types
### Required
- **`mask`**
    - The mask input is a key component for denoising, serving as the primary data that the node will process to produce a cleaner mask.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`offset`**
    - The offset parameter allows for adjusting the starting point of the mask's intensity, aiding in the denoising process by setting a baseline for what is considered noise.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`threshold`**
    - The threshold parameter defines the upper limit of mask intensity to be considered in the denoising process, helping to isolate the significant parts of the mask from noise.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a denoised mask, optimized for compositing tasks by adjusting its values within a specified range.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DenoiseToCompositingMask:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("MASK",),
                "offset": (
                    "FLOAT",
                    {"default": 0.1, "min": 0.0, "max": 1.0, "step": 0.01},
                ),
                "threshold": (
                    "FLOAT",
                    {"default": 0.2, "min": 0.01, "max": 1.0, "step": 0.01},
                ),
            }
        }

    RETURN_TYPES = ("MASK",)
    CATEGORY = "inpaint"
    FUNCTION = "convert"

    def convert(self, mask: Tensor, offset: float, threshold: float):
        assert 0.0 <= offset < threshold <= 1.0, "Threshold must be higher than offset"
        mask = (mask - offset) * (1 / (threshold - offset))
        mask = mask.clamp(0, 1)
        return (mask,)

```
