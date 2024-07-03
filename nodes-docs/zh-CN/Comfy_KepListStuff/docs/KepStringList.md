
# Documentation
- Class name: KepStringList
- Category: List Stuff
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

KepStringList节点旨在将多个字符串输入聚合并处理成列表格式，同时兼容必需和可选的文本输入。它有效地组合了各种文本元素，为在列表结构中处理和组织字符串数据提供了灵活的机制。

# Input types
## Required
- Text1
    - 必需的字符串输入，用于构成字符串列表。
    - Comfy dtype: STRING
    - Python dtype: str
- Text2
    - 另一个必需的字符串输入，也包含在字符串列表中。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- Text3
    - 可选的字符串输入，如果提供则可以包含在字符串列表中。
    - Comfy dtype: STRING
    - Python dtype: str
- Text4
    - 可选的字符串输入，如果提供则可以包含在字符串列表中。
    - Comfy dtype: STRING
    - Python dtype: str
- Text5
    - 可选的字符串输入，如果提供则可以包含在字符串列表中。
    - Comfy dtype: STRING
    - Python dtype: str
- Text6
    - 可选的字符串输入，如果提供则可以包含在字符串列表中。
    - Comfy dtype: STRING
    - Python dtype: str
- Text7
    - 可选的字符串输入，如果提供则可以包含在字符串列表中。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- Strings
    - 从输入文本聚合而成的字符串列表。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- Num Strings
    - 输出列表中包含的字符串数量，表示列表的长度。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringList:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(self) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "Text1": ("STRING", {}),
                "Text2": ("STRING", {}),
            },
            "optional": {
                "Text3": ("STRING", {}),
                "Text4": ("STRING", {}),
                "Text5": ("STRING", {}),
                "Text6": ("STRING", {}),
                "Text7": ("STRING", {}),
            },
        }

    RETURN_TYPES = ("STRING", "INT")
    RETURN_NAMES = ("Strings", "Num Strings")
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "to_string_list"

    CATEGORY = "List Stuff"

    def to_string_list(
            self,
            *args: str,
            **kwargs: str,
    ) -> Tuple[List[str], List[int]]:
        ret = []
        for arg in args:
            ret.append(arg)
        for arg in kwargs.values():
            if arg != "":
                ret.append(arg)

        return ret, [len(ret)]

```
