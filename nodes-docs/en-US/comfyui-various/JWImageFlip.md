---
tags:
- Flip
- Image
- ImageTransformation
---

# Image Flip
## Documentation
- Class name: `JWImageFlip`
- Category: `jamesWalker55`
- Output node: `False`

The JWImageFlip node is designed to flip images either horizontally or vertically based on the specified direction. This operation is fundamental in image processing tasks where orientation adjustments are necessary.
## Input types
### Required
- **`image`**
    - The image tensor to be flipped. This parameter is crucial as it directly influences the output by determining which image is subjected to the flipping operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`direction`**
    - Specifies the direction of the flip, either 'horizontal' or 'vertical'. This parameter dictates how the image will be manipulated, affecting the final orientation of the output image.
    - Comfy dtype: `['horizontal', 'vertical']`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The flipped image tensor. This output is the direct result of applying the specified flip operation on the input image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
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
