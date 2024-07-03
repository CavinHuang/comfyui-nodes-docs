
# Documentation
- Class name: GetIntFromJson
- Category: Art Venture/Utils
- Output node: True

GetIntFromJson节点旨在从JSON对象中提取特定键对应的整数值。它简化了从结构化JSON中检索数值数据的过程，使其可以用于进一步的处理或决策任务。

# Input types
## Required
- json
    - 需要提取整数值的JSON对象。这个参数对于指定数据来源至关重要。
    - Comfy dtype: JSON
    - Python dtype: Dict[str, Any]
- key
    - JSON对象中对应整数值的键。这个参数决定了要检索哪一条数据，对于目标数据的提取至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- int
    - 根据提供的键从JSON对象中检索到的整数值。这个输出对于需要数值输入的下游任务非常重要。
    - Comfy dtype: INT
    - Python dtype: int


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
