
# Documentation
- Class name: Evaluate Floats
- Category: Efficiency Nodes/Simple Eval
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Evaluate Floats节点用于计算涉及浮点数的数学表达式，并将结果转换为多种格式（整数、浮点数和字符串）以供进一步使用。它支持通过变量进行动态输入，并可选择将评估结果打印到控制台以便调试或提供信息。

# Input types
## Required
- python_expression
    - 要评估的数学表达式，允许涉及浮点数的动态计算。它通过指定要执行的操作在确定节点输出中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- print_to_console
    - 指示是否应将评估结果打印到控制台的标志，有助于调试或提供操作结果的即时视觉反馈。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- a
    - 可选变量'a'，可在python_expression中用于动态评估。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b
    - 可选变量'b'，可在python_expression中用于动态评估。
    - Comfy dtype: FLOAT
    - Python dtype: float
- c
    - 可选变量'c'，可在python_expression中用于动态评估。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- int
    - 评估表达式结果的整数表示。
    - Comfy dtype: INT
    - Python dtype: int
- float
    - 评估表达式结果的浮点数表示。
    - Comfy dtype: FLOAT
    - Python dtype: float
- string
    - 评估表达式结果的字符串表示。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class TSC_EvaluateFloats:
        @classmethod
        def INPUT_TYPES(cls):
            return {"required": {
                "python_expression": ("STRING", {"default": "((a + b) - c) / 2", "multiline": False}),
                "print_to_console": (["False", "True"],), },
                "optional": {
                    "a": ("FLOAT", {"default": 0, "min": -sys.float_info.max, "max": sys.float_info.max, "step": 1}),
                    "b": ("FLOAT", {"default": 0, "min": -sys.float_info.max, "max": sys.float_info.max, "step": 1}),
                    "c": ("FLOAT", {"default": 0, "min": -sys.float_info.max, "max": sys.float_info.max, "step": 1}), },
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
                print(f"\n{error('Evaluate Floats:')}")
                print(f"\033[90m{{a = {a} , b = {b} , c = {c}}} \033[0m")
                print(f"{python_expression} = \033[92m INT: " + str(int_result) + " , FLOAT: " + str(
                    float_result) + ", STRING: " + string_result + "\033[0m")
            return (int_result, float_result, string_result,)

```
