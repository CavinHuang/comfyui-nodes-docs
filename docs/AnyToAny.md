
# Documentation
- Class name: AnyToAny
- Category: Bmad/⚠️⚠️⚠️
- Output node: False
- Repo Ref: https://github.com/bmad4ever/ComfyUI-Bmad-Custom-Nodes

AnyToAny节点的设计目的是基于用户定义的函数动态评估和转换输入数据。它抽象了对数据应用自定义操作的复杂性，允许进行多样化的数据操作和转换。

# Input types
## Required
- v
    - 代表要转换的输入值。它在接受任何数据类型方面的灵活性使其成为节点操作的核心，能够实现广泛的转换。
    - Comfy dtype: *
    - Python dtype: Any
- function
    - 一个表示用户定义的lambda函数的字符串。这个函数决定了如何转换输入值'v'，展示了节点执行自定义数据操作的能力。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- *
    - 输出由用户定义的函数动态决定，展示了节点在处理和转换各种数据类型方面的多功能性。
    - Comfy dtype: *
    - Python dtype: Any


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnyToAny:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "v": ("*",),
            "function": ("STRING", {"multiline": True, "default": ""}),
        }}

    FUNCTION = "eval_it"
    CATEGORY = "Bmad/⚠️⚠️⚠️"
    RETURN_TYPES = tuple(["*" for x in range(16)])

    def eval_it(self, v, function):
        function = prepare_text_for_eval(function)
        expression = eval(f"lambda v: {function}", {
            "__builtins__": {},
            "tuple": tuple, "list": list},
                          {})
        result = expression(v)
        return result

```
