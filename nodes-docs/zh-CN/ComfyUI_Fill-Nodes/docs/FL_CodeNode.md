
# Documentation
- Class name: FL_CodeNode
- Category: 🏵️Fill Nodes
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

FL_CodeNode允许在预定义的执行环境中动态执行用户提供的代码，从而实现对输入的自定义处理和操作以生成输出。该节点抽象了安全高效执行任意代码片段的复杂性，为用户定义的逻辑提供了灵活的接口。

# Input types
## Required
- code_input
    - 节点的主要输入，接受用户希望执行的多行代码字符串。这段代码可以与可选输入交互，并定义输出生成的逻辑。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- input_i
    - 一系列可选的输入参数（最多四个），可在用户提供的代码中用于自定义逻辑和处理。这些输入是动态接受的，其类型可根据用户的代码而变化。
    - Comfy dtype: *
    - Python dtype: dict

# Output types
- output_0
    - 执行用户提供代码的结果输出参数。
    - Comfy dtype: *
    - Python dtype: object
- output_1
    - 执行用户提供代码的结果输出参数。
    - Comfy dtype: *
    - Python dtype: object
- output_2
    - 执行用户提供代码的结果输出参数。
    - Comfy dtype: *
    - Python dtype: object
- output_3
    - 执行用户提供代码的结果输出参数。
    - Comfy dtype: *
    - Python dtype: object


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FL_CodeNode:

    @classmethod
    def INPUT_TYPES(cls):
        required = {"code_input": ("STRING", {"multiline": True})}
        optional = {f"input_{i}": (AlwaysEqualProxy("*")) for i in range(4)}
        return {"required": required, "optional": optional}

    CATEGORY = "🏵️Fill Nodes"
    RETURN_TYPES = tuple(AlwaysEqualProxy("*") for _ in range(4))
    RETURN_NAMES = tuple(f"output_{i}" for i in range(4))

    FUNCTION = "execute"

    def execute(self, code_input, **kwargs):
        outputs = {i: None for i in range(4)}

        try:
            exec(code_input, {"inputs": kwargs, "outputs": outputs})
        except Exception as e:
            raise RuntimeError(f"Error executing user code: {e}")

        return tuple(outputs[i] for i in range(4))

```
