---
tags:
- Image
---

# InstantID Settings (JPS)
## Documentation
- Class name: `InstantID Settings (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

This node is designed to configure settings for generating an InstantID, allowing customization of various parameters such as influence weight, strength, noise level, and start/end points of the ID generation process.
## Input types
### Required
- **`ip_weight`**
    - Defines the influence weight of the InstantID, affecting its overall impact on the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cn_strength`**
    - Sets the strength of the content noise, influencing the variability and uniqueness of the generated InstantID.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise`**
    - Specifies the level of noise to be added to the InstantID, contributing to its randomness and complexity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start`**
    - Determines the starting point of the InstantID generation, allowing for phased or gradual application.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end`**
    - Defines the ending point of the InstantID generation, marking the completion of its application.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`instantid_settings`**
    - Comfy dtype: `BASIC_PIPE`
    - Outputs the configured settings for InstantID as a tuple, ready for use in the generation process.
    - Python dtype: `Tuple[float, float, float, float, float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantID_Settings:

    ipamasktype = ["No Mask","Mask Editor","Mask Editor (inverted)","Red from Image","Green from Image","Blue from Image"]        
    
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ip_weight": ("FLOAT", {"default": 0.8, "min": 0, "max": 1, "step": 0.01}),
                "cn_strength": ("FLOAT", {"default": 0.65, "min": 0, "max": 10, "step": 0.01}),
                "noise": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.1, }),
                "start": ("FLOAT", {"default": 0.00, "min": 0, "max": 1, "step": 0.05}),
                "end": ("FLOAT", {"default": 1.00, "min": 0, "max": 1, "step": 0.05}),
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("instantid_settings",)
    FUNCTION = "get_instantid"

    CATEGORY="JPS Nodes/Settings"

    def get_instantid(self,ip_weight,cn_strength,noise,start,end):

        instantid_settings = ip_weight,cn_strength,noise,start,end

        return(instantid_settings,)

```
