---
tags:
- Text
---

# Regex Search and Replace
## Documentation
- Class name: `SAIStringRegexSearchReplace`
- Category: `SALT/String/Process/Regex`
- Output node: `False`

This node provides functionality for searching and replacing text in a given input string based on a specified regular expression pattern. It allows for the dynamic alteration of text content by identifying patterns and substituting them with a desired replacement string.
## Input types
### Required
- **`text_input`**
    - The input text where the search and replacement operation will be performed. It serves as the primary content for regex operations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`regex_pattern`**
    - The regular expression pattern used to identify the text segments within the input text that need to be replaced.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`replacement_text`**
    - The text that will replace the segments identified by the regex pattern in the input text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`replaced_text`**
    - Comfy dtype: `STRING`
    - The resulting text after the search and replace operations have been performed on the input text.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SAIStringRegexSearchReplace:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Text for replacement..."}),
                "regex_pattern": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "\\b\\w{5}\\b"}),
                "replacement_text": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Replacement text..."}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("replaced_text",)

    FUNCTION = "replace_matches"
    CATEGORY = "SALT/String/Process/Regex"

    def replace_matches(self, text_input, regex_pattern, replacement_text):
        replaced_text = re.sub(regex_pattern, replacement_text, text_input)
        return (replaced_text,)

```
