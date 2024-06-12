---
tags:
- VisualEffects
---

# ImageEffectsNegative
## Documentation
- Class name: `ImageEffectsNegative`
- Category: `image/effects`
- Output node: `False`

The ImageEffectsNegative node transforms images into their negative form by inverting the colors. This effect is achieved by subtracting each color channel value from the maximum possible value, effectively reversing the color spectrum and creating a photographic negative effect.
## Input types
### Required
- **`images`**
    - The input images to be transformed into their negative form. This parameter is crucial for the node's operation as it directly affects the visual outcome of the effect.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed images in their negative form, with each color channel value inverted to produce a photographic negative effect.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsNegative:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/effects"

    def node(self, images):
        tensor = images.clone().detach()
        tensor[:, :, :, 0:3] = 1.0 - tensor[:, :, :, 0:3]

        return (tensor,)

```
