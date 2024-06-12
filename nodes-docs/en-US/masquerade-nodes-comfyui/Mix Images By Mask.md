---
tags:
- Image
- ImageBlend
- ImageComposite
---

# Mix Images By Mask
## Documentation
- Class name: `Mix Images By Mask`
- Category: `Masquerade Nodes`
- Output node: `False`

The Mix Images By Mask node blends two images together based on a provided mask, creating a composite image where parts of each input image are visible according to the mask's values. This node is essential for tasks that require the dynamic combination of images, such as creating effects or merging images in a context-sensitive manner.
## Input types
### Required
- **`image1`**
    - The first image to be mixed. It serves as one of the base layers for the blending operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image2`**
    - The second image to be mixed. It acts as the other base layer in the blending process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - A mask that determines how the two images are blended together. Areas of the mask with higher values allow more of the second image to show through.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after blending the two input images according to the mask.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [SaveImage](../../Comfy/Nodes/SaveImage.md)
    - Mute / Bypass Repeater (rgthree)



## Source code
```python
class MixByMask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image1": ("IMAGE",),
                "image2": ("IMAGE",),
                "mask": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "mix"

    CATEGORY = "Masquerade Nodes"

    def mix(self, image1, image2, mask):
        image1, image2 = tensors2common(image1, image2)
        mask = tensor2batch(mask, image1.size())
        return (image1 * (1. - mask) + image2 * mask,)

```
