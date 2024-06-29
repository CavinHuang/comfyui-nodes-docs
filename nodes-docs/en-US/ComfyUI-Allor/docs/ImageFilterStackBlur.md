---
tags:
- Blur
- VisualEffects
---

# ImageFilterStackBlur
## Documentation
- Class name: `ImageFilterStackBlur`
- Category: `image/filter`
- Output node: `False`

The ImageFilterStackBlur node applies a stack blur effect to images, a technique that simulates a bokeh-like blur by blending pixels in a specific radius around each point, resulting in a smooth and uniform effect.
## Input types
### Required
- **`images`**
    - The images to apply the stack blur effect on. This is the primary input that determines the visual output of the node.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`size_x`**
    - Specifies the horizontal size of the blur effect. It influences the width of the area around each pixel that is considered for the blur.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`size_y`**
    - Specifies the vertical size of the blur effect. It influences the height of the area around each pixel that is considered for the blur.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after applying the stack blur effect, showcasing a smooth and visually appealing blur.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterStackBlur:
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
                    "step": 2
                }),
                "size_y": ("INT", {
                    "default": 10,
                    "min": 1,
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

        return (cv2_layer(images, lambda x: cv2.stackBlur(x, (size_x, size_y))),)

```
