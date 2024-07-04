
# Documentation
- Class name: Text Input [Dream]
- Category: ✨ Dream/🛠 utils
- Output node: False

Text Input [Dream]节点提供了一个用户界面组件，用于文本输入。它允许多行文本输入，并具有默认值设置。该节点旨在通过图形界面从用户收集文本数据。

# Input types
## Required
- value
    - 代表用户输入的文本值。它支持多行输入，默认从空字符串开始，便于收集用户生成的文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- STRING
    - 输出用户输入的文本，直接反映输入内容，不做任何修改。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamInputText:
    NODE_NAME = "Text Input"
    ICON = "✍"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("STRING", {"default": "", "multiline": True}),
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
