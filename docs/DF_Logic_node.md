
# Documentation
- Class name: DF_Logic_node
- Category: Derfuu_Nodes/Functions
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LogicNode节点执行基本逻辑运算，如比较操作（大于、小于、等于）和布尔运算（与、或、异或）。它通过评估条件并根据指定的逻辑确定结果，从而抽象地支持决策过程。

# Input types
## Required
- Operation
    - 指定要执行的逻辑运算，包括比较和布尔运算，决定了CompareValue_A和CompareValue_B之间应用的逻辑。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- CompareValue_A
    - 用于比较或逻辑运算的主要值。
    - Comfy dtype: *
    - Python dtype: object
## Optional
- CompareValue_B
    - 用于比较或逻辑运算的次要值，与CompareValue_A一起用于评估指定的Operation。
    - Comfy dtype: *
    - Python dtype: object
- OnTrue
    - 如果逻辑运算结果为真时返回的值。
    - Comfy dtype: *
    - Python dtype: object
- OnFalse
    - 如果逻辑运算结果为假时返回的值。
    - Comfy dtype: *
    - Python dtype: object

# Output types
- *
    - 逻辑运算的结果，可以是OnTrue或OnFalse值，具体取决于运算的结果。
    - Comfy dtype: *
    - Python dtype: object


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
