---
tags:
- BooleanLogic
- ConditionalSelection
---

# Logic Boolean
## Documentation
- Class name: `Logic Boolean`
- Category: `WAS Suite/Logic`
- Output node: `False`

The Logic Boolean node is designed to process boolean inputs, performing basic logical operations or conversions based on the specified function. It abstracts the complexity of boolean logic into simple, reusable components that can be integrated into larger workflows, facilitating decision-making processes and data flow control.
## Input types
### Required
- **`boolean_number`**
    - The boolean_number input parameter is crucial for determining the operation's outcome, serving as the primary data upon which logical operations or conversions are performed. Its value directly influences the node's execution and results.
    - Comfy dtype: `FLOAT`
    - Python dtype: `bool`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The number output represents the numerical result of the logical operation or conversion performed, encapsulating the outcome in a numerical format.
    - Python dtype: `int`
- **`int`**
    - Comfy dtype: `INT`
    - The int output provides an integer representation of the logical operation or conversion result, further specifying the numerical outcome.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Image Input Switch](../../was-node-suite-comfyui/Nodes/Image Input Switch.md)



## Source code
```python
class WAS_Boolean:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean_number": ("FLOAT", {"default":1, "min":0, "max":1, "step":1}),
            }
        }

    RETURN_TYPES = ("NUMBER","INT")
    FUNCTION = "return_boolean"

    CATEGORY = "WAS Suite/Logic"

    def return_boolean(self, boolean_number=True):
        return (int(round(boolean_number)), int(round(boolean_number)))

```
