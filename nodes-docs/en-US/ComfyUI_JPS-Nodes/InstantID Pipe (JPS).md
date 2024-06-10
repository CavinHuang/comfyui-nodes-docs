---
tags:
- Image
---

# InstantID Pipe (JPS)
## Documentation
- Class name: `InstantID Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The InstantID Pipe node is designed to process settings for instant identification features, encapsulating the logic to handle various parameters such as weight, strength, noise, and range, and returning these processed settings for further use in identification tasks.
## Input types
### Required
- **`instantid_settings`**
    - Defines the settings for instant identification, including parameters like weight, strength, noise, start, and end. Each parameter plays a critical role in fine-tuning the identification process: 'weight' adjusts the emphasis on certain features, 'strength' controls the robustness of the identification, 'noise' can simulate variability in identification scenarios, and 'start' and 'end' define the operational range, ensuring precise control over the identification phase.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[float, float, float, float, float]`
## Output types
- **`ip_weight`**
    - Comfy dtype: `FLOAT`
    - The weight parameter influencing the identification process.
    - Python dtype: `float`
- **`cn_strength`**
    - Comfy dtype: `FLOAT`
    - The strength parameter for control network influence.
    - Python dtype: `float`
- **`noise`**
    - Comfy dtype: `FLOAT`
    - The noise level parameter in the identification process.
    - Python dtype: `float`
- **`start`**
    - Comfy dtype: `FLOAT`
    - The start parameter defining the beginning of the identification range.
    - Python dtype: `float`
- **`end`**
    - Comfy dtype: `FLOAT`
    - The end parameter defining the end of the identification range.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantID_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "instantid_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("FLOAT","FLOAT","FLOAT","FLOAT","FLOAT",)
    RETURN_NAMES = ("ip_weight","cn_strength","noise","start","end",)
    FUNCTION = "get_instantid"

    CATEGORY="JPS Nodes/Pipes"

    def get_instantid(self,instantid_settings):

        ip_weight,cn_strength,noise,start,end = instantid_settings

        return(ip_weight,cn_strength,noise,start,end)

```
