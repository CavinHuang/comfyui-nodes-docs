
# Documentation
- Class name: GetBoolFromJson
- Category: Art Venture/Utils
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

GetBoolFromJson节点用于从JSON对象中提取布尔值。它可以基于指定的键从复杂的JSON结构中轻松获取布尔数据，便于在应用程序的决策过程或条件流程中使用这些数据。

# Input types
## Required
- json
    - 需要提取布尔值的JSON对象。该参数对于指定数据源至关重要。
    - Comfy dtype: JSON
    - Python dtype: Dict[str, Any]
- key
    - JSON对象中对应布尔值的键。此参数允许有针对性地提取数据，提高了操作效率。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- boolean
    - 根据指定键从JSON对象中检索到的布尔值。这个输出对于后续的逻辑或条件操作至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool


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
