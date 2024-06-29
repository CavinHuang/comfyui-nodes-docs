---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# Constant Number
## Documentation
- Class name: `Constant Number`
- Category: `WAS Suite/Number`
- Output node: `False`

This node is designed to process numerical inputs and convert them based on specified types, such as integer, float, or boolean. It allows for the transformation of a number or textual representation of a number into a constant value of a specified type, supporting operations like type conversion and value adjustment.
## Input types
### Required
- **`number_type`**
    - Specifies the desired type for the output number, allowing for conversion between integer, float, and boolean types, which affects how the input number is processed and converted.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`number`**
    - The numerical value to be processed or converted. This value serves as the base for any type conversion or adjustment operations performed by the node.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`number_as_text`**
    - An optional textual representation of a number that, if provided, will be converted according to the specified 'number_type'. This allows for textual input to be dynamically interpreted and processed as a numerical value.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The processed or converted number in the specified 'number_type', demonstrating the node's ability to adjust and convert numerical values effectively.
    - Python dtype: `float`
- **`float`**
    - Comfy dtype: `FLOAT`
    - The float representation of the processed or converted number.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The integer representation of the processed or converted number.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Number Operation](../../was-node-suite-comfyui/Nodes/Number Operation.md)



## Source code
```python
class WAS_Constant_Number:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "number_type": (["integer", "float", "bool"],),
                "number": ("FLOAT", {"default": 0, "min": -18446744073709551615, "max": 18446744073709551615}),
            },
            "optional": {
                "number_as_text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
            }
        }

    RETURN_TYPES = ("NUMBER", "FLOAT", "INT")
    FUNCTION = "return_constant_number"

    CATEGORY = "WAS Suite/Number"

    def return_constant_number(self, number_type, number, number_as_text=None):

        if number_as_text:
            if number_type == "integer":
                number = int(number_as_text)
            elif number_type == "float":
                number = float(number_as_text)
            else:
                number = bool(number_as_text)

        # Return number
        if number_type:
            if number_type == 'integer':
                return (int(number), float(number), int(number) )
            elif number_type == 'integer':
                return (float(number), float(number), int(number) )
            elif number_type == 'bool':
                boolean = (1 if float(number) > 0.5 else 0)
                return (int(boolean), float(boolean), int(boolean) )
            else:
                return (number, float(number), int(number) )

```
