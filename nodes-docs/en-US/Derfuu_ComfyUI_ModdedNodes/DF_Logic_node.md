---
tags:
- BooleanLogic
- ConditionalSelection
---

# Logic node
## Documentation
- Class name: `DF_Logic_node`
- Category: `Derfuu_Nodes/Functions`
- Output node: `False`

The LogicNode facilitates the execution of basic logical operations such as comparisons (greater than, less than, equal to) and boolean operations (AND, OR, XOR) between input values. It abstractly supports decision-making processes by evaluating conditions and determining outcomes based on the specified logic.
## Input types
### Required
- **`Operation`**
    - Specifies the logical operation to be performed, including comparisons and boolean operations, which dictates the logic applied between CompareValue_A and CompareValue_B.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`CompareValue_A`**
    - The primary value for comparison or logical operation.
    - Comfy dtype: `*`
    - Python dtype: `object`
### Optional
- **`CompareValue_B`**
    - The secondary value for comparison or logical operation, used in conjunction with CompareValue_A to evaluate the specified Operation.
    - Comfy dtype: `*`
    - Python dtype: `object`
- **`OnTrue`**
    - The value to return if the logical operation evaluates to true.
    - Comfy dtype: `*`
    - Python dtype: `object`
- **`OnFalse`**
    - The value to return if the logical operation evaluates to false.
    - Comfy dtype: `*`
    - Python dtype: `object`
## Output types
- **`*`**
    - Comfy dtype: `*`
    - The result of the logical operation, which can be either the OnTrue or OnFalse value based on the operation's outcome.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LogicNode:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls) -> dict:
        return {
            "required": {
                "Operation": Field.combo([
                    "A > B",
                    "A < B",
                    "A = B",
                    "A AND B",
                    "A OR B",
                    "A XOR B",
                ]),
                "CompareValue_A": Field.any(),
            },
            "optional": {
                "CompareValue_B": Field.any(),
                "OnTrue": Field.any(),
                "OnFalse": Field.any()
            }
        }

    RETURN_TYPES = (ANY,)
    CATEGORY = TREE_FUNCTIONS
    FUNCTION = "do_logic"

    def do_logic(self, CompareValue_A, CompareValue_B = False, OnTrue = False, OnFalse = False, Operation: str = "A AND B") -> tuple:
        match Operation:
            case "A > B":
                value = OnTrue if CompareValue_A > CompareValue_B else OnFalse
            case "A < B":
                value = OnTrue if CompareValue_A < CompareValue_B else OnFalse
            case "A = B":
                value = OnTrue if CompareValue_A == CompareValue_B else OnFalse
            case "A AND B":
                value = OnTrue if CompareValue_A and CompareValue_B else OnFalse
            case "A OR B":
                value = OnTrue if CompareValue_A or CompareValue_B else OnFalse
            case "A XOR B":
                value = OnTrue if not (CompareValue_A and CompareValue_B) and (CompareValue_A or CompareValue_B) else OnFalse
            case _:
                value = None
        return (value, )

```
