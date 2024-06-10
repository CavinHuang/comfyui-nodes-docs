---
tags:
- Searge
---

# 3-Way Muxer for Latents
## Documentation
- Class name: `SeargeLatentMuxer3`
- Category: `Searge/_deprecated_/FlowControl`
- Output node: `False`

The SeargeLatentMuxer3 node is designed for selecting one of three provided latent inputs based on a specified selector input. It facilitates dynamic control over which latent input to proceed with in a computational graph, allowing for flexible manipulation of latent representations in generative models.
## Input types
### Required
- **`input0`**
    - The first latent input option for selection.
    - Comfy dtype: `LATENT`
    - Python dtype: `tuple`
- **`input1`**
    - The second latent input option for selection.
    - Comfy dtype: `LATENT`
    - Python dtype: `tuple`
- **`input2`**
    - The third latent input option for selection.
    - Comfy dtype: `LATENT`
    - Python dtype: `tuple`
- **`input_selector`**
    - An integer selector that determines which of the three latent inputs to use. The selector ranges from 0 to 2, with each number corresponding to one of the latent inputs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`output`**
    - Comfy dtype: `LATENT`
    - The selected latent input, based on the value of the input selector.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeLatentMuxer3:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "input0": ("LATENT",),
            "input1": ("LATENT",),
            "input2": ("LATENT",),
            "input_selector": ("INT", {"default": 0, "min": 0, "max": 2}),
        },
        }

    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("output",)
    FUNCTION = "mux"

    CATEGORY = "Searge/_deprecated_/FlowControl"

    def mux(self, input0, input1, input2, input_selector):
        if input_selector == 1:
            return (input1,)
        elif input_selector == 2:
            return (input2,)
        else:
            return (input0,)

```
