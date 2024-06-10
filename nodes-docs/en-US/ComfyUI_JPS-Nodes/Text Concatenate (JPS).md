---
tags:
- Concatenate
- Text
---

# Text Concatenate (JPS)
## Documentation
- Class name: `Text Concatenate (JPS)`
- Category: `JPS Nodes/Text`
- Output node: `False`

The Text Concatenate node is designed to merge multiple text inputs into a single string, using a specified delimiter to separate the texts. This functionality is essential for creating concatenated strings from various inputs, allowing for flexible text manipulation and aggregation.
## Input types
### Required
- **`delimiter`**
    - Specifies the type of delimiter to use between text inputs, such as a space or comma, influencing how the concatenated text is formatted.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`text1`**
    - The first text input to be concatenated.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text2`**
    - The second text input to be concatenated, appended to the first input with the specified delimiter in between.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text3`**
    - The third text input to be concatenated, appended to the previous inputs with the specified delimiter in between.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text4`**
    - The fourth text input to be concatenated, appended to the previous inputs with the specified delimiter in between.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text5`**
    - The fifth text input to be concatenated, appended to the previous inputs with the specified delimiter in between.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text`**
    - Comfy dtype: `STRING`
    - The resulting string after concatenating the given text inputs with the specified delimiter.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Text_Concatenate:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "delimiter": (["none", "space", "comma"],),
            },
            "optional": {
                "text1": ("STRING", {"forceInput": True}),
                "text2": ("STRING", {"forceInput": True}),      
                "text3": ("STRING", {"forceInput": True}),      
                "text4": ("STRING", {"forceInput": True}),      
                "text5": ("STRING", {"forceInput": True}),       
            }
        }
    
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text",)
    FUNCTION = "get_contxt"
    CATEGORY = "JPS Nodes/Text"

    def get_contxt(self, delimiter, text1=None, text2=None, text3=None, text4=None, text5=None):
        needdelim = False
        delim = ""
        if delimiter == "space":
            delim = " "
        if delimiter == "comma":
            delim = ", "

        concatenated = ""

        if text1:
            concatenated = text1
            needdelim = True
        
        if text2:
            if needdelim:
                concatenated += delim
            concatenated += text2
            needdelim = True
        
        if text3:
            if needdelim:
                concatenated += delim
            concatenated += text3
            needdelim = True

        if text4:
            if needdelim:
                concatenated += delim
            concatenated += text4
            needdelim = True

        if text5:
            if needdelim:
                concatenated += delim
            concatenated += text5
            needdelim = True

        return (concatenated,)

```
