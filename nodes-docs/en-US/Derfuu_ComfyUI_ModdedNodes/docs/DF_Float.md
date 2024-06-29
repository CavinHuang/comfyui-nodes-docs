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
- Class name: `DF_Float`
- Category: `Derfuu_Nodes/Variables`
- Output node: `False`

The DF_Float node is designed to directly pass through floating-point values without modification, serving as a fundamental building block for numerical data manipulation within the node network.
## Input types
### Required
- **`Value`**
    - Accepts a floating-point value as input, which is directly passed through without any modification. This parameter is essential for the node's operation as it determines the exact value that will be output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - Outputs the same floating-point value as received in the input, ensuring a direct pass-through of numerical data.
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
class FloatNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value": Field.float(),
            },
        }

    RETURN_TYPES = ("FLOAT",)
    CATEGORY = TREE_VARIABLE
    FUNCTION = "get_value"

    def get_value(self, Value):
        return (Value,)

```
