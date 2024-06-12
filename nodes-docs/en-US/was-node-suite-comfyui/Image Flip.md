---
tags:
- Flip
- Image
- ImageTransformation
---

# Image Flip
## Documentation
- Class name: `Image Flip`
- Category: `WAS Suite/Image/Transform`
- Output node: `False`

The Image Flip node provides functionality to flip images either horizontally or vertically, allowing for simple yet effective transformations of image data.
## Input types
### Required
- **`images`**
    - A batch of images to be flipped. This parameter is crucial for determining which images undergo the flipping process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`mode`**
    - Specifies the direction of the flip, either 'horizontal' or 'vertical'. This affects how the images are transformed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The batch of images after being flipped according to the specified mode.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Flip:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "mode": (["horizontal", "vertical",],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "image_flip"

    CATEGORY = "WAS Suite/Image/Transform"

    def image_flip(self, images, mode):

        batch_tensor = []
        for image in images:
            image = tensor2pil(image)
            if mode == 'horizontal':
                image = image.transpose(0)
            if mode == 'vertical':
                image = image.transpose(1)
            batch_tensor.append(pil2tensor(image))
        batch_tensor = torch.cat(batch_tensor, dim=0)

        return (batch_tensor, )

```
