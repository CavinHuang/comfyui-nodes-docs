---
tags:
- Blur
- VisualEffects
---

# Blur Masked Area
## Documentation
- Class name: `INPAINT_MaskedBlur`
- Category: `inpaint`
- Output node: `False`

The `MaskedBlur` node applies a blurring effect to an image specifically within areas defined by a mask, optionally adjusting the blur intensity and falloff to create a smooth transition between blurred and unblurred regions. This functionality is particularly useful in inpainting tasks where blending the edited areas seamlessly with the original image enhances the visual outcome.
## Input types
### Required
- **`image`**
    - The `image` parameter represents the image to be processed, serving as the primary canvas for the blurring effect.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Tensor`
- **`mask`**
    - The `mask` parameter specifies the areas within the image to be blurred, effectively controlling the spatial application of the blur effect.
    - Comfy dtype: `MASK`
    - Python dtype: `Tensor`
- **`blur`**
    - The `blur` parameter determines the intensity of the blur effect, with higher values resulting in a more pronounced blurring.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`falloff`**
    - The `falloff` parameter adjusts the transition between blurred and unblurred areas, enabling a smoother or more abrupt change depending on the value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns the modified image with the specified areas blurred according to the mask and blur settings.
    - Python dtype: `Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskedBlur:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "mask": ("MASK",),
                "blur": ("INT", {"default": 255, "min": 3, "max": 8191, "step": 1}),
                "falloff": ("INT", {"default": 0, "min": 0, "max": 8191, "step": 1}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "inpaint"
    FUNCTION = "fill"

    def fill(self, image: Tensor, mask: Tensor, blur: int, falloff: int):
        blur = make_odd(blur)
        falloff = min(make_odd(falloff), blur - 2)
        image, mask = to_torch(image, mask)

        original = image.clone()
        alpha = mask.floor()
        if falloff > 0:
            erosion = binary_erosion(alpha, falloff)
            alpha = alpha * gaussian_blur(erosion, falloff)
        alpha = alpha.repeat(1, 3, 1, 1)

        image = gaussian_blur(image, blur)
        image = original + (image - original) * alpha
        return (to_comfy(image),)

```
