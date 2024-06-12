---
tags:
- Mask
- MaskGeneration
---

# Constant Mask
## Documentation
- Class name: `Constant Mask`
- Category: `Masquerade Nodes`
- Output node: `False`

The Constant Mask node is designed to create a uniform mask with a specified constant value across all its elements. It can generate masks of explicit dimensions or replicate the dimensions of a provided image, offering flexibility in mask creation for various image processing tasks.
## Input types
### Required
- **`value`**
    - Specifies the constant value to fill the mask with, allowing for control over the mask's intensity or transparency.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`explicit_height`**
    - Defines the explicit height of the generated mask, used when not replicating the size of an existing image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`explicit_width`**
    - Defines the explicit width of the generated mask, used when not replicating the size of an existing image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`copy_image_size`**
    - An optional image parameter whose dimensions are used to determine the size of the generated mask, overriding explicit dimensions if provided.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a mask filled with the specified constant value, potentially matching the dimensions of an input image if provided.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ConstantMask:
    """
    Creates a mask filled with a constant value. If copy_image_size is provided, the explicit_height and explicit_width parameters are ignored and the size of the given images will be used instead.
    """
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("FLOAT", {"default": 0.0, "min": -8.0, "max": 8.0, "step": 0.01}),
                "explicit_height": ("INT", {"default": 0, "min": 0, "max": VERY_BIG_SIZE, "step": 1}),
                "explicit_width": ("INT", {"default": 0, "min": 0, "max": VERY_BIG_SIZE, "step": 1}),
            },
            "optional": {
                "copy_image_size": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "constant_mask"

    CATEGORY = "Masquerade Nodes"

    def constant_mask(self, value, explicit_height, explicit_width, copy_image_size = None):
        height = explicit_height
        width = explicit_width
        if copy_image_size is not None:
            size = copy_image_size.size()
            height = size[1]
            width = size[2]
        elif explicit_height == 0 or explicit_width == 0:
            # We'll just make a tiny mask and let it get resized by nodes further downstream
            height = 16
            width = 16

        result = torch.zeros([1, height, width])
        result[:,:,:] = value
        return (result,)

```
