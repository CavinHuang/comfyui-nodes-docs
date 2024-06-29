---
tags:
- ImageEnhancement
- ImageTransformation
- VisualEffects
---

# Image Levels
## Documentation
- Class name: `JWImageLevels`
- Category: `jamesWalker55`
- Output node: `False`

The JWImageLevels node adjusts the intensity levels of an image within a specified range, enhancing the visual contrast or correcting the exposure. It linearly rescales the image's colors between given minimum and maximum values, clipping any out-of-range values.
## Input types
### Required
- **`image`**
    - The input image tensor to be adjusted. This tensor undergoes a linear transformation based on the specified minimum and maximum values, affecting its overall brightness and contrast.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`min`**
    - The lower bound of the intensity range. Pixels with intensities below this value will be set to the minimum (black), effectively darkening the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max`**
    - The upper bound of the intensity range. Pixels with intensities above this value will be set to the maximum (white), effectively brightening the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image tensor with adjusted intensity levels, where the pixel values are rescaled to fit within the new specified range.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWImageMix", "Image Mix")
class _:
    CATEGORY = "jamesWalker55"
    BLEND_TYPES = ("mix", "multiply")

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "blend_type": (cls.BLEND_TYPES, {"default": "mix"}),
                "factor": ("FLOAT", {"min": 0, "max": 1, "step": 0.01, "default": 0.5}),
                "image_a": ("IMAGE",),
                "image_b": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(
        self,
        blend_type: str,
        factor: float,
        image_a: torch.Tensor,
        image_b: torch.Tensor,
    ):
        assert blend_type in self.BLEND_TYPES
        assert isinstance(factor, float)
        assert isinstance(image_a, torch.Tensor)
        assert isinstance(image_b, torch.Tensor)

        assert image_a.shape == image_b.shape

        if blend_type == "mix":
            mixed = image_a * (1 - factor) + image_b * factor
        elif blend_type == "multiply":
            mixed = image_a * (1 - factor + image_b * factor)
        else:
            raise NotImplementedError(f"Blend type not yet implemented: {blend_type}")

        return (mixed,)

```
