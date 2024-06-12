---
tags:
- Blur
- VisualEffects
---

# ImageFilterMedianBlur
## Documentation
- Class name: `ImageFilterMedianBlur`
- Category: `image/filter`
- Output node: `False`

The ImageFilterMedianBlur node applies a median blur filter to images, effectively reducing noise and smoothing the image while preserving edges. This filter is particularly useful for removing salt-and-pepper noise from images.
## Input types
### Required
- **`images`**
    - Specifies the images to be processed. This parameter is crucial as it determines the input on which the median blur effect will be applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`size`**
    - Defines the size of the kernel used for the median blur. A larger size will result in a more pronounced blurring effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns the images after applying the median blur filter, showcasing a smoother appearance with reduced noise.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterMedianBlur:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "size": ("INT", {
                    "default": 10,
                    "min": 1,
                    "step": 2
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size):
        size -= 1

        img = images.clone().detach()
        img = (img * 255).to(torch.uint8)

        return ((cv2_layer(img, lambda x: cv2.medianBlur(x, size)) / 255),)

```
