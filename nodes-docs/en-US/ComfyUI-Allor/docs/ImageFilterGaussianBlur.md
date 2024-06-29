---
tags:
- Blur
- VisualEffects
---

# ImageFilterGaussianBlur
## Documentation
- Class name: `ImageFilterGaussianBlur`
- Category: `image/filter`
- Output node: `False`

This node applies a Gaussian blur filter to images, smoothing out image noise and details by using a Gaussian function. It's designed to process images by blurring them in a way that mimics the effect of viewing the image through a translucent screen, effectively reducing image noise and detail.
## Input types
### Required
- **`images`**
    - The images to be processed. This parameter is crucial as it specifies the target images for the Gaussian blur effect.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`size_x`**
    - Specifies the horizontal size of the Gaussian kernel. This affects the extent of the blurring effect horizontally.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`size_y`**
    - Specifies the vertical size of the Gaussian kernel. This affects the extent of the blurring effect vertically.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The blurred images after applying the Gaussian blur filter.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterGaussianBlur:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "size_x": ("INT", {
                    "default": 10,
                    "min": 2,
                    "step": 2
                }),
                "size_y": ("INT", {
                    "default": 10,
                    "min": 2,
                    "step": 2
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size_x, size_y):
        size_x -= 1
        size_y -= 1

        return (cv2_layer(images, lambda x: cv2.GaussianBlur(x, (size_x, size_y), size_x, size_y)),)

```
