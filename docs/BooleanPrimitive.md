
# Documentation
- Class name: BooleanPrimitive
- Category: Art Venture/Utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

BooleanPrimitive节点用于操作布尔值，它可以直接传递输入的布尔值，或者将其取反。作为一个基础工具节点，它在整个系统中发挥着重要作用，支持条件逻辑流程和二元决策过程。

# Input types
## Required
- value
    - 指定要操作的布尔值。这个参数是节点操作的核心，它决定了可能根据'reverse'参数进行取反的基础值。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- reverse
    - 决定是否对输入的布尔值进行取反。当设置为True时，输出将是输入的逻辑否定，从而实现对布尔逻辑流程的动态控制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- boolean
    - 对输入应用'reverse'逻辑后得到的布尔值结果。这个输出反映了原始值或其否定值，具体取决于'reverse'参数。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- string
    - 结果布尔值的字符串表示，提供了一个与布尔结果相对应的文本输出。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilBooleanPrimitive:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "value": ("BOOLEAN", {"default": False}),
                "reverse": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = ("BOOLEAN", "STRING")
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "boolean_primitive"

    def boolean_primitive(self, value: bool, reverse: bool):
        if reverse:
            value = not value

        return (value, str(value))

```
