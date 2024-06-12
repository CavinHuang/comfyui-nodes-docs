---
tags:
- DataTypeConversion
- NumericConversion
---

# ImpactValueReceiver
## Documentation
- Class name: `ImpactValueReceiver`
- Category: `ImpactPack/Logic`
- Output node: `False`

The ImpactValueReceiver node is designed to receive and convert values based on their specified type. It supports a variety of types including strings, integers, floats, and booleans, allowing for flexible data handling within the ImpactPack/Logic category.
## Input types
### Required
- **`typ`**
    - Specifies the type of the value to be received and converted. It supports string, integer, float, and boolean types, enabling the node to handle a wide range of data formats.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`value`**
    - The value to be converted according to the specified type. It's initially received as a string and then converted based on the 'typ' parameter.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`link_id`**
    - An identifier for linking the received value to a specific context or usage within the system. It aids in the organization and tracking of data flow.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`*`**
    - Comfy dtype: `*`
    - The converted value, outputted in the specified type. This allows for the dynamic handling and utilization of data within the system.
    - Python dtype: `Union[int, float, bool, str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactValueReceiver:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "typ": (["STRING", "INT", "FLOAT", "BOOLEAN"], ),
                    "value": ("STRING", {"default": ""}),
                    "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                    },
                }

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic"

    RETURN_TYPES = (any_typ, )

    def doit(self, typ, value, link_id=0):
        if typ == "INT":
            return (int(value), )
        elif typ == "FLOAT":
            return (float(value), )
        elif typ == "BOOLEAN":
            return (value.lower() == "true", )
        else:
            return (value, )

```
