---
tags:
- Counting
---

# Change Channel Count
## Documentation
- Class name: `Change Channel Count`
- Category: `Masquerade Nodes`
- Output node: `False`

The Change Channel Count node is designed to modify the number of channels in an image tensor. It supports changing an image to a mask, RGB, or RGBA format, depending on the specified kind. This functionality is crucial for image processing tasks where the channel count of an image needs to be adjusted for compatibility with different models or outputs.
## Input types
### Required
- **`image`**
    - The image tensor whose channel count is to be changed. This parameter is essential for determining the structure and content of the output image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`kind`**
    - Specifies the desired output format of the image, which can be a mask, RGB, or RGBA. This choice directly influences the transformation applied to the input image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed image tensor with the specified number of channels.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ChangeChannelCount:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "kind": (["mask", "RGB", "RGBA"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "change_channels"

    CATEGORY = "Masquerade Nodes"

    def change_channels(self, image, kind):
        image_size = image.size()

        if kind == "mask":
            return (tensor2mask(image),)
        elif kind == "RGBA":
            return (tensor2rgba(image),)
        else: # RGB
            return (tensor2rgb(image),)

```
