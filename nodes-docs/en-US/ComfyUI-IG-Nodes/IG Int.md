# ➡️ IG Int
## Documentation
- Class name: `IG Int`
- Category: `🐓 IG Nodes/Primitives`
- Output node: `False`

The IG Int node is designed to encapsulate and handle integer values within a node-based programming environment. It allows for the specification of an integer value, providing a straightforward way to work with integers in a visual programming context.
## Input types
### Required
- **`value`**
    - Specifies the integer value to be used or manipulated by the node. This parameter is central to the node's operation, serving as the primary input that determines the node's output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - Outputs the integer value specified by the input parameter, effectively passing the value through the node.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_Int:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("INT", {"default": 0, "min": -sys.maxsize, "max": sys.maxsize, "step": 1}),
            },
        }

    RETURN_TYPES = ("INT",)
    FUNCTION = "main"
    CATEGORY = TREE_PRIMITIVES

    def main(self, value):
        return (value,)

```
