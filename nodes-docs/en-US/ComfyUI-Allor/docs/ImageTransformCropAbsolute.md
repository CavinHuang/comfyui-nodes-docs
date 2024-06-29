---
tags:
- Crop
- Image
- ImageTransformation
---

# ImageTransformCropAbsolute
## Documentation
- Class name: `ImageTransformCropAbsolute`
- Category: `image/transform`
- Output node: `False`

This node performs an absolute crop operation on a batch of images, cutting them to a specified rectangular size based on absolute pixel coordinates. It is designed to precisely adjust the dimensions of images by removing unwanted outer portions to focus on a specific area.
## Input types
### Required
- **`images`**
    - The batch of images to be cropped. This parameter is crucial as it directly influences the output by determining which images undergo the cropping process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`start_x`**
    - The starting x-coordinate (inclusive) for the crop, defining the left boundary of the cropping rectangle. It determines how much of the left part of the images is removed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_y`**
    - The starting y-coordinate (inclusive) for the crop, defining the top boundary of the cropping rectangle. It affects the top portion of the images to be cropped out.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_x`**
    - The ending x-coordinate (exclusive) for the crop, defining the right boundary of the cropping rectangle. It specifies the width of the resulting images after cropping.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_y`**
    - The ending y-coordinate (exclusive) for the crop, defining the bottom boundary of the cropping rectangle. It specifies the height of the resulting images after cropping.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The cropped images, adjusted to the specified dimensions by removing parts outside the defined rectangular area.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformCropAbsolute:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "start_x": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "start_y": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "end_x": ("INT", {
                    "default": 128,
                    "step": 1
                }),
                "end_y": ("INT", {
                    "default": 128,
                    "step": 1
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, start_x, start_y, end_x, end_y):
        def resize_tensor(tensor):
            return tensor.tensor_to_image().crop([start_x, start_y, end_x, end_y]).image_to_tensor()

        return (torch.stack([
            resize_tensor(images[i]) for i in range(len(images))
        ]),)

```
