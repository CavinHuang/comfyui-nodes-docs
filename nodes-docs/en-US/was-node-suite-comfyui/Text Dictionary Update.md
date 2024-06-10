---
tags:
- Dictionary
---

# Text Dictionary Update
## Documentation
- Class name: `Text Dictionary Update`
- Category: `WAS Suite/Text`
- Output node: `False`

This node is designed to merge multiple dictionaries into a single dictionary, allowing for the combination of key-value pairs from each input dictionary. It's particularly useful in scenarios where consolidating data from various sources into a unified format is required.
## Input types
### Required
- **`dictionary_a`**
    - The primary dictionary to be updated. Acts as the base for the merge operation.
    - Comfy dtype: `DICT`
    - Python dtype: `Dict`
- **`dictionary_b`**
    - The second dictionary whose key-value pairs are added to the primary dictionary.
    - Comfy dtype: `DICT`
    - Python dtype: `Dict`
### Optional
- **`dictionary_c`**
    - An optional third dictionary to merge. Its key-value pairs are added to the resulting dictionary if provided.
    - Comfy dtype: `DICT`
    - Python dtype: `Dict`
- **`dictionary_d`**
    - An optional fourth dictionary to merge. Its key-value pairs are added to the resulting dictionary if provided.
    - Comfy dtype: `DICT`
    - Python dtype: `Dict`
## Output types
- **`dict`**
    - Comfy dtype: `DICT`
    - The resulting dictionary after merging the input dictionaries. Contains the combined key-value pairs from all provided dictionaries.
    - Python dtype: `Dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Dictionary_Update:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dictionary_a": ("DICT", ),
                "dictionary_b": ("DICT", ),
            },
            "optional": {
                "dictionary_c": ("DICT", ),
                "dictionary_d": ("DICT", ),
            }
        }
    RETURN_TYPES = ("DICT",)
    FUNCTION = "dictionary_update"

    CATEGORY = "WAS Suite/Text"

    def dictionary_update(self, dictionary_a, dictionary_b, dictionary_c=None, dictionary_d=None):
        return_dictionary = {**dictionary_a, **dictionary_b}
        if dictionary_c is not None:
            return_dictionary = {**return_dictionary, **dictionary_c}
        if dictionary_d is not None:
            return_dictionary = {**return_dictionary, **dictionary_d}
        return (return_dictionary, )

```
