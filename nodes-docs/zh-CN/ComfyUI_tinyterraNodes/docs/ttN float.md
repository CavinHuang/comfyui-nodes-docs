
# Documentation
- Class name: ttN float
- Category: ttN/util
- Output node: False

ttN_FLOAT节点旨在将浮点数转换为不同的格式。它接受一个浮点数作为输入，并输出相同的值的浮点数、整数和字符串格式，从而实现多样化的数据操作和表示。

# Input types
## Required
- float
    - 需要转换的浮点数。这个输入至关重要，因为它决定了整数和字符串表示的基础值。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 原始输入的浮点数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- int
    - 输入浮点数的整数表示。
    - Comfy dtype: INT
    - Python dtype: int
- text
    - 输入浮点数的字符串表示。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_FLOAT:
    version = '1.0.0'
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "float": ("FLOAT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                },
                "hidden": {"ttNnodeVersion": ttN_FLOAT.version},
        }

    RETURN_TYPES = ("FLOAT", "INT", "STRING",)
    RETURN_NAMES = ("float", "int", "text",)
    FUNCTION = "convert"

    CATEGORY = "ttN/util"

    @staticmethod
    def convert(float):
        return float, int(float), str(float)

```
