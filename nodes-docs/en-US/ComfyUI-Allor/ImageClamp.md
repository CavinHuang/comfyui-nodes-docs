---
tags:
- DataClamp
---

# ImageClamp
## Documentation
- Class name: `ImageClamp`
- Category: `clamp`
- Output node: `False`

The ImageClamp node is designed to pass through image data without modification, acting as a placeholder or a checkpoint within a data processing pipeline. It ensures that image data conforms to expected formats or standards without altering the content.
## Input types
### Required
- **`image`**
    - The 'image' input type represents the image data that will be passed through the node unaltered. It serves as a mechanism to ensure the data conforms to expected formats or standards within the pipeline.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is the unmodified image data, ensuring it conforms to expected formats or standards within the data processing pipeline.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, image):
        return (image,)

```
