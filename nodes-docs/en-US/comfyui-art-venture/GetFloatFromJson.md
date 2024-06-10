---
tags:
- Json
---

# Get Float From JSON
## Documentation
- Class name: `GetFloatFromJson`
- Category: `Art Venture/Utils`
- Output node: `True`

Extracts a float value from a JSON object based on a specified key. This node is designed to facilitate the retrieval of numeric data from structured JSON content, enhancing data processing and manipulation within the Art Venture utility suite.
## Input types
### Required
- **`json`**
    - The JSON object from which a float value is to be extracted. This parameter is crucial for specifying the source of the data.
    - Comfy dtype: `JSON`
    - Python dtype: `Dict[str, Any]`
- **`key`**
    - The key corresponding to the desired float value within the JSON object. This parameter determines the specific piece of data to be retrieved.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The extracted float value from the JSON object. This output is significant for further numerical analysis or operations.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilGetFloatFromJson:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "json": ("JSON",),
                "key": ("STRING", {"default": ""}),
            }
        }

    RETURN_TYPES = ("FLOAT",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "get_float_from_json"
    OUTPUT_NODE = True

    def get_float_from_json(self, json: Dict, key: str):
        return (get_dict_attribute(json, key, 0.0),)

```
