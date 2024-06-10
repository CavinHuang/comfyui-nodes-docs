---
tags:
- Mask
---

# Combine Masks
## Documentation
- Class name: `Combine Masks`
- Category: `Masquerade Nodes`
- Output node: `False`

The Combine Masks node is designed to perform various operations on two input masks, such as union, intersection, difference, and others, to produce a single output mask. It allows for flexible manipulation of masks, enabling the creation of complex mask shapes and patterns by combining simpler ones.
## Input types
### Required
- **`image1`**
    - The first input mask for the operation. It plays a crucial role in determining the base of the operation, such as the starting point for union, intersection, or difference calculations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image2`**
    - The second input mask that is combined with the first mask according to the specified operation. It contributes to the final shape and content of the output mask.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`op`**
    - Specifies the type of operation to perform on the input masks, such as union, intersection, difference, etc. This determines how the masks are combined to produce the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clamp_result`**
    - Determines whether the resulting mask values should be clamped between 0 and 1, ensuring valid mask values.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`round_result`**
    - Indicates whether the values in the resulting mask should be rounded to the nearest integer, potentially simplifying the mask.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting mask after applying the specified operation on the input masks. It represents the combined effect of the inputs according to the operation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskCombineOp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image1": ("IMAGE",),
                "image2": ("IMAGE",),
                "op": (["union (max)", "intersection (min)", "difference", "multiply", "multiply_alpha", "add", "greater_or_equal", "greater"],),
                "clamp_result": (["yes", "no"],),
                "round_result": (["no", "yes"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "combine"

    CATEGORY = "Masquerade Nodes"

    def combine(self, image1, image2, op, clamp_result, round_result):
        image1, image2 = tensors2common(image1, image2)

        if op == "union (max)":
            result = torch.max(image1, image2)
        elif op == "intersection (min)":
            result = torch.min(image1, image2)
        elif op == "difference":
            result = image1 - image2
        elif op == "multiply":
            result = image1 * image2
        elif op == "multiply_alpha":
            image1 = tensor2rgba(image1)
            image2 = tensor2mask(image2)
            result = torch.cat((image1[:, :, :, :3], (image1[:, :, :, 3] * image2).unsqueeze(3)), dim=3)
        elif op == "add":
            result = image1 + image2
        elif op == "greater_or_equal":
            result = torch.where(image1 >= image2, 1., 0.)
        elif op == "greater":
            result = torch.where(image1 > image2, 1., 0.)

        if clamp_result == "yes":
            result = torch.min(torch.max(result, torch.tensor(0.)), torch.tensor(1.))
        if round_result == "yes":
            result = torch.round(result)

        return (result,)

```
