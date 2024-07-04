
# Documentation
- Class name: If ANY execute A else B
- Category: Logic
- Output node: False

这个节点根据布尔输入有条件地执行两个可能输出中的一个。它作为一个逻辑分支，允许在基于节点的执行环境中进行动态流程控制。

# Input types
## Required
- ANY
    - 一个布尔输入，用于决定执行两个可能输出中的哪一个。它的值决定了执行的流程，实现了节点操作中的条件逻辑。
    - Comfy dtype: *
    - Python dtype: bool
- IF_TRUE
    - 当ANY输入为True时要执行的输出。这个参数代表了条件满足时采取的行动。
    - Comfy dtype: *
    - Python dtype: Any
- IF_FALSE
    - 当ANY输入为False时要执行的输出。这个参数代表了条件不满足时采取的替代行动。
    - Comfy dtype: *
    - Python dtype: Any

# Output types
- ?
    - 执行IF_TRUE或IF_FALSE的结果，取决于ANY的评估。这个输出的确切性质是动态的，反映了节点的条件执行逻辑。
    - Comfy dtype: *
    - Python dtype: Any


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IfExecute:
    """
    This node executes IF_TRUE if ANY is True, otherwise it executes IF_FALSE.

    ANY can be any input, IF_TRUE and IF_FALSE can be any output.
    """

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ANY": (AlwaysEqualProxy("*"),),
                "IF_TRUE": (AlwaysEqualProxy("*"),),
                "IF_FALSE": (AlwaysEqualProxy("*"),),
            },
        }

    RETURN_TYPES = (AlwaysEqualProxy("*"),)

    RETURN_NAMES = "?"

    FUNCTION = "return_based_on_bool"

    CATEGORY = "Logic"

    def return_based_on_bool(self, ANY, IF_TRUE, IF_FALSE):
        return (IF_TRUE if ANY else IF_FALSE,)

```
