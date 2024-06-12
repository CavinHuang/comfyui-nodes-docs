---
tags:
- Dictionary
---

# Text Dictionary Convert
## Documentation
- Class name: `Text Dictionary Convert`
- Category: `WAS Suite/Text`
- Output node: `False`

This node is designed to convert a string representation of a dictionary into an actual dictionary object. It is particularly useful in scenarios where dictionary data is received in text format and needs to be programmatically manipulated or accessed.
## Input types
### Required
- **`dictionary_text`**
    - The string representation of a dictionary that needs to be converted into a dictionary object. This parameter is crucial for the node's operation as it directly influences the conversion process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`dict`**
    - Comfy dtype: `DICT`
    - The converted dictionary object, allowing for programmatic access and manipulation of the data initially provided in string format.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Dictionary_Convert:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dictionary_text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)})
            },
        }
    RETURN_TYPES = ("DICT",)
    FUNCTION = "dictionary_convert"

    CATEGORY = "WAS Suite/Text"

    def dictionary_convert(self, dictionary_text):
        # using ast.literal_eval here because the string is not guaranteed to be json (using double quotes)
        # https://stackoverflow.com/questions/988228/convert-a-string-representation-of-a-dictionary-to-a-dictionary
        return (ast.literal_eval(dictionary_text), )

```
