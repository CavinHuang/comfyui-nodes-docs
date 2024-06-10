---
tags:
- Blur
- MaskBlur
- VisualEffects
---

# Gaussian Blur Mask
## Documentation
- Class name: `ImpactGaussianBlurMask`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactGaussianBlurMask node is designed to apply a Gaussian blur to a given mask, normalizing it to a 3-dimensional format if necessary. This process enhances the mask's smoothness and can be adjusted through kernel size and sigma parameters, making it suitable for applications requiring softened edges or gradients in mask representations.
## Input types
### Required
- **`mask`**
    - The mask input represents the target mask for the Gaussian blur operation. It is crucial for defining the area to be smoothed.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`kernel_size`**
    - Specifies the size of the Gaussian kernel used for blurring. Larger values increase the blur effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma`**
    - Determines the spread of the blur effect. Higher sigma values result in a more pronounced blur.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a blurred version of the input mask, processed to enhance smoothness and visual quality.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class GaussianBlurMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "mask": ("MASK", ),
                     "kernel_size": ("INT", {"default": 10, "min": 0, "max": 100, "step": 1}),
                     "sigma": ("FLOAT", {"default": 10.0, "min": 0.1, "max": 100.0, "step": 0.1}),
                }}

    RETURN_TYPES = ("MASK", )

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, mask, kernel_size, sigma):
        # Some custom nodes use abnormal 4-dimensional masks in the format of b, c, h, w. In the impact pack, internal 4-dimensional masks are required in the format of b, h, w, c. Therefore, normalization is performed using the normal mask format, which is 3-dimensional, before proceeding with the operation.
        mask = make_3d_mask(mask)
        mask = torch.unsqueeze(mask, dim=-1)
        mask = utils.tensor_gaussian_blur_mask(mask, kernel_size, sigma)
        mask = torch.squeeze(mask, dim=-1)
        return (mask, )

```
