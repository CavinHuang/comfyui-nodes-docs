
# Documentation
- Class name: Evaluate Strings
- Category: Efficiency Nodes/Simple Eval
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Evaluate Strings节点旨在动态评估包含字符串变量的Python表达式。它允许通过将字符串值替换表达式中的变量来执行简单的算术或功能性表达式。该节点对于基于动态输入生成或操作字符串数据特别有用。

# Input types
## Required
- python_expression
    - 指定要评估的Python表达式。这个表达式可以包括算术运算或函数，其中的变量将被其他输入提供的相应字符串值替换。表达式的选择直接影响节点的行为和输出，因为它决定了对输入字符串执行的操作。
    - Comfy dtype: STRING
    - Python dtype: str
- print_to_console
    - 控制是否将评估结果和变量值打印到控制台。当需要调试或需要对过程进行视觉确认时，此选项至关重要，因为它影响结果呈现给用户的方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
## Optional
- a
    - 表示要在Python表达式中替换变量'a'的字符串值。更改此值会改变表达式的结果，展示了它对节点执行和结果的直接影响。
    - Comfy dtype: STRING
    - Python dtype: str
- b
    - 表示要在Python表达式中替换变量'b'的字符串值。这个输入在评估过程中起着关键作用，通过表达式如何利用这个变量来影响最终结果。
    - Comfy dtype: STRING
    - Python dtype: str
- c
    - 表示要在Python表达式中替换变量'c'的字符串值。'c'的值显著影响评估结果，展示了它在节点整体功能中的重要性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 评估后的Python表达式结果，转换为字符串。这个输出反映了节点处理的最终结果，提供了评估的字符串表示。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class TSC_EvaluateStrs:
        @classmethod
        def INPUT_TYPES(cls):
            return {"required": {
                "python_expression": ("STRING", {"default": "a + b + c", "multiline": False}),
                "print_to_console": (["False", "True"],)},
                "optional": {
                    "a": ("STRING", {"default": "Hello", "multiline": False}),
                    "b": ("STRING", {"default": " World", "multiline": False}),
                    "c": ("STRING", {"default": "!", "multiline": False}), }
            }

        RETURN_TYPES = ("STRING",)
        OUTPUT_NODE = True
        FUNCTION = "evaluate"
        CATEGORY = "Efficiency Nodes/Simple Eval"

        def evaluate(self, python_expression, print_to_console, a="", b="", c=""):
            variables = {'a': a, 'b': b, 'c': c}  # Define the variables for the expression

            functions = simpleeval.DEFAULT_FUNCTIONS.copy()
            functions.update({"len": len})  # Add the functions for the expression

            result = simpleeval.simple_eval(python_expression, names=variables, functions=functions)
            if print_to_console == "True":
                print(f"\n{error('Evaluate Strings:')}")
                print(f"\033[90ma = {a} \nb = {b} \nc = {c}\033[0m")
                print(f"{python_expression} = \033[92m" + str(result) + "\033[0m")
            return (str(result),)  # Convert result to a string before returning

```
