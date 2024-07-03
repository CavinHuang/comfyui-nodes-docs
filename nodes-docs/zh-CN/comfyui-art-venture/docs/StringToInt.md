
# Documentation
- Class name: StringToInt
- Category: Art Venture/Utils
- Output node: False

StringToInt节点提供了一种简单直接的方法，将数字的字符串表示转换为整数形式。这个功能对于解析和利用以文本形式表示的数值数据非常有用。

# Input types
## Required
- string
    - string参数接收需要转换为整数的数字文本。这个输入对于转换过程至关重要，因为它决定了最终返回的数值。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- int
    - 输出的int是输入字符串的整数表示。这使得系统可以进行数值运算和处理。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilStringToInt:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"string": ("STRING", {"default": "0"})},
        }

    RETURN_TYPES = ("INT",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "string_to_int"

    def string_to_int(self, string: str):
        return (int(string),)

```
