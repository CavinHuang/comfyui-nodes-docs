---
tags:
- Image
- ImageBlend
- ImageComposite
---

# MaskComposite
## Documentation
- Class name: `MaskComposite`
- Category: `mask`
- Output node: `False`

This node specializes in combining two mask inputs through a variety of operations such as addition, subtraction, and logical operations, to produce a new, modified mask. It abstractly handles the manipulation of mask data to achieve complex masking effects, serving as a crucial component in mask-based image editing and processing workflows.
## Input types
### Required
- **`destination`**
    - The primary mask that will be modified based on the operation with the source mask. It plays a central role in the composite operation, acting as the base for modifications.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`source`**
    - The secondary mask that will be used in conjunction with the destination mask to perform the specified operation, influencing the final output mask.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`x`**
    - The horizontal offset at which the source mask will be applied to the destination mask, affecting the positioning of the composite result.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y`**
    - The vertical offset at which the source mask will be applied to the destination mask, affecting the positioning of the composite result.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`operation`**
    - Specifies the type of operation to apply between the destination and source masks, such as 'add', 'subtract', or logical operations, determining the nature of the composite effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The resulting mask after applying the specified operation between the destination and source masks, representing the composite outcome.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ToBinaryMask](../../ComfyUI-Impact-Pack/Nodes/ToBinaryMask.md)
    - [LatentCompositeMasked](../../Comfy/Nodes/LatentCompositeMasked.md)
    - [MaskToImage](../../Comfy/Nodes/MaskToImage.md)



## Source code
```python
class MaskComposite:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "destination": ("MASK",),
                "source": ("MASK",),
                "x": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
                "y": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
                "operation": (["multiply", "add", "subtract", "and", "or", "xor"],),
            }
        }

    CATEGORY = "mask"

    RETURN_TYPES = ("MASK",)

    FUNCTION = "combine"

    def combine(self, destination, source, x, y, operation):
        output = destination.reshape((-1, destination.shape[-2], destination.shape[-1])).clone()
        source = source.reshape((-1, source.shape[-2], source.shape[-1]))

        left, top = (x, y,)
        right, bottom = (min(left + source.shape[-1], destination.shape[-1]), min(top + source.shape[-2], destination.shape[-2]))
        visible_width, visible_height = (right - left, bottom - top,)

        source_portion = source[:, :visible_height, :visible_width]
        destination_portion = destination[:, top:bottom, left:right]

        if operation == "multiply":
            output[:, top:bottom, left:right] = destination_portion * source_portion
        elif operation == "add":
            output[:, top:bottom, left:right] = destination_portion + source_portion
        elif operation == "subtract":
            output[:, top:bottom, left:right] = destination_portion - source_portion
        elif operation == "and":
            output[:, top:bottom, left:right] = torch.bitwise_and(destination_portion.round().bool(), source_portion.round().bool()).float()
        elif operation == "or":
            output[:, top:bottom, left:right] = torch.bitwise_or(destination_portion.round().bool(), source_portion.round().bool()).float()
        elif operation == "xor":
            output[:, top:bottom, left:right] = torch.bitwise_xor(destination_portion.round().bool(), source_portion.round().bool()).float()

        output = torch.clamp(output, 0.0, 1.0)

        return (output,)

```
