# Documentation
- Class name: NumberCalculator
- Category: 😺dzNodes/LayerUtility/Data
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

对两个数值进行布尔运算并输出结果*。支持的运算包括==、!=、and、or、xor、not、min、max。

* 输入仅支持布尔值、整数和浮点数，强行接入其他数据将导致错误。数值之间的and运算输出较大的数，or运算输出较小的数。

# Input types
## Required

- a
    - 输入数值a。
    - Comfy dtype: BOOLEAN, INT, FLOAT
    - Python dtype: bool, int, float

- b
    - 输入数值b。
    - Comfy dtype: BOOLEAN, INT, FLOAT
    - Python dtype: bool, int, float

- operator
    - 运算符。
    - Comfy dtype: STRING
    - Python dtype: str
    - 可选值: "==", "!=", "and", "or", "xor", "not(a)", "min", "max"

# Output types

- output
    - 运算结果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class NumberCalculator:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(self):
        operator_list = ["+", "-", "*", "/", "**", "//", "%" ]
        return {"required": {
                "a": (any, {}),
                "b": (any, {}),
                "operator": (operator_list,),
            },}

    RETURN_TYPES = ("INT", "FLOAT",)
    RETURN_NAMES = ("int", "float",)
    FUNCTION = 'number_calculator_node'
    CATEGORY = '😺dzNodes/LayerUtility/Data'

    def number_calculator_node(self, a, b, operator):
        ret_value = 0
        if operator == "+":
            ret_value = a + b
        if operator == "-":
            ret_value = a - b
        if operator == "*":
            ret_value = a * b
        if operator == "/":
            ret_value = a / b
        if operator == "**":
            ret_value = a ** b
        if operator == "//":
            ret_value = a // b
        if operator == "%":
            ret_value = a % b

        return (int(ret_value), float(ret_value),)
```