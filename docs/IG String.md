
# Documentation
- Class name: `IG String`
- Category: `🐓 IG Nodes/Primitives`
- Output node: `False`

IG String节点旨在处理字符串输入，允许用户在基于节点的处理环境中输入和传递字符串值。它作为需要文本数据操作的基本构建块。

# Input types
## Required
- value
    - 此参数接受一个字符串值，作为节点的主要输入。它使节点能够处理并原样传递输入的字符串，不做任何修改。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 输出未经改变的输入字符串值，便于在后续节点或操作中使用。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_String:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("STRING",{}),
            },
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "main"
    CATEGORY = TREE_PRIMITIVES

    def main(self, value):
        return (value,)

```
