---
tags:
- Debugging
---

# DebugPrint
## Documentation
- Class name: `DebugPrint`
- Category: `Logic`
- Output node: `True`

The DebugPrint node is designed for debugging purposes, allowing developers to print any input directly to the console. This facilitates the tracking and examination of data flow through the node network, aiding in the identification and resolution of issues.
## Input types
### Required
- **`ANY`**
    - Accepts any input, serving as a flexible conduit for data to be logged. This universality ensures that the node can be seamlessly integrated into various points of a node network without compatibility concerns.
    - Comfy dtype: `{}`
    - Python dtype: `Any`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DebugPrint:
    """
    This node prints the input to the console.
    """

    @classmethod
    def INPUT_TYPES(s):
        """
        Takes in any input.

        """
        return {"required": {"ANY": (AlwaysEqualProxy({}),)}}

    RETURN_TYPES = ()

    OUTPUT_NODE = True

    FUNCTION = "log_input"

    CATEGORY = "Logic"

    def log_input(self, ANY):
        print(ANY)
        return {}

```
