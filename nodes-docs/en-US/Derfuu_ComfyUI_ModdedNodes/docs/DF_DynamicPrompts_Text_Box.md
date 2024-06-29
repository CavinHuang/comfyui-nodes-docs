---
tags:
- Text
---

# DynamicPrompts Text Box
## Documentation
- Class name: `DF_DynamicPrompts_Text_Box`
- Category: `Derfuu_Nodes/Variables`
- Output node: `False`

This node specializes in processing text input with dynamic prompts, allowing for a more interactive and flexible user input experience. It captures and returns the input text as is, supporting multiline and dynamically generated prompts.
## Input types
### Required
- **`Text`**
    - The 'Text' parameter accepts multiline text input with dynamic prompts, enhancing the node's ability to handle varied and contextually rich user inputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Outputs the input text unchanged, encapsulating it within a tuple to maintain consistency with the node's return type expectations.
    - Python dtype: `tuple[str]`
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
