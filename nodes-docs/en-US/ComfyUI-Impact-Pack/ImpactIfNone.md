---
tags:
- BooleanLogic
- ConditionalSelection
---

# ImpactIfNone
## Documentation
- Class name: `ImpactIfNone`
- Category: `ImpactPack/Logic`
- Output node: `False`

The ImpactIfNone node is designed to evaluate if a given input is None and conditionally execute logic based on that evaluation. It serves as a decision-making node within a workflow, allowing for the branching of logic depending on whether an input value is present or absent.
## Input types
### Required
### Optional
- **`signal`**
    - The 'signal' parameter is the value to be checked for None. Its presence or absence determines the flow of execution within the node, influencing subsequent operations.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`any_input`**
    - The 'any_input' parameter is required to accommodate any type of input, ensuring flexibility in the node's application across different scenarios.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
- **`signal_opt`**
    - Comfy dtype: `*`
    - The 'signal_opt' parameter either passes through the 'signal' value if it is not None, or it returns a fallback value, effectively allowing the node to conditionally substitute a value.
    - Python dtype: `Any`
- **`bool`**
    - Comfy dtype: `BOOLEAN`
    - The 'bool' output indicates the result of the None check, providing a boolean value that represents whether the 'signal' was None or not.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactIfNone:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {"signal": (any_typ,), "any_input": (any_typ,), }
        }

    RETURN_TYPES = (any_typ, "BOOLEAN", )
    RETURN_NAMES = ("signal_opt", "bool")
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic"

    def doit(self, signal=None, any_input=None):
        if any_input is None:
            return (signal, False, )
        else:
            return (signal, True, )

```
