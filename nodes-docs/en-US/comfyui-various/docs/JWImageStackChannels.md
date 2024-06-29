---
tags:
- Image
- ImageTransformation
---

# Image Stack Channels
## Documentation
- Class name: `JWImageStackChannels`
- Category: `jamesWalker55`
- Output node: `False`

This node is designed to stack two image tensors along their channel dimension, effectively combining them into a single tensor that retains the information from both input images.
## Input types
### Required
- **`image_a`**
    - The first image tensor to be stacked. It plays a crucial role in the stacking operation as it is combined with the second image tensor to form a single output tensor.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_b`**
    - The second image tensor to be stacked alongside the first. Its combination with the first image tensor results in a new tensor that encapsulates the data from both images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a single image tensor that results from stacking the two input image tensors along their channel dimension.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWImageStackChannels", "Image Stack Channels")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "image_a": ("IMAGE",),
            "image_b": ("IMAGE",),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(self, image_a: torch.Tensor, image_b: torch.Tensor):
        assert isinstance(image_a, torch.Tensor)
        assert isinstance(image_b, torch.Tensor)

        stacked = torch.cat((image_a, image_b), dim=3)

        return (stacked,)

```
