---
tags:
- Mask
- MaskGeneration
---

# Create Rect Mask
## Documentation
- Class name: `Create Rect Mask`
- Category: `Masquerade Nodes`
- Output node: `False`

The Create Rect Mask node is designed to generate rectangular masks based on specified dimensions and origin points. It supports creating masks in either percentage or pixel modes, allowing for flexible mask creation relative to the image size. This node can also adapt the mask size automatically if a reference image is provided, ensuring the mask aligns perfectly with the image dimensions.
## Input types
### Required
- **`mode`**
    - Specifies the mode of dimension calculation for the mask, either as a percentage of the image size or in absolute pixels, affecting how the mask's dimensions are interpreted.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`origin`**
    - Determines the starting point of the mask within the image, which can be any of the four corners, influencing the mask's position.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`x`**
    - The x-coordinate of the mask's origin, which sets the horizontal starting point of the mask.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y`**
    - The y-coordinate of the mask's origin, which sets the vertical starting point of the mask.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`width`**
    - The width of the mask, which can be defined in pixels or as a percentage of the image width, depending on the mode.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`height`**
    - The height of the mask, which can be defined in pixels or as a percentage of the image height, depending on the mode.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`image_width`**
    - The width of the image to which the mask will be applied. This parameter is ignored if copy_image_size is provided.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_height`**
    - The height of the image to which the mask will be applied. This parameter is ignored if copy_image_size is provided.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`copy_image_size`**
    - An optional image parameter. If provided, the mask dimensions will be automatically adjusted to match the size of this reference image, overriding the image_width and image_height parameters.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Outputs a rectangular mask as a tensor, with dimensions and position based on the input parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CreateRectMask:
    """
    Creates a rectangle mask. If copy_image_size is provided, the image_width and image_height parameters are ignored and the size of the given images will be used instead.
    """
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mode": (["percent", "pixels"],),
                "origin": (["topleft", "bottomleft", "topright", "bottomright"],),
                "x": ("FLOAT", {"default": 0, "min": 0, "max": VERY_BIG_SIZE, "step": 1}),
                "y": ("FLOAT", {"default": 0, "min": 0, "max": VERY_BIG_SIZE, "step": 1}),
                "width": ("FLOAT", {"default": 50, "min": 0, "max": VERY_BIG_SIZE, "step": 1}),
                "height": ("FLOAT", {"default": 50, "min": 0, "max": VERY_BIG_SIZE, "step": 1}),
                "image_width": ("INT", {"default": 512, "min": 64, "max": VERY_BIG_SIZE, "step": 64}),
                "image_height": ("INT", {"default": 512, "min": 64, "max": VERY_BIG_SIZE, "step": 64}),
            },
            "optional": {
                "copy_image_size": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "create_mask"

    CATEGORY = "Masquerade Nodes"

    def create_mask(self, mode, origin, x, y, width, height, image_width, image_height, copy_image_size = None):
        min_x = x
        min_y = y

        max_x = min_x + width
        max_y = min_y + height
        if copy_image_size is not None:
            size = copy_image_size.size()
            image_width = size[2]
            image_height = size[1]
        if mode == "percent":
            min_x = min_x / 100.0 * image_width
            max_x = max_x / 100.0 * image_width
            min_y = min_y / 100.0 * image_height
            max_y = max_y / 100.0 * image_height

        if origin == "bottomleft" or origin == "bottomright":
            min_y, max_y = image_height - max_y, image_height - min_y
        if origin == "topright" or origin == "bottomright":
            min_x, max_x = image_width - max_x, image_width - min_x
            
        mask = torch.zeros((image_height, image_width))
        mask[int(min_y):int(max_y)+1, int(min_x):int(max_x)+1] = 1
        return (mask.unsqueeze(0),)

```
