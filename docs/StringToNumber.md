
# Documentation
- Class name: StringToNumber
- Category: Art Venture/Utils
- Output node: False

StringToNumber节点将数字的字符串表示转换为其数值形式，并提供选项将结果四舍五入到最接近的整数、向下取整或向上取整。这一功能对于需要将文本形式的数值转换为精确数值以进行数学运算或比较的场景至关重要。

# Input types
## Required
- string
    - string参数接受一个表示数字的字符串输入，然后将其转换为数值形式。这种转换对于后续的数值运算或分析至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- rounding
    - rounding参数指定应用于转换后数字的舍入方法（最接近、向下取整或向上取整），影响最终的数值输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- int
    - 应用指定舍入方法后，转换后数字的整数部分。
    - Comfy dtype: INT
    - Python dtype: int
- float
    - 转换后数字的浮点表示，提供精确的数值。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilStringToNumber:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "string": ("STRING", {"default": "0"}),
                "rounding": (["round", "floor", "ceil"], {"default": "round"}),
            },
        }

    RETURN_TYPES = ("INT", "FLOAT")
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "string_to_numbers"

    def string_to_numbers(self, string: str, rounding):
        f = float(string)

        if rounding == "floor":
            return (int(np.floor(f)), f)
        elif rounding == "ceil":
            return (int(np.ceil(f)), f)
        else:
            return (int(round(f)), f)

```
