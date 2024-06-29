---
tags:
- ImageResize
- ImageScaling
- ImageSize
- ImageTransformation
---

# Image Resize by Factor
## Documentation
- Class name: `JWImageResizeByFactor`
- Category: `jamesWalker55`
- Output node: `False`

This node resizes an image by a specified factor, allowing for flexible image scaling with various interpolation modes to maintain image quality.
## Input types
### Required
- **`image`**
    - The input image to be resized. This parameter is crucial as it provides the source image for the resizing operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`factor`**
    - Specifies the scaling factor for resizing the image. A factor greater than 1 enlarges the image, while a factor less than 1 shrinks it.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`interpolation_mode`**
    - Determines the method used for interpolating between pixel values during the resize operation, affecting the quality and appearance of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resized image, scaled by the specified factor and using the chosen interpolation mode.
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
