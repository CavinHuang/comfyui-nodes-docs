
# Documentation
- Class name: Boolean To Int [Dream]
- Category: ✨ Dream/🛠 utils/⭆ switches
- Output node: False

"Boolean To Int"节点将布尔输入转换为整数输出，使条件逻辑可以在数值环境中应用。它提供了一种直接的方法来将真/假条件转化为数值表示，以便进一步处理或决策。

# Input types
## Required
- boolean
    - 决定转换的条件。如果为真，则返回'on_true'值；否则，选择'on_false'值。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- on_true
    - 当'boolean'输入为真时返回的整数值。这允许自定义真条件的数值表示。
    - Comfy dtype: INT
    - Python dtype: int
- on_false
    - 当'boolean'输入为假时返回的整数值。这使得假条件可以用特定的数值来表示。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result
    - 布尔值转整数的结果，根据布尔输入反映'on_true'或'on_false'的值。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamBoolToInt:
    NODE_NAME = "Boolean To Int"
    ICON = "⬖"
    CATEGORY = NodeCategories.UTILS_SWITCHES
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("result",)
    FUNCTION = "pick"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": ("BOOLEAN", {"default": False}),
                "on_true": ("INT", {"default": 1}),
                "on_false": ("INT", {"default": 0})
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
