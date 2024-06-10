# Unary Image Op
## Documentation
- Class name: `Unary Image Op`
- Category: `Masquerade Nodes`
- Output node: `False`

This node applies a specified unary operation on an image, such as inversion, averaging, rounding, clamping, or taking the absolute value. It's designed to manipulate the pixel values of an image according to the chosen operation, enabling various image preprocessing tasks.
## Input types
### Required
- **`image`**
    - The image to be processed. It serves as the primary input for the operation, determining the visual content that will undergo the specified unary transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`op`**
    - Specifies the unary operation to apply to the image. Options include 'invert', 'average', 'round', 'clamp', and 'abs', each affecting the image's pixel values in a unique way.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image, after applying the specified unary operation. It reflects the visual changes made to the original image based on the operation performed.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UnaryImageOp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "op": (["invert", "average", "round", "clamp", "abs"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "op_image"

    CATEGORY = "Masquerade Nodes"

    def op_image(self, image, op):
        image = tensor2rgb(image)
        if op == "invert":
            return (1. - image,)
        elif op == "average":
            mean = torch.mean(torch.mean(image,dim=2),dim=1)
            return (mean.unsqueeze(1).unsqueeze(2).repeat(1, image.shape[1], image.shape[2], 1),)
        elif op == "round":
            return (torch.round(image),)
        elif op == "clamp":
            return (torch.min(torch.max(image, torch.tensor(0.)), torch.tensor(1.)),)
        elif op == "abs":
            return (torch.abs(image),)

```
