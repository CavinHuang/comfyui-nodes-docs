---
tags:
- Json
---

# Get Object From JSON
## Documentation
- Class name: `GetObjectFromJson`
- Category: `Art Venture/Utils`
- Output node: `True`

The `GetObjectFromJson` node is designed to extract a specific object from a JSON structure based on a given key. It simplifies the process of navigating complex JSON data by allowing users to directly access elements of interest.
## Input types
### Required
- **`json`**
    - The JSON input from which an object is to be retrieved. This parameter is crucial for specifying the source JSON structure.
    - Comfy dtype: `JSON`
    - Python dtype: `Dict[str, Any]`
- **`key`**
    - The key corresponding to the value or object to be extracted from the JSON input. This parameter determines which part of the JSON structure is accessed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`json`**
    - Comfy dtype: `JSON`
    - The extracted object from the JSON input, corresponding to the specified key. This output facilitates direct access to specific elements within a JSON structure.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilGetObjectFromJson:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "json": ("JSON",),
                "key": ("STRING", {"default": ""}),
            }
        }

    RETURN_TYPES = ("JSON",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "get_objects_from_json"
    OUTPUT_NODE = True

    def get_objects_from_json(self, json: Dict, key: str):
        return (get_dict_attribute(json, key, {}),)

```
