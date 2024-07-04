
# Documentation
- Class name: Text Prompt (JPS)
- Category: JPS Nodes/Text
- Output node: False

Text Prompt (JPS) 节点设计用于接收文本输入并原样返回。它在工作流程中充当输入和输出文本的简单机制，本质上是文本数据的直接传递。

# Input types
## Required
- text
    - 该参数接受多行字符串输入，作为提示文本。它允许动态提示，使用户能够输入可以在节点工作流程中动态处理或使用的文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text
    - 输出与输入相同的文本字符串，有效地充当文本数据的直接传递。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Text_Prompt:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text": ("STRING", {"multiline": True, "placeholder": "Prompt Text", "dynamicPrompts": True}),
            },
        }
    
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text",)
    FUNCTION = "text_prompt"

    CATEGORY="JPS Nodes/Text"

    def text_prompt(self,text):

        return(text,)

```
