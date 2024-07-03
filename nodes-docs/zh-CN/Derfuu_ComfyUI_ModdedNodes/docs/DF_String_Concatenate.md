
# Documentation
- Class name: DF_String_Concatenate
- Category: Derfuu_Nodes/Functions/String Operations
- Output node: False

DF_String_Concatenate 节点旨在将两个字符串连接起来，可选择添加分隔符。它通过将一个字符串追加到另一个字符串后面，并在中间插入指定的分隔符，从而创建一个新的字符串。这个节点便于进行字符串操作和格式化任务。

# Input types
## Required
- Prepend
    - 这个参数是要放在新连接字符串开头的字符串。它作为基础字符串，其他字符串将被追加到它后面，在连接过程中扮演着关键角色。
    - Comfy dtype: STRING
    - Python dtype: str
- Append
    - 这个参数是要追加到 'Prepend' 字符串末尾的字符串。它对于向基础字符串添加额外内容至关重要，为形成最终连接结果做出贡献。
    - Comfy dtype: STRING
    - Python dtype: str
- Delimiter
    - 这是一个可选的字符串，用于在连接结果中分隔 'Prepend' 和 'Append' 字符串。它定义了将插入两个字符串之间的字符或字符序列，影响输出的整体格式和可读性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- TEXT
    - 连接后的结果字符串。它代表了 'Prepend' 和 'Append' 字符串的组合输出，中间可能由 'Delimiter' 分隔，展示了该节点有效合并字符串的能力。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringConcat:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Prepend": Field.string(),
                "Append": Field.string(),
                "Delimiter": Field.string(default=", ")
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("TEXT",)
    FUNCTION = "concatenate"
    CATEGORY = TREE_STRINGS

    def concatenate(self, Prepend, Append, Delimiter):
        out = f"{Prepend}{Delimiter}{Append}"
        return (out,)

```
