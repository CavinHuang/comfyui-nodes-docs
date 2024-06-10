---
tags:
- Text
- TextReplacement
---

# String Replace
## Documentation
- Class name: `DF_String_Replace`
- Category: `Derfuu_Nodes/Functions/String Operations`
- Output node: `False`

The `DF_String_Replace` node is designed to modify strings by replacing specified patterns with new substrings. It supports both strict replacements and regular expression-based modifications, allowing for flexible string manipulation.
## Input types
### Required
- **`Text`**
    - The input text to be processed. This parameter is the target for the replacement operation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Pattern`**
    - The pattern to search for within the input text. This can be a literal string in 'Strict' mode or a regular expression pattern in 'RegEx' mode.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Replace_With`**
    - The substring to replace the found pattern with in the input text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Mode`**
    - Determines the method of pattern matching: 'Strict' for exact matches or 'RegEx' for regular expression matching.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`TEXT`**
    - Comfy dtype: `STRING`
    - The modified text after the specified patterns have been replaced.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringReplace:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Text": Field.string(),
                "Pattern": Field.string(),
                "Replace_With": Field.string(),
                "Mode": Field.combo(["Strict", "RegEx"]),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("TEXT",)
    FUNCTION = "replace"
    CATEGORY = TREE_STRINGS

    def replace(self, Text, Pattern, Replace_With, Mode):
        out = Text
        match Mode:
            case "Strict":
                out = Text.replace(Pattern, Replace_With)
            case "RegEx":
                out = re.sub(Pattern, Replace_With, Text)
        return (out,)

```
