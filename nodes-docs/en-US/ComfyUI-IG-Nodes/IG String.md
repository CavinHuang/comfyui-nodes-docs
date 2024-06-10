# ➡️ IG String
## Documentation
- Class name: `IG String`
- Category: `🐓 IG Nodes/Primitives`
- Output node: `False`

The IG String node is designed to handle string inputs, allowing users to input and pass through string values within a node-based processing environment. It serves as a fundamental building block for operations requiring textual data.
## Input types
### Required
- **`value`**
    - This parameter accepts a string value, serving as the primary input for the node. It enables the node to process and pass through the input string without modification.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Outputs the input string value unchanged, facilitating its use in subsequent nodes or operations.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_String:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("STRING",{}),
            },
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "main"
    CATEGORY = TREE_PRIMITIVES

    def main(self, value):
        return (value,)

```
