
# Documentation
- Class name: DF_DynamicPrompts_Text_Box
- Category: Derfuu_Nodes/Variables
- Output node: False

本节点专门用于处理带有动态提示的文本输入，为用户提供更具交互性和灵活性的输入体验。它可以捕获并原样返回输入的文本，支持多行输入和动态生成的提示。

# Input types
## Required
- Text
    - "Text"参数接受带有动态提示的多行文本输入，增强了节点处理多样化和富有上下文的用户输入的能力。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 输出未经改变的输入文本，将其封装在一个元组中，以满足节点返回类型的预期。
    - Comfy dtype: STRING
    - Python dtype: tuple[str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AsDynamicPromptsStringNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Text": Field.string(multiline=True, dynamicPrompts=True),
            },
        }


    RETURN_TYPES = ("STRING",)
    FUNCTION = "get_value"
    CATEGORY = TREE_VARIABLE

    def get_value(self, Text: str) -> tuple[str]:
        return (Text,)

```
