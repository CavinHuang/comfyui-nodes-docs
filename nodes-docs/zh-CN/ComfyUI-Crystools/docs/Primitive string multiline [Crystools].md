
# Documentation
- Class name: Primitive string multiline [Crystools]
- Category: crystools 🪛/Primitive
- Output node: False

该节点专门用于处理多行字符串输入，为用户在Crystools框架内处理较长文本段提供了一种直接的方法。它简化了管理多行字符串的复杂性，使用户能够更轻松地输入和处理跨越多行的文本数据。

# Input types
## Required
- string
    - 该节点的多行字符串输入。它允许用户输入跨越多行的文本，便于处理和处理较长的文本数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 该节点的输出是输入的多行字符串，可用于工作流中的进一步处理或利用。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CTextML:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": STRING_ML,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.PRIMITIVE.value
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("string",)

    FUNCTION = "execute"

    def execute(self, string=""):
        return (string,)

```
