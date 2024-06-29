---
tags:
- Batch
- FloatData
---

# Batch Float Assemble (mtb)
## Documentation
- Class name: `Batch Float Assemble (mtb)`
- Category: `mtb/batch`
- Output node: `False`

The MTB_BatchFloatAssemble node is designed to aggregate multiple batches of floating-point numbers into a unified batch, optionally reversing the order of the batches before combining them. This functionality is crucial for scenarios where the sequential order of data points impacts the processing or analysis outcomes.
## Input types
### Required
- **`reverse`**
    - Determines whether the input batches of floats should be reversed before being assembled into a single batch. This option allows for flexibility in handling the order of data, which can be critical for certain analyses or processing tasks.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`floats`**
    - Comfy dtype: `FLOATS`
    - The output is a single batch of floats, assembled from the input batches. This consolidated batch can be used for further processing or analysis, providing a streamlined dataset.
    - Python dtype: `list[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_BatchFloatAssemble:
    """Assembles mutiple batches of floats into a single stream (batch)"""

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"reverse": ("BOOLEAN", {"default": False})}}

    FUNCTION = "assemble_floats"
    RETURN_TYPES = ("FLOATS",)
    CATEGORY = "mtb/batch"

    def assemble_floats(self, reverse, **kwargs):
        res = []
        if reverse:
            for x in reversed(kwargs.values()):
                res += x
        else:
            for x in kwargs.values():
                res += x

        return (res,)

```
