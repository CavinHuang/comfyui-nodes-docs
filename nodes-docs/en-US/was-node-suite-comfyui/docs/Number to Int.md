---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# Number to Int
## Documentation
- Class name: `Number to Int`
- Category: `WAS Suite/Number/Operations`
- Output node: `False`

The node 'Number_To_Int' is designed to convert a given number into its integer representation. It abstracts the process of type conversion, ensuring that any input number, regardless of its original format, is transformed into an integer.
## Input types
### Required
- **`number`**
    - The 'number' parameter accepts any numerical value, serving as the input that will be converted into an integer. This parameter is crucial for the node's operation as it directly influences the output by determining the integer value to be produced.
    - Comfy dtype: `NUMBER`
    - Python dtype: `float | int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The output is the integer representation of the input number. This conversion is significant for operations or contexts where an integer value is required, ensuring compatibility and correctness.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Number_To_Int:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "number": ("NUMBER",),
            }
        }

    RETURN_TYPES = ("INT",)
    FUNCTION = "number_to_int"

    CATEGORY = "WAS Suite/Number/Operations"

    def number_to_int(self, number):
        return (int(number), )

```
