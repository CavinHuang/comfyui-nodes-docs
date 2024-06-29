---
tags:
- Concatenate
- Text
---

# textConcat
## Documentation
- Class name: `ttN concat`
- Category: `ttN/text`
- Output node: `False`

The ttN_concat node is designed to concatenate three input strings using a specified delimiter, allowing for flexible string manipulation and combination within a text processing workflow.
## Input types
### Required
- **`text1`**
    - The first text string to be concatenated. It supports multiline input and dynamic prompts, enabling complex text inputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text2`**
    - The second text string to be concatenated, also supporting multiline input and dynamic prompts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text3`**
    - The third text string to be concatenated, further extending the node's capability to handle complex text combinations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`delimiter`**
    - A string used to separate the concatenated texts. It can be a single character or a sequence of characters, excluding newline by default.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`concat`**
    - Comfy dtype: `STRING`
    - The result of concatenating text1, text2, and text3 using the specified delimiter.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_concat:
    version = '1.0.0'
    def __init__(self):
        pass
    """
    Concatenate 2 strings
    """
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "text1": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text2": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text3": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "delimiter": ("STRING", {"default":",","multiline": False}),
                    },
                "hidden": {"ttNnodeVersion": ttN_concat.version},
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("concat",)
    FUNCTION = "conmeow"

    CATEGORY = "ttN/text"

    def conmeow(self, text1='', text2='', text3='', delimiter=''):
        text1 = '' if text1 == 'undefined' else text1
        text2 = '' if text2 == 'undefined' else text2
        text3 = '' if text3 == 'undefined' else text3

        if delimiter == '\\n':
            delimiter = '\n'

        concat = delimiter.join([text1, text2, text3])
       
        return (concat,)

```
