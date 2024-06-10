---
tags:
- Image
- ImageTransformation
---

# ImageTransformRotate
## Documentation
- Class name: `ImageTransformRotate`
- Category: `image/transform`
- Output node: `False`

The ImageTransformRotate node is designed to rotate a batch of images by a specified angle. It supports optional image expansion to accommodate the rotated image fully and employs supersampling anti-aliasing (SSAA) for higher quality results. The node can handle various rotation methods, providing flexibility in image transformation tasks.
## Input types
### Required
- **`images`**
    - The batch of images to be rotated. This parameter is crucial as it specifies the input images that will undergo rotation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`angle`**
    - The angle by which the images will be rotated. This parameter determines the degree of rotation applied to each image in the batch.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`expand`**
    - A boolean flag indicating whether the images should be expanded to fit the rotated image without clipping.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`SSAA`**
    - Indicates the level of supersampling anti-aliasing applied to the images to improve the quality of the rotation. Higher SSAA values result in smoother edges and reduced aliasing, enhancing the visual quality of the rotated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - Specifies the method used for rotating the images, allowing for different approaches to image rotation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The rotated images, returned as a batch. This output reflects the transformed images after applying the specified rotation and any additional processing steps.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformRotate:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "angle": ("FLOAT", {
                    "default": 35.0,
                    "max": 360.0,
                    "step": 0.1
                }),
                "expand": (["true", "false"],),
                "SSAA": ("INT", {
                    "default": 4,
                    "min": 1,
                    "max": 16,
                    "step": 1
                }),
                "method": (["lanczos", "bicubic", "hamming", "bilinear", "box", "nearest"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, angle, expand, SSAA, method):
        height, width = images[0, :, :, 0].shape

        def rotate_tensor(tensor):
            if method == "lanczos":
                resize_sampler = Image.LANCZOS
                rotate_sampler = Image.BICUBIC
            elif method == "bicubic":
                resize_sampler = Image.BICUBIC
                rotate_sampler = Image.BICUBIC
            elif method == "hamming":
                resize_sampler = Image.HAMMING
                rotate_sampler = Image.BILINEAR
            elif method == "bilinear":
                resize_sampler = Image.BILINEAR
                rotate_sampler = Image.BILINEAR
            elif method == "box":
                resize_sampler = Image.BOX
                rotate_sampler = Image.NEAREST
            elif method == "nearest":
                resize_sampler = Image.NEAREST
                rotate_sampler = Image.NEAREST
            else:
                raise ValueError()

            if SSAA > 1:
                img = tensor.tensor_to_image()
                img_us_scaled = img.resize((width * SSAA, height * SSAA), resize_sampler)
                img_rotated = img_us_scaled.rotate(angle, rotate_sampler, expand == "true", fillcolor=(0, 0, 0, 0))
                img_down_scaled = img_rotated.resize((img_rotated.width // SSAA, img_rotated.height // SSAA), resize_sampler)
                result = img_down_scaled.image_to_tensor()
            else:
                img = tensor.tensor_to_image()
                img_rotated = img.rotate(angle, rotate_sampler, expand == "true", fillcolor=(0, 0, 0, 0))
                result = img_rotated.image_to_tensor()

            return result

        if angle == 0.0 or angle == 360.0:
            return (images,)
        else:
            return (torch.stack([
                rotate_tensor(images[i]) for i in range(len(images))
            ]),)

```
