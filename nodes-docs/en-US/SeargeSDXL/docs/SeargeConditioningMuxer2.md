---
tags:
- Searge
---

# 2-Way Muxer for Conditioning
## Documentation
- Class name: `SeargeConditioningMuxer2`
- Category: `Searge/_deprecated_/FlowControl`
- Output node: `False`

The SeargeConditioningMuxer2 node is designed for selecting one of two conditioning inputs based on a selector input. It facilitates dynamic control over which conditioning data is passed forward in a processing pipeline, allowing for flexible manipulation of conditioning contexts.
## Input types
### Required
- **`input0`**
    - The first conditioning input option. This input represents one of the potential conditioning contexts to be selected.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`input1`**
    - The second conditioning input option. Similar to input0, this represents an alternative conditioning context that can be selected.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`input_selector`**
    - An integer selector that determines which of the two conditioning inputs (input0 or input1) is passed forward. A value of 0 selects input0, while a value of 1 selects input1.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`output`**
    - Comfy dtype: `CONDITIONING`
    - The selected conditioning input, determined by the value of the input_selector. This output carries forward the chosen conditioning context for further processing.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeConditioningMuxer2:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "input0": ("CONDITIONING",),
            "input1": ("CONDITIONING",),
            "input_selector": ("INT", {"default": 0, "min": 0, "max": 1}),
        },
        }

    RETURN_TYPES = ("CONDITIONING",)
    RETURN_NAMES = ("output",)
    FUNCTION = "mux"

    CATEGORY = "Searge/_deprecated_/FlowControl"

    def mux(self, input0, input1, input_selector):
        if input_selector == 1:
            return (input1,)
        else:
            return (input0,)

```
