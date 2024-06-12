---
tags:
- Concatenate
- Text
---

# 7x TXT Loader Concat
## Documentation
- Class name: `ttN text7BOX_concat`
- Category: `ttN/text`
- Output node: `False`

The node is designed to concatenate up to seven text inputs into a single string, using a specified delimiter to separate each text input. This functionality allows for flexible text manipulation and aggregation, catering to scenarios where multiple pieces of text need to be combined in a structured manner.
## Input types
### Required
- **`text1`**
    - The first text input to be concatenated. It plays a foundational role in the concatenation process, serving as the starting point for the combined output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text2`**
    - The second text input to be concatenated. It adds to the sequence of texts being merged, following the first input.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text3`**
    - The third text input to be concatenated. It continues the sequence of texts being merged, adding further content after the second input.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text4`**
    - The fourth text input to be concatenated. It extends the sequence of texts, adding additional content to the combined output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text5`**
    - The fifth text input to be concatenated. It further extends the sequence of texts, enriching the combined output with more content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text6`**
    - The sixth text input to be concatenated. It adds depth to the combined output, contributing additional content to the sequence.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text7`**
    - The seventh and final text input to be concatenated. It completes the sequence of texts, finalizing the content of the combined output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`delimiter`**
    - Specifies the character or sequence of characters used to separate each text input in the concatenated output. This parameter allows for customization of the output format.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text1`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text2`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text3`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text4`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text5`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text6`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text7`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`concat`**
    - Comfy dtype: `STRING`
    - The final concatenated string, composed of up to seven text inputs separated by the specified delimiter. This output represents the culmination of the concatenation process.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_text7BOX_concat:
    version = '1.0.0'
    def __init__(self):
        pass
    """
    Concatenate many strings
    """
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "text1": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text2": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text3": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text4": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text5": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text6": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text7": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "delimiter": ("STRING", {"default":",","multiline": False}),
                    },
                "hidden": {"ttNnodeVersion": ttN_text7BOX_concat.version},
        }

    RETURN_TYPES = ("STRING", "STRING", "STRING", "STRING", "STRING", "STRING", "STRING", "STRING",)
    RETURN_NAMES = ("text1", "text2", "text3", "text4", "text5", "text6", "text7", "concat",)
    FUNCTION = "conmeow"

    CATEGORY = "ttN/text"

    def conmeow(self, text1, text2, text3, text4, text5, text6, text7, delimiter):
        text1 = '' if text1 == 'undefined' else text1
        text2 = '' if text2 == 'undefined' else text2
        text3 = '' if text3 == 'undefined' else text3
        text4 = '' if text4 == 'undefined' else text4
        text5 = '' if text5 == 'undefined' else text5
        text6 = '' if text6 == 'undefined' else text6
        text7 = '' if text7 == 'undefined' else text7

        if delimiter == '\\n':
            delimiter = '\n'
            
        texts = [text1, text2, text3, text4, text5, text6, text7]        
        concat = delimiter.join(text for text in texts if text)
        return text1, text2, text3, text4, text5, text6, text7, concat

```
