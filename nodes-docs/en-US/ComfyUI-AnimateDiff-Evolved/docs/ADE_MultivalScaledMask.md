---
tags:
- AnimateDiff
- Animation
---

# Multival Scaled Mask 🎭🅐🅓
## Documentation
- Class name: `ADE_MultivalScaledMask`
- Category: `Animate Diff 🎭🅐🅓/multival`
- Output node: `False`

The ADE_MultivalScaledMask node is designed to apply scaling to a given mask based on specified minimum and maximum float values, with the option to choose between absolute or relative scaling methods. This functionality allows for dynamic adjustment of mask values, facilitating various image processing and animation effects within the ComfyUI-AnimateDiff-Evolved framework.
## Input types
### Required
- **`min_float_val`**
    - Specifies the minimum value for scaling the mask. It sets the lower bound for the mask's value transformation, playing a crucial role in the scaling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max_float_val`**
    - Defines the maximum value for scaling the mask. It establishes the upper limit for the mask's value transformation, significantly impacting the scaling outcome.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mask`**
    - The input mask to be scaled. This tensor represents the target data for scaling operations, serving as the primary subject of the node's functionality. Its values are dynamically adjusted based on the scaling parameters, directly influencing the intensity and distribution of the scaled effects applied.
    - Comfy dtype: `MASK`
    - Python dtype: `Tensor`
### Optional
- **`scaling`**
    - Determines the scaling method to be applied to the mask, either absolute or relative. This choice dictates how the mask values are adjusted, influencing the final effect on the mask.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`multival`**
    - Comfy dtype: `MULTIVAL`
    - The scaled mask after applying the specified scaling method. This output reflects the transformation of the input mask based on the provided scaling parameters.
    - Python dtype: `Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MultivalScaledMaskNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "min_float_val": ("FLOAT", {"default": 0.0, "min": 0.0, "step": 0.001}),
                "max_float_val": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001}),
                "mask": ("MASK",),
            },
            "optional": {
                "scaling": (ScaleType.LIST,),
            }
        }

    RETURN_TYPES = ("MULTIVAL",)
    CATEGORY = "Animate Diff 🎭🅐🅓/multival"
    FUNCTION = "create_multival"

    def create_multival(self, min_float_val: float, max_float_val: float, mask: Tensor, scaling: str=ScaleType.ABSOLUTE):
        # TODO: allow min_float_val and max_float_val to be list[float]
        if isinstance(min_float_val, Iterable):
            raise ValueError(f"min_float_val must be type float (no lists allowed here), not {type(min_float_val).__name__}.")
        if isinstance(max_float_val, Iterable):
            raise ValueError(f"max_float_val must be type float (no lists allowed here), not {type(max_float_val).__name__}.")
        
        if scaling == ScaleType.ABSOLUTE:
            mask = linear_conversion(mask.clone(), new_min=min_float_val, new_max=max_float_val)
        elif scaling == ScaleType.RELATIVE:
            mask = normalize_min_max(mask.clone(), new_min=min_float_val, new_max=max_float_val)
        else:
            raise ValueError(f"scaling '{scaling}' not recognized.")
        return MultivalDynamicNode.create_multival(self, mask_optional=mask)

```
