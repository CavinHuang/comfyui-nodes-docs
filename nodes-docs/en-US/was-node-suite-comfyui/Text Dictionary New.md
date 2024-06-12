---
tags:
- Dictionary
---

# Text Dictionary New
## Documentation
- Class name: `Text Dictionary New`
- Category: `WAS Suite/Text`
- Output node: `False`

This node is designed to create a new dictionary from a given string representation of a dictionary. It focuses on converting textual representations of dictionaries into actual dictionary objects, enabling further manipulation or usage within the flow.
## Input types
### Required
- **`key_i`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`value_i`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
### Optional
## Output types
- **`dict`**
    - Comfy dtype: `DICT`
    - The output is a dictionary object created from the input string representation. This allows for the dynamic creation and utilization of dictionaries within the workflow.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Dictionary_New:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "key_1": ("STRING", {"default":"", "multiline": False}),
                "value_1": ("STRING", {"default":"", "multiline": False}),
            },
            "optional": {
                "key_2": ("STRING", {"default":"", "multiline": False}),
                "value_2": ("STRING", {"default":"", "multiline": False}),
                "key_3": ("STRING", {"default":"", "multiline": False}),
                "value_3": ("STRING", {"default":"", "multiline": False}),
                "key_4": ("STRING", {"default":"", "multiline": False}),
                "value_4": ("STRING", {"default":"", "multiline": False}),
                "key_5": ("STRING", {"default":"", "multiline": False}),
                "value_5": ("STRING", {"default":"", "multiline": False}),
            }
        }
    RETURN_TYPES = ("DICT",)
    FUNCTION = "dictionary_new"

    CATEGORY = "WAS Suite/Text"

    def append_to_dictionary(self, dictionary, key, value):
        if key is not None and key != "":
            dictionary[key] = value
        return dictionary

    def dictionary_new(self, key_1, value_1, key_2, value_2, key_3, value_3, key_4, value_4, key_5, value_5):
        dictionary = {}
        dictionary = self.append_to_dictionary(dictionary, key_1, value_1)
        dictionary = self.append_to_dictionary(dictionary, key_2, value_2)
        dictionary = self.append_to_dictionary(dictionary, key_3, value_3)
        dictionary = self.append_to_dictionary(dictionary, key_4, value_4)
        dictionary = self.append_to_dictionary(dictionary, key_5, value_5)
        return (dictionary, )

```
