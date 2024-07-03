
# Documentation
- Class name: Compare
- Category: Logic
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Compare节点旨在根据指定的比较操作（如相等、不等、大于、小于）评估两个输入之间的关系。它将比较逻辑抽象成一个简单的接口，使用户能够动态评估和处理其数据或变量的条件。

# Input types
## Required
- a
    - 第一个待比较的输入。它在决定比较操作结果中起着至关重要的作用。
    - Comfy dtype: *
    - Python dtype: Any
- b
    - 与第一个输入进行比较的第二个输入。它的值在评估指定比较条件时至关重要。
    - Comfy dtype: *
    - Python dtype: Any
- comparison
    - 指定在两个输入之间执行的比较类型（如'=='、'!='、'<'、'>'、'<='、'>='）。这决定了用于比较的逻辑，直接影响结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- B
    - 比较操作的结果，表示两个输入之间的指定条件是否成立。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Compare:
    """
    This nodes compares the two inputs and outputs the result of the comparison.
    """

    @classmethod
    def INPUT_TYPES(s):
        """
        Comparison node takes two inputs, a and b, and compares them.
        """
        s.compare_functions = list(COMPARE_FUNCTIONS.keys())
        return {
            "required": {
                "a": (AlwaysEqualProxy("*"), {"default": 0}),
                "b": (AlwaysEqualProxy("*"), {"default": 0}),
                "comparison": (s.compare_functions, {"default": "a == b"}),
            },
        }

    RETURN_TYPES = ("BOOLEAN",)

    RETURN_NAMES = "BOOLEAN"

    FUNCTION = "compare"

    CATEGORY = "Logic"

    def compare(self, a, b, comparison):
        """
        Compare two inputs and return the result of the comparison.

        Args:
            a (UNKNOWN): The first input.
            b (UNKNOWN): The second input.
            comparison (STRING): The comparison to perform. Can be one of "==", "!=", "<", ">", "<=", ">=".

        Returns:
            : The result of the comparison.
        """
        return (COMPARE_FUNCTIONS[comparison](a, b),)

```
