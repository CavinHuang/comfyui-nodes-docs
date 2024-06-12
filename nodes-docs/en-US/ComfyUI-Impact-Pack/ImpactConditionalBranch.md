---
tags:
- BooleanLogic
- ConditionalSelection
---

# ImpactConditionalBranch
## Documentation
- Class name: `ImpactConditionalBranch`
- Category: `ImpactPack/Logic`
- Output node: `False`

This node provides a conditional branching mechanism, allowing for the execution of different logic or values based on a given condition. It serves as a fundamental building block for creating dynamic and conditional workflows within the ImpactPack.
## Input types
### Required
- **`cond`**
    - The condition upon which the branching logic is based. It determines which of the two provided values (true or false branch) is returned by the node.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`tt_value`**
    - The value to be returned if the condition evaluates to True. This allows for dynamic selection of output based on the condition.
    - Comfy dtype: `*`
    - Python dtype: `object`
- **`ff_value`**
    - The value to be returned if the condition evaluates to False. This enables the node to selectively output values based on the evaluated condition.
    - Comfy dtype: `*`
    - Python dtype: `object`
## Output types
- **`*`**
    - Comfy dtype: `*`
    - The output of this node is either the tt_value or ff_value, depending on the evaluation of the condition.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactConditionalBranch:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "cond": ("BOOLEAN",),
                "tt_value": (any_typ,),
                "ff_value": (any_typ,),
            },
        }

    FUNCTION = "doit"
    CATEGORY = "ImpactPack/Logic"

    RETURN_TYPES = (any_typ, )

    def doit(self, cond, tt_value, ff_value):
        if cond:
            return (tt_value,)
        else:
            return (ff_value,)

```
