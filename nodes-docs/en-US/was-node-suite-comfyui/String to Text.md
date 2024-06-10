---
tags:
- String
- Text
---

# String to Text
## Documentation
- Class name: `String to Text`
- Category: `WAS Suite/Text/Operations`
- Output node: `False`

The String to Text node is designed to convert string data into a text format suitable for further processing or display. This node plays a crucial role in data preparation and transformation, ensuring that string inputs are correctly formatted as text for compatibility with subsequent nodes or operations within a workflow.
## Input types
### Required
- **`string`**
    - The string input parameter represents the raw string data that needs to be converted into text format. This parameter is essential for the node's operation as it directly influences the output text, ensuring that the input string is properly formatted and ready for further processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The string output parameter represents the converted text format of the input string. This output is crucial for downstream processing or display purposes, ensuring that the data is in the correct format for further use.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_String_To_Text:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {}),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "string_to_text"

    CATEGORY = "WAS Suite/Text/Operations"

    def string_to_text(self, string):
        return (string, )

```
