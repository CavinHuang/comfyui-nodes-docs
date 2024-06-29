---
tags:
- DataTypeConversion
- NumericConversion
---

# Convert Any
## Documentation
- Class name: `easy convertAnything`
- Category: `EasyUse/Logic`
- Output node: `True`

The `convert` node dynamically converts input data to a specified output type, including string, integer, float, or boolean. This capability enables versatile data type manipulation within workflows, accommodating a wide range of processing requirements.
## Input types
### Required
- **`anything`**
    - Represents the input data to be converted, allowing for a broad spectrum of data types to be processed, enhancing the node's adaptability across various inputs.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`output_type`**
    - Determines the target output data type for the conversion, such as 'string', 'int', 'float', or 'boolean', guiding the transformation of the input data to meet specific needs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`*`**
    - Comfy dtype: `COMBO[STRING]`
    - The output is the input data converted to the specified output type, enabling further use or processing in the desired format.
    - Python dtype: `Union[str, int, float, bool]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConvertAnything:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "anything": (AlwaysEqualProxy("*"),),
            "output_type": (["string", "int", "float", "boolean"], {"default": "string"}),
        }}

    RETURN_TYPES = (AlwaysEqualProxy("*"),),
    RETURN_NAMES = ('*',)
    OUTPUT_NODE = True
    FUNCTION = "convert"
    CATEGORY = "EasyUse/Logic"

    def convert(self, *args, **kwargs):
        print(kwargs)
        anything = kwargs['anything']
        output_type = kwargs['output_type']
        params = None
        if output_type == 'string':
            params = str(anything)
        elif output_type == 'int':
            params = int(anything)
        elif output_type == 'float':
            params = float(anything)
        elif output_type == 'boolean':
            params = bool(anything)
        return (params,)

```
