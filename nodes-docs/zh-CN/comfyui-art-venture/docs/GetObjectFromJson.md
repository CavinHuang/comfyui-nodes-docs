
# Documentation
- Class name: GetObjectFromJson
- Category: Art Venture/Utils
- Output node: True

GetObjectFromJson节点旨在根据给定的键从JSON结构中提取特定对象。它通过允许用户直接访问感兴趣的元素，简化了导航复杂JSON数据的过程。

# Input types
## Required
- json
    - 要从中检索对象的JSON输入。该参数对于指定源JSON结构至关重要。
    - Comfy dtype: JSON
    - Python dtype: Dict[str, Any]
- key
    - 与要从JSON输入中提取的值或对象相对应的键。该参数决定了访问JSON结构的哪个部分。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- json
    - 从JSON输入中提取的对象，与指定的键相对应。此输出便于直接访问JSON结构中的特定元素。
    - Comfy dtype: JSON
    - Python dtype: Dict[str, Any]


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
