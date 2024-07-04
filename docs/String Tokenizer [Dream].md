
# Documentation
- Class name: String Tokenizer [Dream]
- Category: ✨ Dream/🛠 utils
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

String Tokenizer节点旨在根据指定的分隔符将给定字符串分割成多个部分，并根据索引选择其中一个部分。这一功能对于解析和操作文本数据至关重要，能够从较大的文本体中提取出特定的感兴趣片段。

# Input types
## Required
- text
    - 要被分割的主要文本输入。这个参数对于定义待分词的文本至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- separator
    - 定义用于将文本分割成多个部分的字符或字符串。它在决定如何划分文本方面起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- selected
    - 根据索引确定返回分割后文本的哪一部分。这个参数对于选择特定的感兴趣片段至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- token
    - 按指定分隔符分割后选中的文本部分。这个输出对于文本处理和操作任务意义重大。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamStringTokenizer:
    NODE_NAME = "String Tokenizer"
    ICON = "🪙"
    OUTPUT_NODE = True
    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("token",)
    FUNCTION = "exec"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"default": "", "multiline": True}),
                "separator": ("STRING", {"default": ","}),
                "selected": ("INT", {"default": 0, "min": 0})
            },
        }

    def exec(self, text: str, separator: str, selected: int):
        if separator is None or separator == "":
            separator = " "
        parts = text.split(sep=separator)
        return (parts[abs(selected) % len(parts)].strip(),)

```
