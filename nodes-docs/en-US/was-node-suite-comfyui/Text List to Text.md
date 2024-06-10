---
tags:
- List
- Text
---

# Text List to Text
## Documentation
- Class name: `Text List to Text`
- Category: `WAS Suite/Text`
- Output node: `False`

The node is designed to concatenate a list of text strings into a single text string, using a specified delimiter. It can handle special cases, such as converting a literal newline delimiter into an actual newline character, to facilitate various text formatting needs.
## Input types
### Required
- **`delimiter`**
    - Specifies the string that will be used to separate each text item in the list. A special case is handled where a literal '\n' is converted to an actual newline character, allowing for multi-line text generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_list`**
    - The list of text strings to be concatenated. This input is crucial for the node's functionality, as it directly influences the composition and structure of the final merged text output, enabling a wide range of text processing and formatting applications.
    - Comfy dtype: `LIST`
    - Python dtype: `list[str]`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The resulting single text string formed by concatenating the input list of text strings, separated by the specified delimiter.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_List_to_Text:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "delimiter": ("STRING", {"default": ", "}),
                "text_list": ("LIST", {"forceInput": True}),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "text_list_to_text"

    CATEGORY = "WAS Suite/Text"

    def text_list_to_text(self, delimiter, text_list):
        # Handle special case where delimiter is "\n" (literal newline).
        if delimiter == "\\n":
            delimiter = "\n"

        merged_text = delimiter.join(text_list)

        return (merged_text,)

```
