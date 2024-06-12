---
tags:
- Image
- ImagePadding
- ImageTransformation
---

# Pad Image for Outpainting
## Documentation
- Class name: `ImagePadForOutpaint`
- Category: `image`
- Output node: `False`

This node is designed for preparing images for the outpainting process by adding padding around them. It adjusts the image dimensions to ensure compatibility with outpainting algorithms, facilitating the generation of extended image areas beyond the original boundaries.
## Input types
### Required
- **`image`**
    - The 'image' input is the primary image to be prepared for outpainting, serving as the base for padding operations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`left`**
    - Specifies the amount of padding to add to the left side of the image, influencing the expanded area for outpainting.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`top`**
    - Determines the amount of padding to add to the top of the image, affecting the vertical expansion for outpainting.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`right`**
    - Defines the amount of padding to add to the right side of the image, impacting the horizontal expansion for outpainting.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bottom`**
    - Indicates the amount of padding to add to the bottom of the image, contributing to the vertical expansion for outpainting.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`feathering`**
    - Controls the smoothness of the transition between the original image and the added padding, enhancing the visual integration for outpainting.
    - Comfy dtype: `INT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output 'image' represents the padded image, ready for the outpainting process.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The output 'mask' indicates the areas of the original image and the added padding, useful for guiding the outpainting algorithms.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImagePadForOutpaint:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "left": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                "top": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                "right": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                "bottom": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                "feathering": ("INT", {"default": 40, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "expand_image"

    CATEGORY = "image"

    def expand_image(self, image, left, top, right, bottom, feathering):
        d1, d2, d3, d4 = image.size()

        new_image = torch.ones(
            (d1, d2 + top + bottom, d3 + left + right, d4),
            dtype=torch.float32,
        ) * 0.5

        new_image[:, top:top + d2, left:left + d3, :] = image

        mask = torch.ones(
            (d2 + top + bottom, d3 + left + right),
            dtype=torch.float32,
        )

        t = torch.zeros(
            (d2, d3),
            dtype=torch.float32
        )

        if feathering > 0 and feathering * 2 < d2 and feathering * 2 < d3:

            for i in range(d2):
                for j in range(d3):
                    dt = i if top != 0 else d2
                    db = d2 - i if bottom != 0 else d2

                    dl = j if left != 0 else d3
                    dr = d3 - j if right != 0 else d3

                    d = min(dt, db, dl, dr)

                    if d >= feathering:
                        continue

                    v = (feathering - d) / feathering

                    t[i, j] = v * v

        mask[top:top + d2, left:left + d3] = t

        return (new_image, mask)

```
