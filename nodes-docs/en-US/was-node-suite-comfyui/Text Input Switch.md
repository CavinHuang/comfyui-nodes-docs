---
tags:
- ConditionalSelection
---

# Text Input Switch
## Documentation
- Class name: `Text Input Switch`
- Category: `WAS Suite/Logic`
- Output node: `False`

The Text Input Switch node is designed to selectively output one of two text inputs based on a boolean condition. It serves as a logical switch within text processing workflows, enabling conditional text flow and decision-making.
## Input types
### Required
- **`text_a`**
    - The first text input option. This input, along with 'text_b', forms the pair between which the node chooses based on the boolean condition.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_b`**
    - The second text input option. Together with 'text_a', it provides the alternative text input for the node to select from, contingent on the boolean condition.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`boolean`**
    - A boolean input that determines which text input ('text_a' or 'text_b') is passed through as the output. True will pass 'text_a', and False will pass 'text_b'.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Outputs the selected text input based on the boolean condition, effectively allowing conditional text routing within a workflow.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_Input_Switch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text_a": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_b": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "boolean": ("BOOLEAN", {"forceInput": True}),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "text_input_switch"

    CATEGORY = "WAS Suite/Logic"

    def text_input_switch(self, text_a, text_b, boolean=True):

        if boolean:
            return (text_a, )
        else:
            return (text_b, )

```
