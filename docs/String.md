
# Documentation
- Class name: String
- Category: Logic
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

String节点专门用于处理和返回字符串值，允许在基于逻辑的框架内进行基本的文本数据操作和处理。这个节点提供了一种简单而有效的方式来管理和操作文本信息，使其成为处理字符串相关任务的重要工具。

# Input types
## Required
- value
    - value参数是String节点的核心输入，它代表了需要被节点处理的字符串值。用户可以通过这个参数输入各种文本数据，以便进行后续的操作或评估。这个参数的灵活性使得String节点能够适应各种文本处理场景。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- STRING
    - 输出的STRING参数代表了经过String节点处理后的字符串值。根据节点的具体实现和提供的输入，输出可能是经过处理的新字符串，也可能是保持不变的原始字符串。这种灵活性使得String节点能够满足各种字符串处理需求。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class String:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"value": ("STRING", {"default": ""})},
        }

    RETURN_TYPES = ("STRING",)

    RETURN_NAMES = ("STRING",)

    FUNCTION = "execute"

    CATEGORY = "Logic"

    def execute(self, value):
        return (value,)

```
