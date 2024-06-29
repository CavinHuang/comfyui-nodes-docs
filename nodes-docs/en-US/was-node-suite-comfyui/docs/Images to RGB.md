---
tags:
- Image
---

# Images to RGB
## Documentation
- Class name: `Images to RGB`
- Category: `WAS Suite/Image`
- Output node: `False`

This node is designed to convert a collection of images to the RGB color space, ensuring consistency in color representation across multiple images. It caters to scenarios where images may come in various color formats, standardizing them to RGB for uniform processing or display.
## Input types
### Required
- **`images`**
    - The collection of images to be converted to the RGB color space. This input is crucial for ensuring that all images undergo a consistent color space transformation, facilitating uniform color representation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed images, now standardized in the RGB color space, ready for further processing or display.
    - Python dtype: `List[Image]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Images_To_RGB:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_to_rgb"

    CATEGORY = "WAS Suite/Image"

    def image_to_rgb(self, images):

        if len(images) > 1:
            tensors = []
            for image in images:
                tensors.append(pil2tensor(tensor2pil(image).convert('RGB')))
            tensors = torch.cat(tensors, dim=0)
            return (tensors, )
        else:
            return (pil2tensor(tensor2pil(images).convert("RGB")), )

```
