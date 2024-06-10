---
tags:
- VisualEffects
---

# ImageEffectsGrayscale
## Documentation
- Class name: `ImageEffectsGrayscale`
- Category: `image/effects`
- Output node: `False`

This node applies a grayscale effect to a batch of images, converting each image in the batch to grayscale by averaging the color channels.
## Input types
### Required
- **`images`**
    - The batch of images to be converted to grayscale. This input is crucial for the grayscale conversion process, affecting the node's execution by determining the images that will undergo the transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The batch of images after the grayscale effect has been applied, with each image converted to grayscale.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsGrayscale:
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
        def apply(image):
            tensor = image.clone().detach()
            grayscale_tensor = torch.mean(tensor, dim=2, keepdim=True)

            return torch.cat([grayscale_tensor] * 3, dim=2)

        return (torch.stack([
            apply(images[i]) for i in range(len(images))
        ]),)

```
