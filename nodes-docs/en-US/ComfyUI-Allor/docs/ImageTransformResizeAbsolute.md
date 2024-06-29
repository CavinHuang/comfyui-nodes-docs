---
tags:
- ImageResize
- ImageScaling
- ImageSize
- ImageTransformation
---

# ImageTransformResizeAbsolute
## Documentation
- Class name: `ImageTransformResizeAbsolute`
- Category: `image/transform`
- Output node: `False`

This node provides functionality for resizing a batch of images to specified absolute dimensions using various interpolation methods. It allows for precise control over the output size of images, making it suitable for tasks that require uniform image dimensions.
## Input types
### Required
- **`images`**
    - A batch of images to be resized. This parameter is crucial as it directly influences the node's operation by providing the raw data for resizing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`width`**
    - The target width for the resized images. It determines the horizontal dimension of the output images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The target height for the resized images. It determines the vertical dimension of the output images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - The interpolation method used for resizing. This affects the quality and characteristics of the resized images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resized images as a batch. This output is the direct result of the resizing operation, providing uniformly sized images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformResizeAbsolute:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "width": ("INT", {
                    "default": 256,
                    "min": 1,
                    "step": 1
                }),
                "height": ("INT", {
                    "default": 256,
                    "min": 1,
                    "step": 1
                }),
                "method": (["lanczos", "bicubic", "hamming", "bilinear", "box", "nearest"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, width, height, method):
        def resize_tensor(tensor):
            return tensor.tensor_to_image().resize((width, height), get_sampler_by_name(method)).image_to_tensor()

        return (torch.stack([
            resize_tensor(images[i]) for i in range(len(images))
        ]),)

```
