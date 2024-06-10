---
tags:
- Conditioning
---

# Conditioning Multi Combine
## Documentation
- Class name: `ConditioningMultiCombine`
- Category: `KJNodes/masking/conditioning`
- Output node: `False`

This node is designed to aggregate multiple conditioning inputs into a single, unified conditioning output. It leverages the capabilities of other conditioning nodes to sequentially combine conditioning data, facilitating complex conditioning scenarios in a streamlined manner.
## Input types
### Required
- **`inputcount`**
    - Specifies the number of conditioning inputs to be combined. It determines the execution flow by dictating how many conditioning inputs will be processed and merged.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`conditioning_i`**
    - Represents a series of conditioning inputs to be combined, starting from 'conditioning_1' to 'conditioning_{inputcount}'. Each serves as an incremental addition to the combined conditioning output, facilitating a sequential combination process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `list of CONDITIONING`
## Output types
- **`combined`**
    - Comfy dtype: `CONDITIONING`
    - The result of combining the specified conditioning inputs into a single conditioning output.
    - Python dtype: `CONDITIONING`
- **`inputcount`**
    - Comfy dtype: `INT`
    - Returns the number of conditioning inputs that were combined.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningMultiCombine:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "inputcount": ("INT", {"default": 2, "min": 2, "max": 20, "step": 1}),
                "conditioning_1": ("CONDITIONING", ),
                "conditioning_2": ("CONDITIONING", ),
            },
    }

    RETURN_TYPES = ("CONDITIONING", "INT")
    RETURN_NAMES = ("combined", "inputcount")
    FUNCTION = "combine"
    CATEGORY = "KJNodes/masking/conditioning"
    DESCRIPTION = """
Combines multiple conditioning nodes into one
"""

    def combine(self, inputcount, **kwargs):
        from nodes import ConditioningCombine
        cond_combine_node = ConditioningCombine()
        cond = kwargs["conditioning_1"]
        for c in range(1, inputcount):
            new_cond = kwargs[f"conditioning_{c + 1}"]
            cond = cond_combine_node.combine(new_cond, cond)[0]
        return (cond, inputcount,)

```
