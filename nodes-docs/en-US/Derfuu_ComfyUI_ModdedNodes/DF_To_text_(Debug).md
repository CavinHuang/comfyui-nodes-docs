---
tags:
- Text
---

# To text (Debug)
## Documentation
- Class name: `DF_To_text_(Debug)`
- Category: `Derfuu_Nodes/Debug`
- Output node: `True`

The `DF_To_text_(Debug)` node is designed for debugging purposes, allowing users to print and inspect any data passed to it. It converts the input data to a string representation, facilitating the examination of data structures, variables, or any other information during the node's execution. This node aids in identifying issues or verifying data processing steps within a workflow by providing a clear textual output of the input data.
## Input types
### Required
- **`ANY`**
    - Accepts any type of data for debugging purposes. It allows users to inspect the content and structure of the data passed to the node, aiding in debugging and data verification tasks.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
- **`SAME AS INPUT`**
    - Comfy dtype: `*`
    - Returns the original input data unchanged, facilitating further processing or inspection in the workflow.
    - Python dtype: `Any`
- **`STRING`**
    - Comfy dtype: `STRING`
    - Returns the string representation of the input data or the exception message if an error occurred during processing.
    - Python dtype: `str`
- **`ui`**
    - Provides a user interface element displaying the textual representation of the input data or any exceptions encountered during processing.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ShowDataDebug:
    CATEGORY = TREE_DEBUG

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "ANY": Field.any(),
            },
        }

    RETURN_TYPES = (ANY, "STRING", )
    RETURN_NAMES = ("SAME AS INPUT", "STRING", )
    OUTPUT_NODE = True
    IS_CHANGED = True
    FUNCTION = "func"

    def func(self, ANY = None):
        out = ANY
        try:
            out = str(out)
            print(colorize(f"[DEBUG]: {ANY}", ConsoleColor.blue.value))
        except Exception as e:
            print(colorize(f"[DEBUG-EXCEPTION]: {e}", ConsoleColor.bold_red.value))
            out = str(e)
        return {"ui": {"text": [out]}, "result": (ANY, out)}

```
