---
tags:
- DataTypeConversion
- Math
- MathematicalExpressions
---

# Evaluate Strings
## Documentation
- Class name: `Evaluate Strings`
- Category: `Efficiency Nodes/Simple Eval`
- Output node: `True`

The `Evaluate Strings` node is designed to dynamically evaluate Python expressions using string variables. It allows for the execution of simple arithmetic or functional expressions by substituting string values for variables within the expression. This node is particularly useful for generating or manipulating string data based on dynamic inputs.
## Input types
### Required
- **`python_expression`**
    - Specifies the Python expression to be evaluated. This expression can include arithmetic operations or functions, with variables that will be replaced by their corresponding string values provided in other inputs. The choice of expression directly influences the node's behavior and output, as it determines the operations performed on the input strings.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`print_to_console`**
    - Controls whether the evaluation result and variable values are printed to the console. This option is crucial for debugging or when visual confirmation of the process is needed, as it affects how the results are presented to the user.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
### Optional
- **`a`**
    - Represents the string value to substitute for variable 'a' in the Python expression. Altering this value changes the outcome of the expression, demonstrating its direct impact on the node's execution and results.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`b`**
    - Represents the string value to substitute for variable 'b' in the Python expression. This input plays a key role in the evaluation process by affecting the final result, based on how the expression utilizes this variable.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`c`**
    - Represents the string value to substitute for variable 'c' in the Python expression. The value of 'c' significantly influences the evaluation outcome, showcasing its importance in the node's overall functionality.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The result of the evaluated Python expression, converted to a string. This output reflects the culmination of the node's processing, providing a string representation of the evaluation.
    - Python dtype: `str`
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
