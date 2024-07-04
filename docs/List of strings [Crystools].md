
# Documentation
- Class name: List of strings [Crystools]
- Category: crystools 🪛/List
- Output node: False
- Repo Ref: https://github.com/crystian/ComfyUI-Crystools

这个节点旨在将多个字符串输入聚合成一个列表或一个以指定分隔符连接的字符串。它在Crystools框架内便捷地处理和操作字符串集合，重点强调字符串数据的简易聚合和操作。

# Input types
## Optional
- string_i
    - 表示用于聚合的八个可能的字符串输入之一。每个输入都会贡献于列表的形成或连接字符串的输出，具体取决于是否存在分隔符。
    - Comfy dtype: STRING
    - Python dtype: str or None
- delimiter
    - 用于将提供的字符串输入连接成单个字符串的分隔符字符串（如果指定）。它的存在与否决定了输出格式（列表或连接字符串）。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- concatenated
    - 使用指定分隔符聚合输入字符串的连接字符串结果。
    - Comfy dtype: STRING
    - Python dtype: str
- list_string
    - 包含输入字符串的列表，展示了节点将字符串数据聚合成结构化集合的能力。
    - Comfy dtype: ListString
    - Python dtype: List[str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CListString:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            },
            "optional": {
                "string_1": STRING,
                "string_2": STRING,
                "string_3": STRING,
                "string_4": STRING,
                "string_5": STRING,
                "string_6": STRING,
                "string_7": STRING,
                "string_8": STRING,
                "delimiter": ("STRING", {"default": " "}),
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.LIST.value
    RETURN_TYPES = ("STRING", CLASSES.CLIST_STRING_TYPE.value,)
    RETURN_NAMES = (TEXTS.CONCAT.value, KEYS.LIST.value)
    OUTPUT_IS_LIST = (False, True, )

    FUNCTION = "execute"

    def execute(self,
                string_1=None,
                string_2=None,
                string_3=None,
                string_4=None,
                string_5=None,
                string_6=None,
                string_7=None,
                string_8=None,
                delimiter=""):

        list_str = []

        if string_1 is not None and string_1 != "":
            list_str.append(string_1)
        if string_2 is not None and string_2 != "":
            list_str.append(string_2)
        if string_3 is not None and string_3 != "":
            list_str.append(string_3)
        if string_4 is not None and string_4 != "":
            list_str.append(string_4)
        if string_5 is not None and string_5 != "":
            list_str.append(string_5)
        if string_6 is not None and string_6 != "":
            list_str.append(string_6)
        if string_7 is not None and string_7 != "":
            list_str.append(string_7)
        if string_8 is not None and string_8 != "":
            list_str.append(string_8)

        return delimiter.join(list_str), [list_str]

```
