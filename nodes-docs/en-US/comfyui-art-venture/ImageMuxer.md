---
tags:
- Image
---

# Image Muxer
## Documentation
- Class name: `ImageMuxer`
- Category: `Art Venture/Utils`
- Output node: `False`

The ImageMuxer node is designed to select and output one image from a set of up to four input images based on a given selector index. This functionality is essential for scenarios where dynamic image selection is required, such as in image processing pipelines or conditional image rendering tasks.
## Input types
### Required
- **`image_i`**
    - Represents one of the up to four image inputs for selection, acting as potential outputs based on the selector index. This generalization covers all image inputs, allowing for dynamic selection from multiple sources.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`input_selector`**
    - An integer index that determines which of the input images is selected for output. This selector drives the dynamic selection process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The selected image based on the input selector index. This output facilitates dynamic image selection in various applications.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilImageMuxer:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image_1": ("IMAGE",),
                "image_2": ("IMAGE",),
                "input_selector": ("INT", {"default": 0}),
            },
            "optional": {"image_3": ("IMAGE",), "image_4": ("IMAGE",)},
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "image_muxer"

    def image_muxer(self, image_1, image_2, input_selector, image_3=None, image_4=None):
        images = [image_1, image_2, image_3, image_4]
        return (images[input_selector],)

```
