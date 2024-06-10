---
tags:
- Dictionary
---

# Text Dictionary Keys
## Documentation
- Class name: `Text Dictionary Keys`
- Category: `WAS Suite/Text`
- Output node: `False`

This node extracts the keys from a given dictionary, providing a straightforward way to identify all the unique identifiers within a dictionary structure.
## Input types
### Required
- **`dictionary`**
    - The dictionary from which keys are to be extracted. It is essential for identifying the unique identifiers within the provided dictionary structure.
    - Comfy dtype: `DICT`
    - Python dtype: `dict`
### Optional
## Output types
- **`list`**
    - Comfy dtype: `LIST`
    - A list of keys extracted from the provided dictionary.
    - Python dtype: `list`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Dictionary_Keys:
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
    RETURN_TYPES = ("LIST",)
    FUNCTION = "dictionary_keys"

    CATEGORY = "WAS Suite/Text"

    def dictionary_keys(self, dictionary):
        return (dictionary.keys(), )

```
