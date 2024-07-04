
# Documentation
- Class name: `Calculation [Dream]`
- Category: `✨ Dream/🛠 utils`
- Output node: `False`

Calculation节点旨在根据用户定义的变量和常量动态评估数学表达式。它允许灵活地计算结果，通过解释和执行给定的表达式，能够同时处理整数和浮点数。

# Input types
## Required
- expression
    - 定义要评估的数学表达式。这个表达式可以包含变量和算术运算，作为计算的蓝图。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- a_int
    - 表示可在表达式中使用的整数变量'a'。它的值会影响计算结果。
    - Comfy dtype: INT
    - Python dtype: int
- b_int
    - 表示可在表达式中使用的整数变量'b'。它的值会影响计算结果。
    - Comfy dtype: INT
    - Python dtype: int
- c_int
    - 表示可在表达式中使用的整数变量'c'。它的值会影响计算结果。
    - Comfy dtype: INT
    - Python dtype: int
- r_float
    - 表示可在表达式中使用的浮点数变量'r'。它的值会影响计算结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s_float
    - 表示可在表达式中使用的浮点数变量's'。它的值会影响计算结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- t_float
    - 表示可在表达式中使用的浮点数变量't'。它的值会影响计算结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- FLOAT
    - Comfy dtype: FLOAT
    - 评估表达式后得到的浮点数结果。
    - Python dtype: float
- INT
    - Comfy dtype: INT
    - 评估表达式后得到的整数结果，通过对浮点数结果进行四舍五入获得。
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamCalculation:
    NODE_NAME = "Calculation"
    ICON = "🖩"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "expression": ("STRING", {"default": "a + b + c - (r * s * t)", "multiline": True})
            },
            "optional": {
                "a_int": ("INT", {"default": 0, "multiline": False}),
                "b_int": ("INT", {"default": 0, "multiline": False}),
                "c_int": ("INT", {"default": 0, "multiline": False}),
                "r_float": ("FLOAT", {"default": 0.0, "multiline": False}),
                "s_float": ("FLOAT", {"default": 0.0, "multiline": False}),
                "t_float": ("FLOAT", {"default": 0.0, "multiline": False})
            }
        }

    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = ("FLOAT", "INT")
    RETURN_NAMES = ("FLOAT", "INT")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def _make_model(self):
        funcs = self._make_functions()
        m = base_eval_model.clone()
        m.nodes.append('Mult')
        m.nodes.append('Call')
        for funname in funcs.keys():
            m.allowed_functions.append(funname)
        return (m, funcs)

    def _make_functions(self):
        return {
            "round": round,
            "float": float,
            "int": int,
            "abs": abs,
            "min": min,
            "max": max,
            "tan": math.tan,
            "tanh": math.tanh,
            "sin": math.sin,
            "sinh": math.sinh,
            "cos": math.cos,
            "cosh": math.cosh,
            "pow": math.pow,
            "sqrt": math.sqrt,
            "ceil": math.ceil,
            "floor": math.floor,
            "pi": math.pi,
            "log": math.log,
            "log2": math.log2,
            "acos": math.acos,
            "asin": math.asin,
            "acosh": math.acosh,
            "asinh": math.asinh,
            "atan": math.atan,
            "atanh": math.atanh,
            "exp": math.exp,
            "fmod": math.fmod,
            "factorial": math.factorial,
            "dist": math.dist,
            "atan2": math.atan2,
            "log10": math.log10
        }

    def result(self, expression, **values):
        model, funcs = self._make_model()
        vars = funcs
        for key in ("a_int", "b_int", "c_int", "r_float", "s_float", "t_float"):
            nm = key.split("_")[0]
            v = values.get(key, None)
            if v is not None:
                vars[nm] = v
        try:
            data = Expr(expression, model=model).eval(vars)
            if isinstance(data, (int, float)):
                return float(data), int(round(data))
            else:
                return 0.0, 0
        except EvalException as e:
            on_error(DreamCalculation, str(e))

```
