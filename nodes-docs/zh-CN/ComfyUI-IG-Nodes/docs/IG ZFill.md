
# Documentation
- Class name: `IG ZFill`
- Category: `🐓 IG Nodes/Primitives`
- Output node: `False`

IG ZFill节点提供了一种简单而有效的方法，可以在给定的整数值前添加前导零，直到它达到指定的长度。这个功能在格式化数字以确保一致的位数时非常重要，特别适用于数据展示和字符串操作任务。

# Input types
## Required
- value
    - 指定要用前导零填充的整数值。这个参数决定了将要进行转换的基础数字。
    - Comfy dtype: INT
    - Python dtype: int
- fill
    - 决定填充后输出字符串的总长度。这个参数设置了零填充字符串的目标长度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- string
    - 在将输入值用前导零填充到指定长度后得到的结果字符串。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_ZFill:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("INT", {"default": 0, "min": -sys.maxsize, "max": sys.maxsize, "step": 1}),
                "fill": ("INT", {"default": 6, "min": 0, "max": 8, "step": 1}),
            },
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "main"
    CATEGORY = TREE_PRIMITIVES

    def main(self, value, fill):
        return (f"{value}".zfill(fill),)

```
