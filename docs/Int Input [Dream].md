
# Documentation
- Class name: Int Input [Dream]
- Category: ✨ Dream/🛠 utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Int Input节点为用户提供了一个简单直接的整数输入界面。它允许用户输入整数值，这在需要精确数值输入的场景中至关重要，比如设置依赖整数值的参数或配置。该节点的设计旨在简化数值数据的输入过程，确保系统能够接收和处理用户指定的准确整数值。

# Input types
## Required
- value
    - value参数代表用户需要输入的整数值。它对于定义系统将要处理的精确数值输入至关重要。用户通过这个参数可以直接指定所需的整数，为后续的操作或计算提供基础数据。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- INT
    - 输出用户输入的整数值，使其可以在系统的后续操作或计算中使用。这个输出为其他需要整数输入的节点或流程提供了便利，确保数据的连贯性和准确性。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamInputInt:
    NODE_NAME = "Int Input"
    ICON = "✍"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("INT", {"default": 0}),
            },
        }

    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("INT",)
    FUNCTION = "noop"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def noop(self, value):
        return (value,)

```
