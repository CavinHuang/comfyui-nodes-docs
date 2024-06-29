---
tags:
- BooleanLogic
- ConditionalSelection
---

# ImpactLogicalOperators
## Documentation
- Class name: `ImpactLogicalOperators`
- Category: `ImpactPack/Logic`
- Output node: `False`

This node performs logical operations (AND, OR, XOR) on two boolean inputs, returning the result of the operation as a boolean value. It abstracts the complexity of logical decision-making processes into a simple interface, enabling conditional logic flows within a system.
## Input types
### Required
- **`operator`**
    - Specifies the logical operation to be performed: AND, OR, XOR. This determines how the two boolean inputs will be combined to produce the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`bool_a`**
    - The first boolean input for the logical operation. Acts as one of the operands in the logical expression.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`bool_b`**
    - The second boolean input for the logical operation. Acts as the other operand in the logical expression.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The result of the logical operation performed on the two input booleans.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactLogicalOperators:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "operator": (['and', 'or', 'xor'],),
                "bool_a": ("BOOLEAN", {"forceInput": True}),
                "bool_b": ("BOOLEAN", {"forceInput": True}),
            },
        }

    FUNCTION = "doit"
    CATEGORY = "ImpactPack/Logic"

    RETURN_TYPES = ("BOOLEAN", )

    def doit(self, operator, bool_a, bool_b):
        if operator == "and":
            return (bool_a and bool_b, )
        elif operator == "or":
            return (bool_a or bool_b, )
        else:
            return (bool_a != bool_b, )

```
