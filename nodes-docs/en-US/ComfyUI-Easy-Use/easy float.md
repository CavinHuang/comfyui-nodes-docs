---
tags:
- DataConversion
- DataTypeConversion
- Float
- FloatData
- NumericConversion
---

# Float
## Documentation
- Class name: `easy float`
- Category: `EasyUse/Logic/Type`
- Output node: `False`

The `easy float` node is designed to simplify the process of working with floating-point numbers within a user interface, providing a straightforward way to input and adjust float values through parameters with predefined constraints such as default values, minimum and maximum limits, and step sizes.
## Input types
### Required
- **`value`**
    - Represents a floating-point number that can be adjusted within specified limits. This parameter is crucial for defining numerical values with precision, allowing for fine-tuning of settings or configurations in various applications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - Outputs a floating-point number, reflecting the adjusted value based on the input parameters.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - ezMath
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - Reroute
    - workflow/IP Adapter full bundle



## Source code
```python
class Float:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"value": ("FLOAT", {"default": 0, "step": 0.01})},
        }

    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("float",)
    FUNCTION = "execute"
    CATEGORY = "EasyUse/Logic/Type"

    def execute(self, value):
        return (value,)

```
