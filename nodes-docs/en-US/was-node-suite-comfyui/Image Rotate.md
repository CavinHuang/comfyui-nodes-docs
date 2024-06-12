---
tags:
- Image
- ImageTransformation
---

# Image Rotate
## Documentation
- Class name: `Image Rotate`
- Category: `WAS Suite/Image/Transform`
- Output node: `False`

The Image Rotate node is designed to rotate a batch of images to a specified angle, with options for different rotation modes and sampling methods. It ensures that rotations are constrained within a 360-degree range and supports adjustments to the rotation angle for more precise control. This node caters to both internal and external rotation modes, offering flexibility in how images are transformed.
## Input types
### Required
- **`images`**
    - A batch of images to be rotated. This parameter is crucial as it provides the raw visual data that the node will process and transform according to the specified rotation parameters.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`mode`**
    - Specifies the rotation mode, either 'internal' for direct rotation or an alternative mode that involves transposing the image. This affects how the image is rotated and transformed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rotation`**
    - The angle in degrees to rotate the images. This parameter directly influences the final orientation of the processed images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sampler`**
    - Defines the sampling method used during rotation, such as 'nearest', 'bicubic', or 'bilinear'. This affects the quality and appearance of the rotated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The batch of rotated images, returned as a tensor. This output represents the transformed visual data after applying the specified rotation and sampling methods.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Rotate:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "mode": (["transpose", "internal",],),
                "rotation": ("INT", {"default": 0, "min": 0, "max": 360, "step": 90}),
                "sampler": (["nearest", "bilinear", "bicubic"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "image_rotate"

    CATEGORY = "WAS Suite/Image/Transform"

    def image_rotate(self, images, mode, rotation, sampler):

        batch_tensor = []
        for image in images:
            # PIL Image
            image = tensor2pil(image)

            # Check rotation
            if rotation > 360:
                rotation = int(360)
            if (rotation % 90 != 0):
                rotation = int((rotation//90)*90)

            # Set Sampler
            if sampler:
                if sampler == 'nearest':
                    sampler = Image.NEAREST
                elif sampler == 'bicubic':
                    sampler = Image.BICUBIC
                elif sampler == 'bilinear':
                    sampler = Image.BILINEAR
                else:
                    sampler == Image.BILINEAR

            # Rotate Image
            if mode == 'internal':
                image = image.rotate(rotation, sampler)
            else:
                rot = int(rotation / 90)
                for _ in range(rot):
                    image = image.transpose(2)

            batch_tensor.append(pil2tensor(image))

        batch_tensor = torch.cat(batch_tensor, dim=0)

        return (batch_tensor, )

```
