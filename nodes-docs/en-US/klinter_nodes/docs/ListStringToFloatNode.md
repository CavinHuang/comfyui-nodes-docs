---
tags:
- DataConversion
- DataTypeConversion
- FloatData
- FloatList
- NumericConversion
---

# ListStringToFloatNode (klinter)
## Documentation
- Class name: `ListStringToFloatNode`
- Category: `Custom`
- Output node: `False`

The ListStringToFloatNode is designed to convert a string representation of a list into a float by performing a specified operation on the list elements, such as summing them. It handles both direct float values and lists of floats encapsulated as strings, providing a versatile tool for numerical data processing within a string-based input format.
## Input types
### Required
- **`input_data`**
    - Represents the string input that is either a direct float value or a string representation of a list of floats. This input is crucial for the node's operation as it determines the type of conversion and calculation to be performed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`output_float`**
    - Comfy dtype: `FLOAT`
    - The result of the conversion and calculation performed on the input data, provided as a single float value.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ListStringToFloatNode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": { "input_data": ("STRING", {"default": "[]"}) },
        }

    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("output_float",)
    FUNCTION = "process_input"
    CATEGORY = "Custom"

    def process_input(self, input_data):
        # Attempt to evaluate the string input as a list
        try:
            # Convert string to list if it's not a list
            if isinstance(input_data, str):
                input_data = ast.literal_eval(input_data)
            
            # Example operation: calculate the sum of elements if it's a list
            if isinstance(input_data, list):
                result = sum(input_data)
            else:
                result = float(input_data)
        except:
            # Handle errors or unexpected input types
            result = 0.0

        return (result,)

```
