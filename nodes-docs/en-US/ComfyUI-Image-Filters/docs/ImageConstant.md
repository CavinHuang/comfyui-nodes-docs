---
tags:
- Image
- ImageGeneration
---

# Image Constant Color (RGB)
## Documentation
- Class name: `ImageConstant`
- Category: `image/filters`
- Output node: `False`

The ImageConstant node is designed to generate images of a constant color. It allows for the specification of the color in RGB format, along with the image dimensions and batch size, enabling the creation of multiple images with the same color specifications in a single operation.
## Input types
### Required
- **`width`**
    - Specifies the width of the generated images. It influences the horizontal dimension of the output images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the generated images, affecting their vertical dimension.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - Indicates the number of images to generate in one batch, allowing for multiple images to be created at once.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`red`**
    - Sets the red component of the constant color for the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`green`**
    - Defines the green component of the constant color for the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`blue`**
    - Specifies the blue component of the constant color for the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image or a batch of images with the specified constant color in RGB format.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageConstant:
    def __init__(self, device="cpu"):
        self.device = device

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "width": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                              "height": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096}),
                              "red": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                              "green": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                              "blue": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                              }}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "generate"

    CATEGORY = "image/filters"

    def generate(self, width, height, batch_size, red, green, blue):
        r = torch.full([batch_size, height, width, 1], red)
        g = torch.full([batch_size, height, width, 1], green)
        b = torch.full([batch_size, height, width, 1], blue)
        return (torch.cat((r, g, b), dim=-1), )

```
