---
tags:
- Prompt
---

# Text Prompt (JPS)
## Documentation
- Class name: `Text Prompt (JPS)`
- Category: `JPS Nodes/Text`
- Output node: `False`

The Text Prompt (JPS) node is designed to receive a textual input and return it unchanged. It serves as a straightforward mechanism for inputting and outputting text within a workflow, essentially acting as a pass-through for text data.
## Input types
### Required
- **`text`**
    - This parameter accepts a multiline string input, serving as the prompt text. It allows for dynamic prompts, enabling users to input text that can be dynamically processed or utilized within the node's workflow.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text`**
    - Comfy dtype: `STRING`
    - Outputs the same text string that was input, effectively acting as a pass-through for the text data.
    - Python dtype: `str`
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
