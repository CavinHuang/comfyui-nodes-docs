---
tags:
- ComfyrollNodes
---

# ⚙️ CR Clamp Value
## Documentation
- Class name: `CR Clamp Value`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/⚙️ Other`
- Output node: `False`

The CR Clamp Value node is designed to restrict a given value within a specified range, ensuring that the output value does not exceed the defined minimum and maximum limits. This functionality is crucial for maintaining data integrity and preventing errors in downstream processes that rely on bounded inputs.
## Input types
### Required
- **`a`**
    - The value to be clamped. It is the primary input whose final output is constrained within the specified range.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`range_min`**
    - The minimum allowable value for the input. If 'a' is less than this value, 'a' is set to this minimum value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`range_max`**
    - The maximum allowable value for the input. If 'a' is greater than this value, 'a' is set to this maximum value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`a`**
    - Comfy dtype: `FLOAT`
    - The clamped value, adjusted to fall within the specified range.
    - Python dtype: `float`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the node's documentation, providing additional help and examples.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ClampValue:
       
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "a": ("FLOAT", {"default": 1, "min": -18446744073709551615, "max": 18446744073709551615}),
                "range_min": ("FLOAT", {"default": 1, "min": -18446744073709551615, "max": 18446744073709551615}),
                "range_max": ("FLOAT", {"default": 1, "min": -18446744073709551615, "max": 18446744073709551615}),
            }
        }
    
    RETURN_TYPES =("FLOAT", "STRING", )
    RETURN_NAMES =("a", "show_help", )
    FUNCTION = "clamp_value"    
    CATEGORY = icons.get("Comfyroll/Utils/Other")
    
    def clamp_value(self, a, range_min, range_max):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-clamp-value"

        a = max(range_min, min(a, range_max))        
        
        return (a, show_help, )

```
