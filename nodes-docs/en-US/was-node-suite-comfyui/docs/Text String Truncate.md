---
tags:
- Text
---

# Text String Truncate
## Documentation
- Class name: `Text String Truncate`
- Category: `WAS Suite/Text/Operations`
- Output node: `False`

This node is designed to truncate a given string or multiple strings to a specified length, with options to truncate from the beginning or end, and by characters or words. It provides flexibility in text manipulation, allowing for precise control over the content length and format.
## Input types
### Required
- **`text`**
    - The primary text string to be truncated. This parameter is essential for defining the content that needs adjustment in length.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`truncate_by`**
    - Specifies the unit of truncation, either by characters or words, influencing how the text is shortened.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`truncate_from`**
    - Determines the direction from which the text will be truncated, either from the beginning or the end.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`truncate_to`**
    - Defines the length to which the text should be truncated. This can be a positive or negative integer, affecting the truncation behavior.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`text_b`**
    - An optional second text string to be truncated, allowing for simultaneous processing of multiple texts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_c`**
    - An optional third text string to be truncated, further extending the node's capability to handle multiple texts at once.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_d`**
    - An optional fourth text string to be truncated, enabling the node to process up to four texts concurrently.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The truncated versions of the input texts, adjusted according to the specified parameters. Each output represents a text string that has been truncated based on the provided criteria.
    - Python dtype: `Tuple[str, str, str, str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_String_Truncate:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"forceInput": True}),
                "truncate_by": (["characters", "words"],),
                "truncate_from": (["end", "beginning"],),
                "truncate_to": ("INT", {"default": 10, "min": -99999999, "max": 99999999, "step": 1}),
            },
            "optional": {
                "text_b": ("STRING", {"forceInput": True}),
                "text_c": ("STRING", {"forceInput": True}),
                "text_d": ("STRING", {"forceInput": True}),
            }
        }
    RETURN_TYPES = (TEXT_TYPE,TEXT_TYPE,TEXT_TYPE,TEXT_TYPE)
    FUNCTION = "truncate_string"

    CATEGORY = "WAS Suite/Text/Operations"

    def truncate_string(self, text, truncate_by, truncate_from, truncate_to, text_b='', text_c='', text_d=''):
        return (
            self.truncate(text, truncate_to, truncate_from, truncate_by),
            self.truncate(text_b, truncate_to, truncate_from, truncate_by),
            self.truncate(text_c, truncate_to, truncate_from, truncate_by),
            self.truncate(text_d, truncate_to, truncate_from, truncate_by),
        )

    def truncate(self, string, max_length, mode='end', truncate_by='characters'):
        if mode not in ['beginning', 'end']:
            cstr("Invalid mode. 'mode' must be either 'beginning' or 'end'.").error.print()
            mode = "end"
        if truncate_by not in ['characters', 'words']:
            cstr("Invalid truncate_by. 'truncate_by' must be either 'characters' or 'words'.").error.print()
        if truncate_by == 'characters':
            if mode == 'beginning':
                return string[:max_length] if max_length >= 0 else string[max_length:]
            else:
                return string[-max_length:] if max_length >= 0 else string[:max_length]
        words = string.split()
        if mode == 'beginning':
            return ' '.join(words[:max_length]) if max_length >= 0 else ' '.join(words[max_length:])
        else:
            return ' '.join(words[-max_length:]) if max_length >= 0 else ' '.join(words[:max_length])

```
