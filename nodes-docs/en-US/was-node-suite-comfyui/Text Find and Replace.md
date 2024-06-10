---
tags:
- Text
- TextReplacement
---

# Text Find and Replace
## Documentation
- Class name: `Text Find and Replace`
- Category: `WAS Suite/Text/Search`
- Output node: `False`

This node provides functionality for searching and replacing specified substrings within a given text. It allows users to dynamically alter text content by finding occurrences of a specified pattern and replacing them with a new string, which can be useful for text preprocessing, data cleaning, or content transformation tasks.
## Input types
### Required
- **`text`**
    - The text in which to search and replace substrings. It serves as the primary content for manipulation, where specified patterns will be identified and replaced.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`find`**
    - The substring to find within the input text. This parameter defines the pattern that will be searched for replacement.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`replace`**
    - The new substring that will replace each occurrence of the 'find' pattern in the input text. It defines the content that will be inserted in place of the identified patterns.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`result_text`**
    - Comfy dtype: `STRING`
    - The modified text after all occurrences of the 'find' pattern have been replaced with the 'replace' string.
    - Python dtype: `str`
- **`replacement_count_number`**
    - Comfy dtype: `NUMBER`
    - The total number of replacements made within the text.
    - Python dtype: `int`
- **`replacement_count_float`**
    - Comfy dtype: `FLOAT`
    - The total number of replacements made within the text, represented as a float.
    - Python dtype: `float`
- **`replacement_count_int`**
    - Comfy dtype: `INT`
    - The total number of replacements made within the text, represented as an integer.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ShowText|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ShowText|pysssss.md)



## Source code
```python
class WAS_Search_and_Replace:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "find": ("STRING", {"default": '', "multiline": False}),
                "replace": ("STRING", {"default": '', "multiline": False}),
            }
        }

    RETURN_TYPES = (TEXT_TYPE, "NUMBER", "FLOAT", "INT")
    RETURN_NAMES = ("result_text", "replacement_count_number", "replacement_count_float", "replacement_count_int")
    FUNCTION = "text_search_and_replace"

    CATEGORY = "WAS Suite/Text/Search"

    def text_search_and_replace(self, text, find, replace):
        modified_text, count = self.replace_substring(text, find, replace)
        return (modified_text, count, float(count), int(count))

    def replace_substring(self, text, find, replace):
        modified_text, count = re.subn(find, replace, text)
        return (modified_text, count)

```
