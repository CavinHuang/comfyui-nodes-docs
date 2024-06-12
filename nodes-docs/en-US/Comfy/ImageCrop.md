---
tags:
- Crop
- Image
- ImageTransformation
---

# ImageCrop
## Documentation
- Class name: `ImageCrop`
- Category: `image/transform`
- Output node: `False`

The ImageCrop node is designed for cropping images to a specified width and height starting from a given x and y coordinate. This functionality is essential for focusing on specific regions of an image or for adjusting the image size to meet certain requirements.
## Input types
### Required
- **`image`**
    - The input image to be cropped. This parameter is crucial as it defines the source image from which a region will be extracted based on the specified dimensions and coordinates.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`width`**
    - Specifies the width of the cropped image. This parameter determines how wide the resulting cropped image will be.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the cropped image. This parameter determines the height of the resulting cropped image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`x`**
    - The x-coordinate of the top-left corner of the cropping area. This parameter sets the starting point for the width dimension of the crop.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y`**
    - The y-coordinate of the top-left corner of the cropping area. This parameter sets the starting point for the height dimension of the crop.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The cropped image as a result of the cropping operation. This output is significant for further processing or analysis of the specified image region.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VAEEncodeForInpaint](../../Comfy/Nodes/VAEEncodeForInpaint.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)



## Source code
```python
class ImageCrop:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "image": ("IMAGE",),
                              "width": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                              "height": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                              "x": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
                              "y": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
                              }}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "crop"

    CATEGORY = "image/transform"

    def crop(self, image, width, height, x, y):
        x = min(x, image.shape[2] - 1)
        y = min(y, image.shape[1] - 1)
        to_x = width + x
        to_y = height + y
        img = image[:,y:to_y, x:to_x, :]
        return (img,)

```
