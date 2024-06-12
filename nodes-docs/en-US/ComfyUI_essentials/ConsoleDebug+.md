---
tags:
- Debugging
---

# 🔧 Console Debug
## Documentation
- Class name: `ConsoleDebug+`
- Category: `essentials`
- Output node: `True`

The ConsoleDebug node is designed for debugging purposes, allowing users to print values to the console with an optional prefix. It facilitates the observation and tracking of data flow through the system, making it easier to identify and diagnose issues.
## Input types
### Required
- **`value`**
    - Represents the value to be printed. It is central to the node's functionality as it is the data that will be output to the console for debugging purposes.
    - Comfy dtype: `*`
    - Python dtype: `object`
### Optional
- **`prefix`**
    - An optional string that precedes the printed value, helping to contextualize or label the output in the console. It defaults to 'Value:' if not specified.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConsoleDebug:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "value": (any, {}),
            },
            "optional": {
                "prefix": ("STRING", { "multiline": False, "default": "Value:" })
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "execute"
    CATEGORY = "essentials"
    OUTPUT_NODE = True

    def execute(self, value, prefix):
        print(f"\033[96m{prefix} {value}\033[0m")

        return (None,)

```
