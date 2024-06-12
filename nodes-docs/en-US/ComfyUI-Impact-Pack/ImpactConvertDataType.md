---
tags:
- DataTypeConversion
- NumericConversion
---

# ImpactConvertDataType
## Documentation
- Class name: `ImpactConvertDataType`
- Category: `ImpactPack/Logic`
- Output node: `False`

The ImpactConvertDataType node is designed to convert a given input value into multiple data types, including string, float, integer, and boolean, based on the input's nature and content. This conversion facilitates the handling and processing of data across different formats within the ImpactPack/Logic category.
## Input types
### Required
- **`value`**
    - The 'value' parameter is the input that will be converted into multiple data types. Its nature and content determine the outcome of the conversion, affecting the node's execution and results.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Represents the input value converted to a string format.
    - Python dtype: `str`
- **`float`**
    - Comfy dtype: `FLOAT`
    - Represents the input value converted to a float format, with numerical inputs directly converted and non-numerical inputs interpreted as boolean values before conversion.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - Represents the input value converted to an integer format, following the same conversion logic as for the float type.
    - Python dtype: `int`
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - Represents the input value converted to a boolean format, with numerical values interpreted based on their truthiness and non-numerical values based on specific string interpretations.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactConvertDataType:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"value": (any_typ,)}}

    RETURN_TYPES = ("STRING", "FLOAT", "INT", "BOOLEAN")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic"

    @staticmethod
    def is_number(string):
        pattern = re.compile(r'^[-+]?[0-9]*\.?[0-9]+$')
        return bool(pattern.match(string))

    def doit(self, value):
        if self.is_number(str(value)):
            num = value
        else:
            if str.lower(str(value)) != "false":
                num = 1
            else:
                num = 0
        return (str(value), float(num), int(float(num)), bool(float(num)), )

```
