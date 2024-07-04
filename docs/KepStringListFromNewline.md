
# Documentation
- Class name: KepStringListFromNewline
- Category: List Stuff
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

KepStringListFromNewline节点的功能是将多行文本字符串转换为字符串列表，列表中的每个元素对应原始字符串中的一行。此外，该节点还会计算生成的字符串数量。这个节点在处理需要按行分割的文本数据时特别有用，例如处理配置文件、日志文件或其他按行组织的文本内容。

# Input types
## Required
- Text
    - Text参数接受一个多行字符串作为输入。该字符串随后会根据换行符被分割成单独的字符串。这个参数对于确定输出列表的内容和结构至关重要。它允许用户输入任意长度的多行文本，每一行都将成为输出列表中的一个独立元素。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- Strings
    - 输出的Strings是一个字符串列表，其中每个元素代表输入多行字符串中的一行。这个列表保留了原始文本的行顺序，使得用户可以轻松地访问和处理文本的各个部分。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- Num Strings
    - Num Strings输出表示从输入的多行字符串中分割得到的字符串数量。这个数值等于输出列表Strings的长度，为后续处理提供了有用的元信息。
    - Comfy dtype: INT
    - Python dtype: List[int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringListFromNewline:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(self) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "Text": ("STRING", {"multiline": True}),
            },
        }

    RETURN_TYPES = ("STRING", "INT")
    RETURN_NAMES = ("Strings", "Num Strings")
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "to_string_list"

    CATEGORY = "List Stuff"

    def to_string_list(self, Text: str) -> Tuple[List[str], List[int]]:
        return Text.split("\n"), [len(Text.split("\n"))]

```
