---
tags:
- Image
- ImageBlend
- ImageComposite
---

# Mix Color By Mask
## Documentation
- Class name: `Mix Color By Mask`
- Category: `Masquerade Nodes`
- Output node: `False`

The Mix Color By Mask node blends a specified color into an image based on a provided mask, allowing for selective colorization or recoloring of parts of the image.
## Input types
### Required
- **`image`**
    - The original image to be processed. The mask determines which parts of this image will be blended with the specified color.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`r`**
    - The red component of the color to blend into the image, scaled from 0 to 255. It influences the final color's red intensity in the masked areas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`g`**
    - The green component of the color to blend into the image, scaled from 0 to 255. It affects the final color's green intensity in the masked areas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - The blue component of the color to blend into the image, scaled from 0 to 255. It impacts the final color's blue intensity in the masked areas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mask`**
    - The mask used to determine where the specified color should be blended into the original image. Areas of the mask with higher values will have more of the color applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after blending the specified color into the original image based on the mask.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MixColorByMask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "r": ("INT", {"default": 0, "min": 0, "max": 255, "step": 1}),
                "g": ("INT", {"default": 0, "min": 0, "max": 255, "step": 1}),
                "b": ("INT", {"default": 0, "min": 0, "max": 255, "step": 1}),
                "mask": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "mix"

    CATEGORY = "Masquerade Nodes"

    def mix(self, image, r, g, b, mask):
        r, g, b = r / 255., g / 255., b / 255.
        image_size = image.size()
        image2 = torch.tensor([r, g, b]).to(device=image.device).unsqueeze(0).unsqueeze(0).unsqueeze(0).repeat(image_size[0], image_size[1], image_size[2], 1)
        image, image2 = tensors2common(image, image2)
        mask = tensor2batch(tensor2mask(mask), image.size())
        return (image * (1. - mask) + image2 * mask,)

```
