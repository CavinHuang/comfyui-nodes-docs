---
tags:
- Mask
- MaskGeneration
---

# Mask Like Image Size
## Documentation
- Class name: `JWMaskLikeImageSize`
- Category: `jamesWalker55`
- Output node: `False`

This node generates a mask of the same size as the input image, filled with a specified value. It's useful for creating uniform masks that match the dimensions of a given image.
## Input types
### Required
- **`image`**
    - The input image tensor whose dimensions are used to determine the size of the generated mask.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`value`**
    - A float value used to fill the generated mask, allowing for customization of the mask's intensity or transparency.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a mask tensor of the same size as the input image, filled with the specified value.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWImageLoadRGB", "Image Load RGB")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "path": ("STRING", {"default": "./image.png"}),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(self, path: str):
        assert isinstance(path, str)

        img = load_image(path)
        return (img,)

```
