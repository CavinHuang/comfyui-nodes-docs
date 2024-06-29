---
tags:
- Searge
---

# 5-Way Muxer for Conditioning
## Documentation
- Class name: `SeargeConditioningMuxer5`
- Category: `Searge/_deprecated_/FlowControl`
- Output node: `False`

The SeargeConditioningMuxer5 node is designed for selecting one of five conditioning inputs based on a specified selector input. It facilitates dynamic control over which conditioning data is passed forward in a processing pipeline, allowing for flexible manipulation of input data streams.
## Input types
### Required
- **`input0`**
    - Represents the first conditioning input option. Its selection is dependent on the value of the input selector.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`input1`**
    - Represents the second conditioning input option, selectable through the input selector.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`input2`**
    - Denotes the third conditioning input option, which can be chosen based on the input selector's value.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`input3`**
    - Indicates the fourth conditioning input option, selectable via the input selector.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`input4`**
    - Signifies the fifth conditioning input option, chosen based on the input selector's value.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`input_selector`**
    - An integer that selects which of the five conditioning inputs to pass forward. It determines the flow of data through the node.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`output`**
    - Comfy dtype: `CONDITIONING`
    - The selected conditioning input, determined by the input selector. It enables dynamic data flow control within the pipeline.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeConditioningMuxer5:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "input0": ("CONDITIONING",),
            "input1": ("CONDITIONING",),
            "input2": ("CONDITIONING",),
            "input3": ("CONDITIONING",),
            "input4": ("CONDITIONING",),
            "input_selector": ("INT", {"default": 0, "min": 0, "max": 4}),
        },
        }

    RETURN_TYPES = ("CONDITIONING",)
    RETURN_NAMES = ("output",)
    FUNCTION = "mux"

    CATEGORY = "Searge/_deprecated_/FlowControl"

    def mux(self, input0, input1, input2, input3, input4, input_selector):
        if input_selector == 1:
            return (input1,)
        elif input_selector == 2:
            return (input2,)
        elif input_selector == 3:
            return (input3,)
        elif input_selector == 4:
            return (input4,)
        else:
            return (input0,)

```
