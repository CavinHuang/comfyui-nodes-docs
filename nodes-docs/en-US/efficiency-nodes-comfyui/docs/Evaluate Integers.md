---
tags:
- DataTypeConversion
- Math
- MathematicalExpressions
---

# Evaluate Integers
## Documentation
- Class name: `Evaluate Integers`
- Category: `Efficiency Nodes/Simple Eval`
- Output node: `True`

The node 'Evaluate Integers' dynamically evaluates mathematical expressions involving integers, using variables 'a', 'b', and 'c' as inputs. It supports basic arithmetic operations and returns the result in multiple formats (integer, float, and string), optionally printing the outcome to the console.
## Input types
### Required
- **`python_expression`**
    - Specifies the mathematical expression to be evaluated. It can include variables 'a', 'b', and 'c' and supports basic arithmetic operations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`print_to_console`**
    - Controls whether the evaluation result is printed to the console. Useful for debugging or direct output visualization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`a`**
    - Represents the first integer variable that can be used in the python_expression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - Represents the second integer variable that can be used in the python_expression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`c`**
    - Represents the third integer variable that can be used in the python_expression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The evaluated result of the python_expression as an integer.
    - Python dtype: `int`
- **`float`**
    - Comfy dtype: `FLOAT`
    - The evaluated result of the python_expression as a float.
    - Python dtype: `float`
- **`string`**
    - Comfy dtype: `STRING`
    - The evaluated result of the python_expression as a string.
    - Python dtype: `str`
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
