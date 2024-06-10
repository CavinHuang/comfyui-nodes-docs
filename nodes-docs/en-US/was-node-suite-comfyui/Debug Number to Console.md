---
tags:
- Debugging
---

# Debug Number to Console
## Documentation
- Class name: `Debug Number to Console`
- Category: `WAS Suite/Debug`
- Output node: `True`

This node is designed for debugging purposes, allowing the user to print a specified number along with an optional label to the console. It serves as a simple yet effective tool for monitoring and debugging numerical values during the execution of a workflow.
## Input types
### Required
- **`number`**
    - The numerical value to be printed to the console. It is the primary data of interest for debugging.
    - Comfy dtype: `NUMBER`
    - Python dtype: `Union[int, float]`
- **`label`**
    - An optional label to accompany the number in the console output, providing context or identification for the debugged value.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The same numerical value that was input, passed through for further use or inspection in the workflow.
    - Python dtype: `Union[int, float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Debug_Number_to_Console:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "number": ("NUMBER",),
                "label": ("STRING", {"default": 'Debug to Console', "multiline": False}),
            }
        }

    RETURN_TYPES = ("NUMBER",)
    OUTPUT_NODE = True
    FUNCTION = "debug_to_console"

    CATEGORY = "WAS Suite/Debug"

    def debug_to_console(self, number, label):
        if label.strip() != '':
            cstr(f'\033[33m{label}\033[0m:\n{number}\n').msg.print()
        else:
            cstr(f'\033[33mDebug to Console\033[0m:\n{number}\n').msg.print()
        return (number, )

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

```
