
# Documentation
- Class name: DF_String_Replace
- Category: Derfuu_Nodes/Functions/String Operations
- Output node: False

DF_String_Replace节点设计用于通过将指定模式替换为新的子字符串来修改字符串。它支持严格替换和基于正则表达式的修改，允许灵活的字符串操作。

# Input types
## Required
- Text
    - 要处理的输入文本。此参数是替换操作的目标。
    - Comfy dtype: STRING
    - Python dtype: str
- Pattern
    - 在输入文本中搜索的模式。在"Strict"模式下可以是字面字符串，在"RegEx"模式下可以是正则表达式模式。
    - Comfy dtype: STRING
    - Python dtype: str
- Replace_With
    - 用于替换输入文本中找到的模式的子字符串。
    - Comfy dtype: STRING
    - Python dtype: str
- Mode
    - 确定模式匹配的方法："Strict"用于精确匹配，"RegEx"用于正则表达式匹配。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- TEXT
    - 指定模式被替换后的修改文本。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringReplace:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Text": Field.string(),
                "Pattern": Field.string(),
                "Replace_With": Field.string(),
                "Mode": Field.combo(["Strict", "RegEx"]),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("TEXT",)
    FUNCTION = "replace"
    CATEGORY = TREE_STRINGS

    def replace(self, Text, Pattern, Replace_With, Mode):
        out = Text
        match Mode:
            case "Strict":
                out = Text.replace(Pattern, Replace_With)
            case "RegEx":
                out = re.sub(Pattern, Replace_With, Text)
        return (out,)

```
