---
tags:
- Blur
- VisualEffects
---

# ImageFilterBlur
## Documentation
- Class name: `ImageFilterBlur`
- Category: `image/filter`
- Output node: `False`

The ImageFilterBlur node applies a simple blurring effect to images using a specified horizontal and vertical size. This node is designed to soften images, reducing detail and noise by averaging the pixels within the defined kernel size.
## Input types
### Required
- **`images`**
    - The input images to be blurred. This parameter is crucial for defining the source images on which the blur effect will be applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`size_x`**
    - Specifies the horizontal size of the blur kernel. This size influences the extent of blurring in the horizontal direction.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`size_y`**
    - Specifies the vertical size of the blur kernel. This size influences the extent of blurring in the vertical direction.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output images after applying the blur effect. This shows the result of the blurring process on the input images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterBlur:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "size_x": ("INT", {
                    "default": 10,
                    "min": 1,
                }),
                "size_y": ("INT", {
                    "default": 10,
                    "min": 1,
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size_x, size_y):
        return (cv2_layer(images, lambda x: cv2.blur(x, (size_x, size_y))),)

```
