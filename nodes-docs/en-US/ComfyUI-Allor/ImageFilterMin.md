---
tags:
- ImageFilter
- VisualEffects
---

# ImageFilterMin
## Documentation
- Class name: `ImageFilterMin`
- Category: `image/filter`
- Output node: `False`

The ImageFilterMin node applies a minimum filter to images, effectively enhancing dark areas and potentially reducing noise. This filter selects the minimum pixel value in a neighborhood defined by the filter size, making it useful for image processing tasks where reducing high-frequency noise or emphasizing darker regions is desired.
## Input types
### Required
- **`images`**
    - Specifies the images to be processed. This parameter is crucial as it determines the input on which the minimum filter will be applied, directly affecting the output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`size`**
    - Defines the size of the neighborhood around each pixel to consider for the minimum filter. A larger size can lead to more pronounced smoothing and noise reduction effects.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed images after applying the minimum filter, which emphasizes darker areas and reduces noise.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterMin:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "size": ("INT", {
                    "default": 2,
                    "min": 0,
                    "step": 2
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size):
        return applyImageFilter(images, ImageFilter.MinFilter(int(size) + 1))

```
