---
tags:
- Text
- TextReplacement
---

# Text Find and Replace Input
## Documentation
- Class name: `Text Find and Replace Input`
- Category: `WAS Suite/Text/Search`
- Output node: `False`

This node is designed to perform a search and replace operation on a given text. It searches for specified substrings within the input text and replaces them with a provided replacement string, effectively modifying the original text based on the user's criteria.
## Input types
### Required
- **`text`**
    - The text in which the search and replace operation will be performed. It serves as the primary content for modification.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`find`**
    - The substring to be searched for within the input text. This parameter dictates what part of the text is targeted for replacement.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`replace`**
    - The string that will replace occurrences of the 'find' substring within the input text. It defines the new content that will substitute the targeted parts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`result_text`**
    - Comfy dtype: `STRING`
    - The modified text after the search and replace operation has been applied.
    - Python dtype: `str`
- **`replacement_count_number`**
    - Comfy dtype: `NUMBER`
    - The total number of replacements made during the operation, represented as a number.
    - Python dtype: `int`
- **`replacement_count_float`**
    - Comfy dtype: `FLOAT`
    - The total number of replacements made, represented as a float.
    - Python dtype: `float`
- **`replacement_count_int`**
    - Comfy dtype: `INT`
    - The total number of replacements made, represented as an integer.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Search_and_Replace_Input:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "find": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "replace": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
            }
        }

    RETURN_TYPES = (TEXT_TYPE, "NUMBER", "FLOAT", "INT")
    RETURN_NAMES = ("result_text", "replacement_count_number", "replacement_count_float", "replacement_count_int")
    FUNCTION = "text_search_and_replace"

    CATEGORY = "WAS Suite/Text/Search"

    def text_search_and_replace(self, text, find, replace):
        count = 0
        new_text = text
        while find in new_text:
            new_text = new_text.replace(find, replace, 1)
            count += 1
        return (new_text, count, float(count), int(count))

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

```
