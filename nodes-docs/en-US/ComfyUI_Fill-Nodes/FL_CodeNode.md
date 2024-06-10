---
tags:
- AnimationScheduling
- VisualEffects
---

# FL Code Node
## Documentation
- Class name: `FL_CodeNode`
- Category: `🏵️Fill Nodes`
- Output node: `False`

The FL_CodeNode allows for dynamic execution of user-provided code within a predefined execution environment, enabling custom processing and manipulation of inputs to generate outputs. It abstracts the complexity of executing arbitrary code snippets safely and efficiently, providing a flexible interface for user-defined logic.
## Input types
### Required
- **`code_input`**
    - The primary input for the node, accepting a multiline string of code that the user wishes to execute. This code can interact with optional inputs and define the logic for output generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`input_i`**
    - A series of optional input parameters (up to four) that can be used within the user-provided code for custom logic and processing. These inputs are dynamically accepted and can vary in type based on the user's code.
    - Comfy dtype: `*`
    - Python dtype: `dict`
## Output types
- **`output_0`**
    - Comfy dtype: `*`
    - An output parameter that is the result of the executed user-provided code.
    - Python dtype: `object`
- **`output_1`**
    - Comfy dtype: `*`
    - An output parameter that is the result of the executed user-provided code.
    - Python dtype: `object`
- **`output_2`**
    - Comfy dtype: `*`
    - An output parameter that is the result of the executed user-provided code.
    - Python dtype: `object`
- **`output_3`**
    - Comfy dtype: `*`
    - An output parameter that is the result of the executed user-provided code.
    - Python dtype: `object`
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
