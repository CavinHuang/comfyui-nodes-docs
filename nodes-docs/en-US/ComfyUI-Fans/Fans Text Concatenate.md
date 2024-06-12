---
tags:
- Concatenate
- Text
---

# Fans Text Concatenate
## Documentation
- Class name: `Fans Text Concatenate`
- Category: `utils`
- Output node: `False`

This node is designed to concatenate multiple text inputs into a single string, optionally adding line breaks between each text segment. It allows for flexible text manipulation and aggregation, making it suitable for preparing text data for further processing or display.
## Input types
### Required
- **`linebreak_addition`**
    - Determines whether to add a line break between each concatenated text segment. A 'true' value inserts line breaks, while 'false' concatenates texts directly.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`prompt`**
    - An initial piece of text to start the concatenation process. It serves as the base to which other texts are appended.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_a`**
    - The first text to concatenate following the prompt, if provided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_b`**
    - The second text to concatenate following any previous texts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_c`**
    - The third text to concatenate, continuing the sequence of text aggregation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_d`**
    - The fourth text in the concatenation sequence.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_e`**
    - The fifth text to be concatenated, further extending the text string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_f`**
    - The sixth text to be added to the concatenated string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_g`**
    - The seventh text in the concatenation order.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_h`**
    - The eighth text to be concatenated, adding more content to the string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_i`**
    - The ninth text in the sequence, further extending the concatenated string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_j`**
    - The tenth and final text to be concatenated, completing the text aggregation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The final concatenated text string, composed of up to ten individual text inputs and optional line breaks.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FansTextConcatenate:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "linebreak_addition": (['false','true'], {"default":"false"} ),
            },
            "optional": {
                "prompt": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_a": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_b": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_c": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_d": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_e": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_f": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_g": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_h": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_i": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "text_j": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "text_concatenate"
    CATEGORY = "utils"

    def text_concatenate(self, prompt=None, text_a=None, text_b=None, text_c=None, text_d=None, text_e=None, text_f=None, text_g=None, text_h=None, text_i=None, text_j=None, linebreak_addition='false'):
        return_text = ''
        
        if prompt:
            return_text = prompt + ("\n" if linebreak_addition == 'true' else '')
        if text_a:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_a
        if text_b:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_b
        if text_c:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_c
        if text_d:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_d
        if text_e:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_e
        if text_f:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_f
        if text_g:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_g
        if text_h:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_h
        if text_i:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_i
        if text_j:
            return_text = return_text + ("\n" if linebreak_addition == 'true' else '') + text_j
        return (return_text, )

```
