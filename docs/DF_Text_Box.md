
# Documentation
- Class name: DF_Text_Box
- Category: Derfuu_Nodes/Variables
- Output node: False

DF_Text_Box节点设计用于捕获和处理多行文本输入，允许在基于节点的编程环境中处理扩展的文本数据。

# Input types
## Required
- Text
    - 该参数接受多行文本输入，使节点能够处理和操作跨越多行的文本数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 以字符串形式输出处理后的文本，保持其多行格式。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MultilineStringNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Text": Field.string(multiline=True),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "get_value"
    CATEGORY = TREE_VARIABLE

    def get_value(self, Text: str) -> tuple[str]:
        return (Text,)

```
