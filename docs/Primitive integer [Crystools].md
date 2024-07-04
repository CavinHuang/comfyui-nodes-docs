
# Documentation
- Class name: Primitive integer [Crystools]
- Category: crystools 🪛/Primitive
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Primitive integer节点专门用于处理整数值，为在Crystools框架内操作整数提供了一种直接的方式。它封装了输入、处理和返回整数值所需的功能，简化了数值数据的处理过程。

# Input types
## Required
- int
    - 代表要由节点处理的整数值。这个输入对于执行节点功能至关重要，因为它直接影响输出的整数值。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 该节点的输出是输入的整数值，允许在Crystools框架内无缝集成和进行后续处理。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CInteger:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "int": INT,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.PRIMITIVE.value
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("int",)

    FUNCTION = "execute"

    def execute(self, int=True):
        return (int,)

```
