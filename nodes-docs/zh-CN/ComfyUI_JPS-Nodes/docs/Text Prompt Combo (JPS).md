
# Documentation
- Class name: Text Prompt Combo (JPS)
- Category: JPS Nodes/Text
- Output node: False

Text Prompt Combo节点设计用于接受两个不同的文本输入，通常代表正面和负面的提示文本，并原样返回它们。该节点有助于组合或并置不同的文本输入，以便进行进一步的处理或生成任务。

# Input types
## Required
- pos
    - 代表正面提示文本，允许多行输入和动态提示生成。它在定义要生成或处理的内容的正面方面起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str
- neg
    - 代表负面提示文本，同样允许多行输入和动态提示生成。它对于指定内容生成或处理中要排除的负面方面或元素至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- pos
    - 返回输入中提供的正面提示文本，便于进一步的内容生成或处理任务。
    - Comfy dtype: STRING
    - Python dtype: str
- neg
    - 返回输入中提供的负面提示文本，使得在内容生成或处理中能够排除或否定某些元素。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Text_Prompt_Combo:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pos": ("STRING", {"multiline": True, "placeholder": "Prompt Text Positive", "dynamicPrompts": True}),
                "neg": ("STRING", {"multiline": True, "placeholder": "Prompt Text Negative", "dynamicPrompts": True}),
            },
        }
    
    RETURN_TYPES = ("STRING","STRING",)
    RETURN_NAMES = ("pos","neg",)
    FUNCTION = "give_values"

    CATEGORY="JPS Nodes/Text"

    def give_values(self,pos,neg):
        
        return(pos,neg,)

```
