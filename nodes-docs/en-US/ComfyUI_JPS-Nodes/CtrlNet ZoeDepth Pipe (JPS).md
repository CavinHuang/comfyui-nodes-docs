---
tags:
- ControlNet
- Image
---

# CtrlNet ZoeDepth Pipe (JPS)
## Documentation
- Class name: `CtrlNet ZoeDepth Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

This node is designed to process ZoeDepth settings, translating them into specific values that can be utilized in further image processing or rendering tasks. It abstracts the complexity of handling depth-related parameters by providing a straightforward interface to specify depth effects.
## Input types
### Required
- **`zoedepth_settings`**
    - Specifies the settings for ZoeDepth, including source, strength, start, and end points of depth effect. This input is crucial for determining how depth will be applied in the image processing pipeline.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[int, float, float, float]`
## Output types
- **`zoe_source`**
    - Comfy dtype: `INT`
    - The source of depth information, determined by the ZoeDepth settings.
    - Python dtype: `int`
- **`zoe_strength`**
    - Comfy dtype: `FLOAT`
    - The strength of the depth effect.
    - Python dtype: `float`
- **`zoe_start`**
    - Comfy dtype: `FLOAT`
    - The starting point of the depth effect.
    - Python dtype: `float`
- **`zoe_end`**
    - Comfy dtype: `FLOAT`
    - The ending point of the depth effect.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_ZoeDepth_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "zoedepth_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("INT", "FLOAT", "FLOAT", "FLOAT",)
    RETURN_NAMES = ("zoe_source", "zoe_strength", "zoe_start", "zoe_end",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,zoedepth_settings):
        
        zoe_source, zoe_strength, zoe_start, zoe_end = zoedepth_settings

        return(zoe_source, zoe_strength, zoe_start, zoe_end,)

```
