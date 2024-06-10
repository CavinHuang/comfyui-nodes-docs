---
tags:
- Dictionary
---

# Text Dictionary Get
## Documentation
- Class name: `Text Dictionary Get`
- Category: `WAS Suite/Text`
- Output node: `False`

This node retrieves a value associated with a specified key from a given dictionary. If the key does not exist, it returns a default value, allowing for flexible and error-tolerant data retrieval.
## Input types
### Required
- **`dictionary`**
    - The dictionary from which a value is to be retrieved. It is central to the node's operation, determining the source of data.
    - Comfy dtype: `DICT`
    - Python dtype: `Dict[str, Any]`
- **`key`**
    - The key for which the value is sought in the dictionary. It specifies the exact data point to be retrieved.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`default_value`**
    - An optional default value to return if the specified key is not found in the dictionary. This parameter enhances the node's flexibility and error tolerance.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The value retrieved from the dictionary based on the specified key, or the default value if the key is not found. It encapsulates the result of the data retrieval operation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Dictionary_Get:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dictionary": ("DICT", ),
                "key": ("STRING", {"default":"", "multiline": False}),
            },
            "optional": {
                "default_value": ("STRING", {"default":"", "multiline": False}),
            }
        }
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "dictionary_get"

    CATEGORY = "WAS Suite/Text"

    def dictionary_get(self, dictionary, key, default_value=""):
        return (str(dictionary.get(key, default_value)), )

```
