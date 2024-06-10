---
tags:
- Json
---

# Get Int From JSON
## Documentation
- Class name: `GetIntFromJson`
- Category: `Art Venture/Utils`
- Output node: `True`

This node is designed to extract an integer value from a JSON object based on a specified key. It simplifies the process of retrieving numeric data from structured JSON, making it accessible for further processing or decision-making tasks.
## Input types
### Required
- **`json`**
    - The JSON object from which the integer value is to be extracted. This parameter is crucial for specifying the source of the data.
    - Comfy dtype: `JSON`
    - Python dtype: `Dict[str, Any]`
- **`key`**
    - The key corresponding to the integer value within the JSON object. This parameter determines which piece of data is retrieved, making it essential for targeted data extraction.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The integer value retrieved from the JSON object based on the provided key. This output is significant for downstream tasks that require numeric input.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilGetIntFromJson:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "json": ("JSON",),
                "key": ("STRING", {"default": ""}),
            }
        }

    RETURN_TYPES = ("INT",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "get_int_from_json"
    OUTPUT_NODE = True

    def get_int_from_json(self, json: Dict, key: str):
        return (get_dict_attribute(json, key, 0),)

```
