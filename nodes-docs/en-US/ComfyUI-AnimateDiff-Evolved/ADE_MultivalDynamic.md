---
tags:
- AnimateDiff
- Animation
---

# Multival Dynamic 🎭🅐🅓
## Documentation
- Class name: `ADE_MultivalDynamic`
- Category: `Animate Diff 🎭🅐🅓/multival`
- Output node: `False`

The ADE_MultivalDynamic node dynamically adjusts values within a specified range, applying these adjustments based on a mask and a scaling method. It is designed to modify parameters or attributes in a flexible manner, allowing for precise control over the variation of these values across different areas or aspects of a process.
## Input types
### Required
- **`float_val`**
    - Specifies the value or range of values for dynamic adjustment. This parameter can accept both single float values and lists of floats, allowing for varied adjustments across different parts of the mask.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Union[float, list[float]]`
### Optional
- **`mask_optional`**
    - An optional tensor representing the mask that guides where and how the dynamic adjustments are applied. When provided, it determines the distribution and intensity of the adjustments across the target.
    - Comfy dtype: `MASK`
    - Python dtype: `Tensor`
## Output types
- **`multival`**
    - Comfy dtype: `MULTIVAL`
    - The result of dynamic adjustments applied to the input values, potentially across multiple values or areas, depending on the mask and scaling method used.
    - Python dtype: `Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ADE_ApplyAnimateDiffModel](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_ApplyAnimateDiffModel.md)



## Source code
```python
class MultivalDynamicNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "float_val": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001},),
            },
            "optional": {
                "mask_optional": ("MASK",)
            }
        }
    
    RETURN_TYPES = ("MULTIVAL",)
    CATEGORY = "Animate Diff 🎭🅐🅓/multival"
    FUNCTION = "create_multival"

    def create_multival(self, float_val: Union[float, list[float]]=1.0, mask_optional: Tensor=None):
        # first, normalize inputs
        # if float_val is iterable, treat as a list and assume inputs are floats
        float_is_iterable = False
        if isinstance(float_val, Iterable):
            float_is_iterable = True
            float_val = list(float_val)
            # if mask present, make sure float_val list can be applied to list - match lengths
            if mask_optional is not None:
                if len(float_val) < mask_optional.shape[0]:
                    # copies last entry enough times to match mask shape
                    float_val = float_val + float_val[-1]*(mask_optional.shape[0]-len(float_val))
                if mask_optional.shape[0] < len(float_val):
                    mask_optional = extend_to_batch_size(mask_optional, len(float_val))
                float_val = float_val[:mask_optional.shape[0]]
            float_val: Tensor = torch.tensor(float_val).unsqueeze(-1).unsqueeze(-1)
        # now that inputs are normalized, figure out what value to actually return
        if mask_optional is not None:
            mask_optional = mask_optional.clone()
            if float_is_iterable:
                mask_optional = mask_optional[:] * float_val.to(mask_optional.dtype).to(mask_optional.device)
            else:
                mask_optional = mask_optional * float_val
            return (mask_optional,)
        else:
            if not float_is_iterable:
                return (float_val,)
            # create a dummy mask of b,h,w=float_len,1,1 (sigle pixel)
            # purpose is for float input to work with mask code, without special cases
            float_len = float_val.shape[0] if float_is_iterable else 1
            shape = (float_len,1,1)
            mask_optional = torch.ones(shape)
            mask_optional = mask_optional[:] * float_val.to(mask_optional.dtype).to(mask_optional.device)
            return (mask_optional,)

```
