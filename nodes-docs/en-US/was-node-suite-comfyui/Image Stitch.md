---
tags:
- Image
- ImageTransformation
---

# Image Stitch
## Documentation
- Class name: `Image Stitch`
- Category: `WAS Suite/Image/Transform`
- Output node: `False`

The Image Stitch node is designed to seamlessly combine two images together along a specified edge (top, left, bottom, right) with an option for feathering to blend the images smoothly. This node is part of the WAS Suite's image transformation capabilities, enabling creative and technical image manipulation.
## Input types
### Required
- **`image_a`**
    - The first image to be stitched. It serves as the base image to which the second image will be stitched.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_b`**
    - The second image to be stitched to the first image. The stitching process combines this image with the first image along a specified edge.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`stitch`**
    - Specifies the edge along which the second image will be stitched to the first image. Options include 'top', 'left', 'bottom', and 'right'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`feathering`**
    - Determines the amount of feathering applied to the edge where the images are stitched together, allowing for a smoother transition between the two images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after stitching the two input images together along the specified edge with optional feathering.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Stitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image_a": ("IMAGE",),
                "image_b": ("IMAGE",),
                "stitch": (["top", "left", "bottom", "right"],),
                "feathering": ("INT", {"default": 50, "min": 0, "max": 2048, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_stitching"

    CATEGORY = "WAS Suite/Image/Transform"

    def image_stitching(self, image_a, image_b, stitch="right", feathering=50):

        valid_stitches = ["top", "left", "bottom", "right"]
        if stitch not in valid_stitches:
            cstr(f"The stitch mode `{stitch}` is not valid. Valid sitch modes are {', '.join(valid_stitches)}").error.print()
        if feathering > 2048:
            cstr(f"The stitch feathering of `{feathering}` is too high. Please choose a value between `0` and `2048`").error.print()

        WTools = WAS_Tools_Class();

        stitched_image = WTools.stitch_image(tensor2pil(image_a), tensor2pil(image_b), stitch, feathering)

        return (pil2tensor(stitched_image), )

```
