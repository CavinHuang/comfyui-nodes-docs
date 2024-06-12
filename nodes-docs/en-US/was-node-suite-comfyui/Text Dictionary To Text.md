---
tags:
- Dictionary
---

# Text Dictionary To Text
## Documentation
- Class name: `Text Dictionary To Text`
- Category: `WAS Suite/Text`
- Output node: `False`

This node is designed to convert a dictionary into a text representation, facilitating the visualization or further processing of dictionary data in a textual format.
## Input types
### Required
- **`dictionary`**
    - The dictionary to be converted into text. This parameter is crucial as it provides the data structure that will be transformed into a textual representation.
    - Comfy dtype: `DICT`
    - Python dtype: `dict`
### Optional
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The textual representation of the input dictionary, enabling easy reading or processing of the dictionary's contents.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Dictionary_to_Text:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dictionary": ("DICT",)
            },
            "optional": {}
        }
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "dictionary_to_text"

    CATEGORY = "WAS Suite/Text"

    def dictionary_to_text(self, dictionary):
        return (str(dictionary), )

```
