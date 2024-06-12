---
tags:
- Debugging
---

# Text to Console
## Documentation
- Class name: `Text to Console`
- Category: `WAS Suite/Debug`
- Output node: `True`

The 'Text to Console' node is designed for debugging purposes, allowing users to output text to the console with an optional label for easier identification. It serves as a simple yet effective tool for displaying text information during the development and testing of workflows.
## Input types
### Required
- **`text`**
    - The 'text' parameter is the primary content to be displayed on the console. It plays a crucial role in conveying information or data that needs to be debugged or reviewed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`label`**
    - The 'label' parameter allows for an optional categorization or identification of the text output. It enhances readability and organization of console outputs, especially when multiple texts are printed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Returns the original text that was input, facilitating potential further use or processing in subsequent nodes.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_to_Console:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "label": ("STRING", {"default": f'Text Output', "multiline": False}),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,)
    OUTPUT_NODE = True
    FUNCTION = "text_to_console"

    CATEGORY = "WAS Suite/Debug"

    def text_to_console(self, text, label):
        if label.strip() != '':
            cstr(f'\033[33m{label}\033[0m:\n{text}\n').msg.print()
        else:
            cstr(f"\033[33mText to Console\033[0m:\n{text}\n").msg.print()
        return (text, )

```
