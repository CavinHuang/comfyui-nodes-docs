
# Documentation
- Class name: GetFloatFromJson
- Category: Art Venture/Utils
- Output node: True

GetFloatFromJson节点是一个实用工具，专门用于从JSON对象中提取浮点数值。它根据指定的键来定位并提取所需的浮点数据，从而简化了JSON结构化内容中数值信息的获取过程。这个节点作为Art Venture实用工具套件的一部分，在数据处理和操作方面发挥着重要作用。

# Input types
## Required
- json
    - 这是需要进行浮点数提取的JSON对象。它是数据源的主要来源，对整个提取过程至关重要。
    - Comfy dtype: JSON
    - Python dtype: Dict[str, Any]
- key
    - 这个参数指定了要在JSON对象中查找的键，用于定位所需的浮点数值。它决定了究竟要提取哪一个特定的数据项。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- float
    - 输出的是从JSON对象中提取出的浮点数值。这个结果对于后续的数值分析或运算具有重要意义。
    - Comfy dtype: FLOAT
    - Python dtype: float


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
