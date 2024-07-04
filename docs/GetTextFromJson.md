
# Documentation
- Class name: GetTextFromJson
- Category: Art Venture/Utils
- Output node: True

GetTextFromJson节点用于从JSON对象中提取指定键对应的字符串值。它简化了从结构化JSON数据中获取文本信息的过程，是Art Venture/Utils类别中数据处理和操作任务的重要工具。

# Input types
## Required
- json
    - 需要提取字符串值的JSON对象。这个参数对于指定源数据至关重要。
    - Comfy dtype: JSON
    - Python dtype: Dict[str, Any]
- key
    - 用于从JSON对象中检索值的键。这个参数允许有针对性地提取数据，提高了节点的灵活性和实用性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 从JSON对象中检索到的字符串值。这个输出对于后续处理或显示目的很重要。
    - Comfy dtype: STRING
    - Python dtype: str


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
