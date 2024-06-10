# ImagePass
## Documentation
- Class name: `ImagePass`
- Category: `KJNodes/misc`
- Output node: `False`

The ImagePass node serves as a straightforward conduit for image data, allowing images to be passed through without modification. This node is essential for workflows that require the preservation of image integrity across various processing stages.
## Input types
### Required
- **`image`**
    - The 'image' input type accepts an image to be passed through the node without any modifications, ensuring the original image data is preserved.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is the unaltered image that was input, ensuring no modifications are made to the original image data.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImagePass:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
            },
        }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "passthrough"
    CATEGORY = "KJNodes/misc"
    DESCRIPTION = """
Passes the image through without modifying it.
"""

    def passthrough(self, image):
        return image,

```
