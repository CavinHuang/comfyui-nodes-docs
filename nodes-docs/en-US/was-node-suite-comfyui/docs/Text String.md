---
tags:
- String
- Text
---

# Text String
## Documentation
- Class name: `Text String`
- Category: `WAS Suite/Text`
- Output node: `False`

The `WAS_Text_String` node is designed to process and manipulate text strings, allowing for the parsing and optional combination of up to four separate text inputs into parsed text outputs. This node is part of the WAS Suite's text manipulation toolkit, focusing on the transformation and interpretation of textual data.
## Input types
### Required
- **`text`**
    - The primary text input for processing. It undergoes token parsing to transform the text based on predefined tokens.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`text_b`**
    - An optional secondary text input for processing alongside the primary text. It also undergoes token parsing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_c`**
    - An optional third text input for processing. Similar to the other inputs, it is parsed for tokens.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_d`**
    - An optional fourth text input for processing. It undergoes token parsing like the other inputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The processed versions of the primary and optional text inputs after token parsing, returned as separate outputs.
    - Python dtype: `Tuple[str, str, str, str]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Text Concatenate](../../was-node-suite-comfyui/Nodes/Text Concatenate.md)



## Source code
```python
class WAS_Text_String:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"default": '', "multiline": False}),
            },
            "optional": {
                "text_b": ("STRING", {"default": '', "multiline": False}),
                "text_c": ("STRING", {"default": '', "multiline": False}),
                "text_d": ("STRING", {"default": '', "multiline": False}),
            }
        }
    RETURN_TYPES = (TEXT_TYPE,TEXT_TYPE,TEXT_TYPE,TEXT_TYPE)
    FUNCTION = "text_string"

    CATEGORY = "WAS Suite/Text"

    def text_string(self, text='', text_b='', text_c='', text_d=''):

        tokens = TextTokens()

        text = tokens.parseTokens(text)
        text_b = tokens.parseTokens(text_b)
        text_c = tokens.parseTokens(text_c)
        text_d = tokens.parseTokens(text_d)

        return (text, text_b, text_c, text_d)

```
