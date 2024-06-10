---
tags:
- Text
---

# Regex Search and Match
## Documentation
- Class name: `SAIStringRegexSearchMatch`
- Category: `SALT/String/Process/Regex`
- Output node: `False`

This node performs a search operation within a given text using a specified regular expression pattern, returning all matches found. It's designed to facilitate complex text analysis and extraction tasks by leveraging the power of regex patterns.
## Input types
### Required
- **`text_input`**
    - The text in which to search for matches. This input allows for multiline text, enabling searches across complex documents or blocks of text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`regex_pattern`**
    - The regular expression pattern used to identify matches within the text input. This pattern defines the criteria for what constitutes a match, allowing for precise and flexible text analysis.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`matches`**
    - Comfy dtype: `LIST`
    - A list of all text segments within the input text that match the specified regular expression pattern.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SAIStringRegexSearchMatch:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Text to search..."}),
                "regex_pattern": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "\\b[a-zA-Z]{6}\\b"}),
            },
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("matches",)

    FUNCTION = "search_matches"
    CATEGORY = "SALT/String/Process/Regex"

    def search_matches(self, text_input, regex_pattern):
        matches = re.findall(regex_pattern, text_input)
        return (matches,)

```
