---
tags:
- Flip
- Image
- ImageTransformation
---

# 🔧 Image Flip
## Documentation
- Class name: `ImageFlip+`
- Category: `essentials`
- Output node: `False`

The ImageFlip+ node provides functionality for flipping images along specified axes. It allows for the manipulation of image orientation by flipping it horizontally, vertically, or both, offering a versatile tool for image preprocessing and augmentation tasks.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image to be flipped. It is crucial for determining the content and structure of the output image after the flipping operation is performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`axis`**
    - The 'axis' parameter specifies the axes along which the image will be flipped. It can be 'x' for horizontal flipping, 'y' for vertical flipping, or 'xy' for flipping along both axes, affecting the orientation and appearance of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is the flipped version of the input image, modified according to the specified axis or axes of flipping.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFlip:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "axis": (["x", "y", "xy"],),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image, axis):
        dim = ()
        if "y" in axis:
            dim += (1,)
        if "x" in axis:
            dim += (2,)
        image = torch.flip(image, dim)

        return(image,)

```
