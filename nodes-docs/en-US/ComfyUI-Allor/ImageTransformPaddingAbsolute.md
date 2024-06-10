---
tags:
- Image
- ImagePadding
- ImageTransformation
---

# ImageTransformPaddingAbsolute
## Documentation
- Class name: `ImageTransformPaddingAbsolute`
- Category: `image/transform`
- Output node: `False`

This node applies absolute padding to a batch of images, allowing for the addition of a specified number of pixels to the height and width of each image. The padding method can be chosen from predefined options to control how the added space is filled.
## Input types
### Required
- **`images`**
    - The batch of images to which padding will be applied. This is the primary input for the transformation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`add_width`**
    - The number of pixels to add to the width of each image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`add_height`**
    - The number of pixels to add to the height of each image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - The method used to fill the added padding area, with options including 'reflect', 'edge', and 'constant'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The batch of images after padding has been applied, with increased dimensions according to the specified add_width and add_height.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformPaddingAbsolute:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "add_width": ("INT", {
                    "default": 64,
                    "min": 0,
                }),
                "add_height": ("INT", {
                    "default": 64,
                    "min": 0,
                }),
                "method": (["reflect", "edge", "constant"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, add_width, add_height, method):
        def transpose_tensor(image):
            tensor = image.clone().detach()
            tensor_pad = TF.pad(tensor.permute(2, 0, 1), [add_height, add_width], padding_mode=method).permute(1, 2, 0)

            return tensor_pad

        return (torch.stack([
            transpose_tensor(images[i]) for i in range(len(images))
        ]),)

```
