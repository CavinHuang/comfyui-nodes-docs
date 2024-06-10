---
tags:
- Comparison
---

# 🔧 Image Enhance Difference
## Documentation
- Class name: `ImageEnhanceDifference+`
- Category: `essentials`
- Output node: `False`

This node is designed to enhance the difference between two images by applying a power transformation. It aims to highlight the disparities between the images, potentially for further analysis or visual effect enhancement.
## Input types
### Required
- **`image1`**
    - The first image to compare. It serves as the baseline for the enhancement process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image2`**
    - The second image to compare. This image is adjusted to match the first image's dimensions if necessary, before the difference enhancement.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`exponent`**
    - A factor that controls the intensity of the enhancement. Higher values increase the contrast between the differences.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The enhanced difference image, highlighting disparities between the input images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEnhanceDifference:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image1": ("IMAGE",),
                "image2": ("IMAGE",),
                "exponent": ("FLOAT", { "default": 0.75, "min": 0.00, "max": 1.00, "step": 0.05, }),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image1, image2, exponent):
        if image1.shape != image2.shape:
            image2 = p(image2)
            image2 = comfy.utils.common_upscale(image2, image1.shape[2], image1.shape[1], upscale_method='bicubic', crop='center')
            image2 = pb(image2)

        diff_image = image1 - image2
        diff_image = torch.pow(diff_image, exponent)
        diff_image = torch.clamp(diff_image, 0, 1)

        return(diff_image,)

```
