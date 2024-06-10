---
tags:
- ImageEnhancement
- ImageTransformation
- VisualEffects
---

# 🔧 Image Desaturate
## Documentation
- Class name: `ImageDesaturate+`
- Category: `essentials`
- Output node: `False`

The ImageDesaturate+ node is designed to adjust the saturation level of an image, effectively desaturating it to varying degrees based on a specified factor. This operation can transform the image into grayscale or partially reduce its color intensity, offering a range of visual effects from full color to black and white.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image to be desaturated. It is crucial for defining the visual content that will undergo the desaturation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`factor`**
    - The 'factor' parameter controls the degree of desaturation applied to the image, with a range from 0 (no change) to 1 (full grayscale). This allows for fine-tuning the intensity of the desaturation effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is the desaturated version of the input image, with its saturation level adjusted according to the specified factor.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDesaturate:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "factor": ("FLOAT", { "default": 1.00, "min": 0.00, "max": 1.00, "step": 0.05, }),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image, factor):
        grayscale = 0.299 * image[..., 0] + 0.587 * image[..., 1] + 0.114 * image[..., 2]
        grayscale = (1.0 - factor) * image + factor * grayscale.unsqueeze(-1).repeat(1, 1, 1, 3)
        return(grayscale,)

```
