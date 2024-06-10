---
tags:
- Json
---

# Get Text From JSON
## Documentation
- Class name: `GetTextFromJson`
- Category: `Art Venture/Utils`
- Output node: `True`

This node is designed to extract a string value from a JSON object based on a specified key. It simplifies the process of retrieving textual information from structured JSON data, making it a valuable utility in data processing and manipulation tasks within the Art Venture/Utils category.
## Input types
### Required
- **`json`**
    - The JSON object from which a string value is to be extracted. This parameter is crucial for specifying the source data.
    - Comfy dtype: `JSON`
    - Python dtype: `Dict[str, Any]`
- **`key`**
    - The key corresponding to the value to be retrieved from the JSON object. This parameter allows for targeted extraction of data, enhancing the node's flexibility and utility.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The string value retrieved from the JSON object. This output is significant for downstream processing or display purposes.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilGetTextFromJson:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "json": ("JSON",),
                "key": ("STRING", {"default": ""}),
            }
        }

    RETURN_TYPES = ("STRING",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "get_string_from_json"
    OUTPUT_NODE = True

    def get_string_from_json(self, json: Dict, key: str):
        return (get_dict_attribute(json, key, ""),)

```
