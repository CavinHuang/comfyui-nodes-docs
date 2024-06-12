---
tags:
- Json
---

# Get Bool From JSON
## Documentation
- Class name: `GetBoolFromJson`
- Category: `Art Venture/Utils`
- Output node: `True`

This node is designed to extract a boolean value from a JSON object based on a specified key. It simplifies the process of retrieving boolean data from complex JSON structures, making it easier to use such data in decision-making processes or conditional flows within an application.
## Input types
### Required
- **`json`**
    - The JSON object from which a boolean value is to be extracted. This parameter is crucial for specifying the source of the data.
    - Comfy dtype: `JSON`
    - Python dtype: `Dict[str, Any]`
- **`key`**
    - The key corresponding to the boolean value within the JSON object. This parameter allows for targeted extraction of data, making the operation more efficient.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The boolean value retrieved from the JSON object based on the specified key. This output is essential for further logical or conditional operations.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilGetBoolFromJson:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "json": ("JSON",),
                "key": ("STRING", {"default": ""}),
            }
        }

    RETURN_TYPES = ("BOOLEAN",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "get_bool_from_json"
    OUTPUT_NODE = True

    def get_bool_from_json(self, json: Dict, key: str):
        return (get_dict_attribute(json, key, False),)

```
