---
tags:
- ControlNet
- Image
---

# CtrlNet MiDaS Pipe (JPS)
## Documentation
- Class name: `CtrlNet MiDaS Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The CtrlNet MiDaS Pipe node is designed to process settings for depth estimation using the MiDaS model, encapsulating the configuration into a format suitable for further processing or application within a pipeline. It primarily serves to adjust depth-related parameters based on input settings.
## Input types
### Required
- **`midas_settings`**
    - Specifies the configuration for depth estimation, including source, strength, start, end, and additional parameters, which collectively determine how depth estimation is performed.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[int, float, float, float, float, float]`
## Output types
- **`midas_source`**
    - Comfy dtype: `INT`
    - Identifies the source image for depth estimation.
    - Python dtype: `int`
- **`midas_strength`**
    - Comfy dtype: `FLOAT`
    - Specifies the strength of the depth effect.
    - Python dtype: `float`
- **`midas_start`**
    - Comfy dtype: `FLOAT`
    - Defines the starting point of depth effect application.
    - Python dtype: `float`
- **`midas_end`**
    - Comfy dtype: `FLOAT`
    - Marks the end point of depth effect application.
    - Python dtype: `float`
- **`midas_a`**
    - Comfy dtype: `FLOAT`
    - Adjusts a specific depth parameter, influencing the overall depth effect.
    - Python dtype: `float`
- **`midas_bg`**
    - Comfy dtype: `FLOAT`
    - Controls the background depth parameter, affecting how background depth is rendered.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CtrlNet_MiDaS_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "midas_settings": ("BASIC_PIPE",)
            },
        }
    RETURN_TYPES = ("INT", "FLOAT", "FLOAT", "FLOAT", "FLOAT", "FLOAT",)
    RETURN_NAMES = ("midas_source", "midas_strength", "midas_start", "midas_end", "midas_a", "midas_bg",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Pipes"

    def give_values(self,midas_settings):
        
        midas_source, midas_strength, midas_start, midas_end, midas_a, midas_bg = midas_settings

        return(midas_source, midas_strength, midas_start, midas_end, midas_a, midas_bg,)

```
