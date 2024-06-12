---
tags:
- String
- Text
---

# String Function 🐍
## Documentation
- Class name: `StringFunction|pysssss`
- Category: `utils`
- Output node: `True`

The String Function node provides utilities for manipulating strings, including appending, replacing, and optionally tidying tags within given text inputs. It abstracts complex string operations into a simple interface, catering to a variety of text processing needs.
## Input types
### Required
- **`action`**
    - Specifies the string manipulation action to perform, such as appending or replacing content in the text inputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[List[str], Dict]`
- **`tidy_tags`**
    - Determines whether to clean up HTML tags in the text inputs, offering options to either tidy them or leave them as is.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[List[str], Dict]`
- **`text_a`**
    - The primary text input for manipulation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_b`**
    - The secondary text input for manipulation, used in conjunction with 'text_a'.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`text_c`**
    - An optional third text input for manipulation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The result of the string manipulation, returned as a single string.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)



## Source code
```python
class StringFunction:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "action": (["append", "replace"], {}),
                "tidy_tags": (["yes", "no"], {}),
                "text_a": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                "text_b": ("STRING", {"multiline": True, "dynamicPrompts": False}),
            },
            "optional": {
                "text_c": ("STRING", {"multiline": True, "dynamicPrompts": False})
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "exec"
    CATEGORY = "utils"
    OUTPUT_NODE = True

    def exec(self, action, tidy_tags, text_a, text_b, text_c=""):
        # Converted inputs are sent as the string of 'undefined' if not connected
        if text_a == "undefined":
            text_a = ""
        if text_b == "undefined":
            text_b = ""
        if text_c == "undefined":
            text_c = ""
            
        tidy_tags = tidy_tags == "yes"
        out = ""
        if action == "append":
            out = (", " if tidy_tags else "").join(filter(None, [text_a, text_b, text_c]))
        else:
           if text_c is None:
               text_c = ""
           if text_b.startswith("/") and text_b.endswith("/"):
               regex = text_b[1:-1]
               out = re.sub(regex, text_c, text_a)
           else:
               out = text_a.replace(text_b, text_c)
        if tidy_tags:
            out = out.replace("  ", " ").replace(" ,", ",").replace(",,", ",").replace(",,", ",")
        return {"ui": {"text": (out,)}, "result": (out,)}

```
