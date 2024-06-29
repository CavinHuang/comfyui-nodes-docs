---
tags:
- Mask
- MaskGeneration
---

# ToBinaryMask
## Documentation
- Class name: `ToBinaryMask`
- Category: `ImpactPack/Operation`
- Output node: `False`

The ToBinaryMask node is designed to convert a given mask into a binary mask based on a specified threshold. This operation is fundamental in image processing tasks where binary masks are required to distinguish between areas of interest and the background.
## Input types
### Required
- **`mask`**
    - The mask input represents the original mask that will be converted into a binary format. The conversion is based on the threshold value, making this input crucial for the operation's outcome.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`threshold`**
    - The threshold input determines the cutoff value for converting the original mask into a binary mask. Pixels with values above this threshold will be considered as part of the mask, affecting the binary mask's final appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a binary mask where each pixel is either 0 or 1, indicating whether it belongs to the mask or the background, respectively.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [MaskToImage](../../Comfy/Nodes/MaskToImage.md)
    - [MaskToSEGS](../../ComfyUI-Impact-Pack/Nodes/MaskToSEGS.md)



## Source code
```python
class ToBinaryMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                      "mask": ("MASK",),
                      "threshold": ("INT", {"default": 20, "min": 1, "max": 255}),
                    }
                }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Operation"

    def doit(self, mask, threshold):
        mask = to_binary_mask(mask, threshold/255.0)
        return (mask,)

```
