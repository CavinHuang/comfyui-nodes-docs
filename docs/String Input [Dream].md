
# Documentation
- Class name: String Input [Dream]
- Category: ✨ Dream/🛠 utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

String Input节点旨在捕获并返回用户输入的单行字符串。作为一个大型系统中的基本界面组件，它以简单直观的方式收集文本数据，为用户提供了友好的交互体验。

# Input types
## Required
- value
    - value参数用于指定字符串输入的默认值，可以预先填充或留空。这个参数使得输入字段的初始配置变得灵活，通过提供可定制的起始点来满足各种使用场景的需求。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- STRING
    - 输出的STRING参数返回用户提供的字符串输入，实现了系统内部文本数据的传输。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamInputString:
    NODE_NAME = "String Input"
    ICON = "✍"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("STRING", {"default": "", "multiline": False}),
            },
        }

    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("STRING",)
    FUNCTION = "noop"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def noop(self, value):
        return (value,)

```
