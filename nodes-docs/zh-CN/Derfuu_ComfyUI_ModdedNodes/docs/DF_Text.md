
# Documentation
- Class name: DF_Text
- Category: Derfuu_Nodes/Variables
- Output node: False

DF_Text节点设计用于捕获和处理文本输入，允许在工作流程中操作和转换字符串。它强调处理文本数据，为以各种形式输入和输出文本提供了一个直观的接口。

# Input types
## Required
- Text
    - 此参数接受字符串输入，作为节点操作的主要数据。它在节点的文本处理和操作能力中扮演着至关重要的角色。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 输出处理后的文本作为字符串，反映节点内应用的任何转换或操作。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Text": Field.string(),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "get_value"
    CATEGORY = TREE_VARIABLE

    def get_value(self, Text: str) -> tuple[str]:
        return (Text,)

```
