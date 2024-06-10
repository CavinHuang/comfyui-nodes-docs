---
tags:
- Debugging
---

# Debug Input
## Documentation
- Class name: `DebugInput`
- Category: `debug`
- Output node: `True`

The DebugInput node is designed for debugging purposes, allowing users to print and inspect the properties and directory listing of any input object. It serves as a versatile tool for understanding and troubleshooting the data flowing through the node.
## Input types
### Required
- **`input`**
    - Accepts any type of input, facilitating the debugging process by printing the input's value and, if the input is an object, its directory listing.
    - Comfy dtype: `*`
    - Python dtype: `AnyType`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_DebugThis:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"input": (wildcard, {})},
        }

    RETURN_TYPES = ()
    OUTPUT_NODE = True

    FUNCTION = "debug"

    CATEGORY = "debug"

    def debug(self, input):
    
        print("Debug:")
        print(input)
        if isinstance(input, object) and not isinstance(input, (str, int, float, bool, list, dict, tuple)):
            print("Objects directory listing:")
            pprint(dir(input), indent=4)
		
        return ()

```
