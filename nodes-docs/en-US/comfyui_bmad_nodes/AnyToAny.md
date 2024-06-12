---
tags:
- DataTypeAgnostic
- Debugging
---

# AnyToAny
## Documentation
- Class name: `AnyToAny`
- Category: `Bmad/⚠️⚠️⚠️`
- Output node: `False`

The AnyToAny node is designed to dynamically evaluate and transform input data based on a user-defined function. It abstracts the complexity of applying custom operations on data, allowing for versatile data manipulation and transformation.
## Input types
### Required
- **`v`**
    - Represents the input value to be transformed. Its flexibility in accepting any data type makes it central to the node's operation, enabling a wide range of transformations.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`function`**
    - A string representing a lambda function defined by the user. This function dictates how the input value 'v' is transformed, showcasing the node's capability to execute custom data manipulations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`*`**
    - Comfy dtype: `*`
    - The output is dynamically determined by the user-defined function, showcasing the node's versatility in handling and transforming various data types.
    - Python dtype: `Any`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnyToAny:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "v": ("*",),
            "function": ("STRING", {"multiline": True, "default": ""}),
        }}

    FUNCTION = "eval_it"
    CATEGORY = "Bmad/⚠️⚠️⚠️"
    RETURN_TYPES = tuple(["*" for x in range(16)])

    def eval_it(self, v, function):
        function = prepare_text_for_eval(function)
        expression = eval(f"lambda v: {function}", {
            "__builtins__": {},
            "tuple": tuple, "list": list},
                          {})
        result = expression(v)
        return result

```
