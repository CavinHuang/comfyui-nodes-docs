
# Documentation
- Class name: Boolean To Float [Dream]
- Category: ✨ Dream/🛠 utils/⭆ switches
- Output node: False

Boolean To Float节点将布尔输入转换为浮点数输出，允许为真和假的布尔状态分配自定义的浮点值。该节点在数据流中促进条件逻辑和值转换，实现基于布尔条件的动态调整。

# Input types
## Required
- boolean
    - 决定执行的分支：如果为真，则返回'on_true'值；如果为假，则选择'on_false'值。这个布尔输入因此直接影响节点的输出。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- on_true
    - 指定当布尔输入为真时返回的浮点值，允许为真条件自定义输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- on_false
    - 定义当布尔输入为假时返回的浮点值，允许为假条件定制响应。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- result
    - 对应输入布尔条件的浮点值，由'on_true'或'on_false'参数决定。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamBoolToFloat:
    NODE_NAME = "Boolean To Float"
    ICON = "⬖"
    CATEGORY = NodeCategories.UTILS_SWITCHES
    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("result",)
    FUNCTION = "pick"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": ("BOOLEAN", {"default": False}),
                "on_true": ("FLOAT", {"default": 1.0}),
                "on_false": ("FLOAT", {"default": 0.0})
            }
        }

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(values)

    def pick(self, boolean, on_true, on_false):
        if boolean:
            return (on_true,)
        else:
            return (on_false,)

```
