
# Documentation
- Class name: Evaluate Integers
- Category: Efficiency Nodes/Simple Eval
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Evaluate Integers节点用于动态评估涉及整数的数学表达式，使用变量'a'、'b'和'c'作为输入。它支持基本的算术运算，并以多种格式（整数、浮点数和字符串）返回结果，还可以选择将结果打印到控制台。

# Input types
## Required
- python_expression
    - 指定要评估的数学表达式。可以包含变量'a'、'b'和'c'，并支持基本的算术运算。
    - Comfy dtype: STRING
    - Python dtype: str
- print_to_console
    - 控制是否将评估结果打印到控制台。对于调试或直接输出可视化非常有用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- a
    - 表示可在python_expression中使用的第一个整数变量。
    - Comfy dtype: INT
    - Python dtype: int
- b
    - 表示可在python_expression中使用的第二个整数变量。
    - Comfy dtype: INT
    - Python dtype: int
- c
    - 表示可在python_expression中使用的第三个整数变量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - python_expression的评估结果，以整数形式呈现。
    - Comfy dtype: INT
    - Python dtype: int
- float
    - python_expression的评估结果，以浮点数形式呈现。
    - Comfy dtype: FLOAT
    - Python dtype: float
- string
    - python_expression的评估结果，以字符串形式呈现。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [EmptyLatentImage](../../Comfy/Nodes/EmptyLatentImage.md)



## Source code
```python
    class TSC_EvaluateInts:
        @classmethod
        def INPUT_TYPES(cls):
            return {"required": {
                "python_expression": ("STRING", {"default": "((a + b) - c) / 2", "multiline": False}),
                "print_to_console": (["False", "True"],), },
                "optional": {
                    "a": ("INT", {"default": 0, "min": -48000, "max": 48000, "step": 1}),
                    "b": ("INT", {"default": 0, "min": -48000, "max": 48000, "step": 1}),
                    "c": ("INT", {"default": 0, "min": -48000, "max": 48000, "step": 1}), },
            }

        RETURN_TYPES = ("INT", "FLOAT", "STRING",)
        OUTPUT_NODE = True
        FUNCTION = "evaluate"
        CATEGORY = "Efficiency Nodes/Simple Eval"

        def evaluate(self, python_expression, print_to_console, a=0, b=0, c=0):
            # simple_eval doesn't require the result to be converted to a string
            result = simpleeval.simple_eval(python_expression, names={'a': a, 'b': b, 'c': c})
            int_result = int(result)
            float_result = float(result)
            string_result = str(result)
            if print_to_console == "True":
                print(f"\n{error('Evaluate Integers:')}")
                print(f"\033[90m{{a = {a} , b = {b} , c = {c}}} \033[0m")
                print(f"{python_expression} = \033[92m INT: " + str(int_result) + " , FLOAT: " + str(
                    float_result) + ", STRING: " + string_result + "\033[0m")
            return (int_result, float_result, string_result,)

```
