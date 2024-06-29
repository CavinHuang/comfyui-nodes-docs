---
tags:
- Math
- MathematicalFunctions
---

# Integer
## Documentation
- Class name: `DF_Integer`
- Category: `Derfuu_Nodes/Variables`
- Output node: `False`

The DF_Integer node is designed to convert floating-point numbers to integers by rounding them down to the nearest whole number. It serves as a fundamental tool for operations requiring integer values, such as indexing or discrete mathematics, by ensuring numerical inputs are appropriately formatted for such contexts.
## Input types
### Required
- **`Value`**
    - The 'Value' parameter accepts a floating-point number and rounds it down to the nearest integer, facilitating operations that require whole numbers.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The output is an integer representation of the input floating-point number, rounded down to the nearest whole number.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CLIPTextEncodeSDXL](../../Comfy/Nodes/CLIPTextEncodeSDXL.md)
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - [Image Resize](../../was-node-suite-comfyui/Nodes/Image Resize.md)
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)



## Source code
```python
class IntegerNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value": Field.float(step=1)
            },
        }

    RETURN_TYPES = ("INT",)
    CATEGORY = TREE_VARIABLE
    FUNCTION = "get_value"

    def get_value(self, Value: float):
        return (int(Value),)

```
