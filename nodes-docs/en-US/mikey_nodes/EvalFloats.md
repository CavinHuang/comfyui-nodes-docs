---
tags:
- DataTypeConversion
- Math
---

# Eval Floats (Mikey)
## Documentation
- Class name: `EvalFloats`
- Category: `Mikey/Math`
- Output node: `False`

EvalFloats is designed to dynamically evaluate mathematical expressions provided by the user. It takes two float inputs and a formula as a string, processes the formula by substituting the inputs, and returns the result in multiple formats.
## Input types
### Required
- **`a`**
    - Represents the first float input for the mathematical formula. Its value is crucial as it directly influences the outcome of the evaluated expression.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`b`**
    - Serves as the second float input for the mathematical formula. Similar to 'a', its value significantly affects the result of the expression.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`formula`**
    - A string input representing the mathematical formula to be evaluated. This formula should include placeholders for 'a' and 'b' which are replaced by their respective input values during processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`result_float`**
    - Comfy dtype: `FLOAT`
    - The floating-point result of the evaluated mathematical formula.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class EvalFloats:
    # takes two float inputs and a text widget the user can type a formula for values a and b to calculate
    # then returns the result as the output
    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'a': ('FLOAT', {'default': 0.0}),
                             'b': ('FLOAT', {'default': 0.0}),
                             'formula': ('STRING', {'multiline': False, 'default': 'a + b'})}}

    RETURN_TYPES = ('FLOAT',)
    RETURN_NAMES = ('result_float','result_int','result_str')
    FUNCTION = 'process'
    CATEGORY = 'Mikey/Math'

    def process(self, a, b, formula):
        # eval formula
        formula = formula.replace('a', str(a))
        formula = formula.replace('b', str(b))
        result = eval(formula)
        return (result, int(result), str(result))

```
