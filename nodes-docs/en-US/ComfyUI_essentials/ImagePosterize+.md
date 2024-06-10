---
tags:
- ImageTransformation
- VisualEffects
---

# 🔧 Image Posterize
## Documentation
- Class name: `ImagePosterize+`
- Category: `essentials`
- Output node: `False`

The ImagePosterize node applies a posterization effect to images, reducing the color depth of the image to a specified threshold. This process simplifies the image's color palette, creating a graphic effect by limiting the number of colors displayed.
## Input types
### Required
- **`image`**
    - The input image to be posterized. This parameter is crucial as it directly influences the visual outcome of the posterization effect.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`threshold`**
    - Defines the threshold for the posterization effect, controlling the extent to which the image's color depth is reduced. It plays a key role in determining the final appearance of the posterized image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after applying the posterization effect, featuring reduced color depth as per the specified threshold.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImagePosterize:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "threshold": ("FLOAT", { "default": 0.50, "min": 0.00, "max": 1.00, "step": 0.05, }),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image, threshold):
        image = 0.299 * image[..., 0] + 0.587 * image[..., 1] + 0.114 * image[..., 2]
        #image = image.mean(dim=3, keepdim=True)
        image = (image > threshold).float()
        image = image.unsqueeze(-1).repeat(1, 1, 1, 3)

        return(image,)

```
