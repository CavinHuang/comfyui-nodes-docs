---
tags:
- VisualEffects
---

# ImageEffectsSepia
## Documentation
- Class name: `ImageEffectsSepia`
- Category: `image/effects`
- Output node: `False`

The ImageEffectsSepia node applies a sepia tone effect to images, transforming the color scheme to mimic the appearance of photographs taken in the late 19th and early 20th centuries. This effect is achieved by adjusting the RGB values of the input images to create a warm, brownish tone that evokes a sense of nostalgia and timelessness.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the input images to which the sepia effect will be applied. It is crucial for defining the visual content that will undergo the transformation, affecting the node's execution and the appearance of the output images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a modified version of the input images with a sepia tone applied, reflecting a nostalgic and timeless appearance.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsSepia:
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

        sepia_mask = torch.tensor([[0.393, 0.349, 0.272],
                                   [0.769, 0.686, 0.534],
                                   [0.189, 0.168, 0.131]])

        tensor[:, :, :, 0:3] = torch.stack([
            torch.matmul(tensor[i, :, :, 0:3], sepia_mask) for i in range(len(tensor))
        ])

        return (tensor,)

```
