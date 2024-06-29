# Unary Mask Op
## Documentation
- Class name: `Unary Mask Op`
- Category: `Masquerade Nodes`
- Output node: `False`

The Unary Mask Op node applies a specified unary operation to a given mask image, transforming it according to the operation chosen. This node supports operations such as inverting, averaging, rounding, clamping, and taking the absolute value of the mask, enabling various forms of mask manipulation.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the mask image to be transformed. It is crucial for determining the base data on which the unary operation will be applied, directly influencing the outcome of the transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`op`**
    - The 'op' parameter specifies the unary operation to apply to the mask image, such as invert, average, round, clamp, or abs. This choice dictates the nature of the transformation performed on the mask.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed mask image, resulting from the application of the specified unary operation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UnaryMaskOp:
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
    FUNCTION = "op_mask"

    CATEGORY = "Masquerade Nodes"

    def op_mask(self, image, op):
        image = tensor2mask(image)
        if op == "invert":
            return (1. - image,)
        elif op == "average":
            mean = torch.mean(torch.mean(image,dim=2),dim=1)
            return (mean.unsqueeze(1).unsqueeze(2).repeat(1, image.shape[1], image.shape[2]),)
        elif op == "round":
            return (torch.round(image),)
        elif op == "clamp":
            return (torch.min(torch.max(image, torch.tensor(0.)), torch.tensor(1.)),)
        elif op == "abs":
            return (torch.abs(image),)

```
