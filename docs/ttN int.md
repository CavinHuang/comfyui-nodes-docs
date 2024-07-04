
# Documentation
- Class name: ttN int
- Category: ttN/util
- Output node: False

该节点旨在处理整数值，提供功能将整数输入转换为多种格式，包括其原始整数形式、浮点表示和字符串表示。这种转换过程有助于在需要特定数据类型的不同场景中使用整数值。

# Input types
## Required
- int
    - 接受一个整数值作为输入，然后将其转换为多种格式。这个参数是节点操作的核心，能够将数字数据转换为适合各种应用需求的形式。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 返回原始整数输入，保留其整数格式的值。
    - Comfy dtype: INT
    - Python dtype: int
- float
    - 提供输入整数的浮点表示，适用于需要浮点数的应用场景。
    - Comfy dtype: FLOAT
    - Python dtype: float
- text
    - 将输入整数转换为字符串表示，便于在需要文本数据的场景中使用。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)



## Source code
```python
class ttN_INT:
    version = '1.0.0'
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "int": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                },
                "hidden": {"ttNnodeVersion": ttN_INT.version},
        }

    RETURN_TYPES = ("INT", "FLOAT", "STRING",)
    RETURN_NAMES = ("int", "float", "text",)
    FUNCTION = "convert"

    CATEGORY = "ttN/util"

    @staticmethod
    def convert(int):
        return int, float(int), str(int)

```
