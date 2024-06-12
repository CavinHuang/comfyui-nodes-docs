---
tags:
- Image
---

# CopyMakeBorder
## Documentation
- Class name: `CopyMakeBorder`
- Category: `Bmad/CV/Misc`
- Output node: `False`

The CopyMakeBorder node is designed to add a border around an image. It allows for the customization of the border's size and type, providing flexibility in adjusting the image's appearance.
## Input types
### Required
- **`image`**
    - The input image to which the border will be added. This parameter is crucial as it defines the base image that will be modified.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`border_size`**
    - Specifies the size of the border to be added around the image. It influences the thickness of the border, thereby affecting the overall dimensions of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_type`**
    - Determines the type of border to be applied. This parameter allows for various border styles, influencing the visual appearance of the border.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with the added border. This image will have increased dimensions due to the border addition.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CopyMakeBorderSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "border_size": ("INT", {"default": 64}),
                "border_type": (border_types_excluding_transparent, border_types[0])
            }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "make_border"
    CATEGORY = "Bmad/CV/Misc"

    def make_border(self, image, border_size, border_type):
        image = tensor2opencv(image, 0)
        image = cv.copyMakeBorder(image, border_size, border_size, border_size, border_size,
                                  border_types_map[border_type])
        image = opencv2tensor(image)
        return (image,)

```
