---
tags:
- AlphaChannel
- Image
---

# AddAlpha
## Documentation
- Class name: `AddAlpha`
- Category: `Bmad/image`
- Output node: `False`

The `AddAlpha` node is designed to add an alpha channel to RGB images, allowing for the manipulation of image transparency. It supports different methods for alpha channel creation, including direct specification or inversion, providing flexibility in handling image transparency.
## Input types
### Required
- **`rgb_image`**
    - The RGB image to which an alpha channel will be added. This is the base image that will be modified to include transparency information.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`alpha`**
    - An optional alpha channel to be added to the RGB image. If provided, it specifies the transparency levels for the image. The method parameter determines how this alpha channel is applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`method`**
    - Determines how the alpha channel is applied to the RGB image. It can either use the alpha channel as provided ('default') or invert it, offering flexibility in transparency manipulation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image with an alpha channel added, enabling transparency manipulation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AddAlpha:
    method = ["default", "invert"]

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "rgb_image": ("IMAGE",),
            },
            "optional": {
                "alpha": ("IMAGE",),
                "method": (s.method, {"default": s.method[0]}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "add_alpha"
    CATEGORY = "Bmad/image"

    def add_alpha(self, rgb_image, alpha=None, method=None):
        rgb_image = tensor2opencv(rgb_image, 3)
        rgba = cv.cvtColor(rgb_image, cv.COLOR_RGB2RGBA)
        if alpha is not None:
            alpha = tensor2opencv(alpha, 1)
            rgba[:, :, 3] = alpha if method == self.method[0] else 255 - alpha
        rgba = opencv2tensor(rgba)
        return (rgba,)

```
