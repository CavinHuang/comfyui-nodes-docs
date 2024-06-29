# Incrementer
## Documentation
- Class name: `MasqueradeIncrementer`
- Category: `Masquerade Nodes`
- Output node: `False`

The MasqueradeIncrementer node is designed to perform a simple arithmetic operation on a given seed value, incrementing it within a specified maximum value. This node abstracts the concept of modular arithmetic, providing a straightforward way to cycle through a range of numbers starting from a seed value.
## Input types
### Required
- **`seed`**
    - The 'seed' parameter serves as the starting point for the increment operation. It determines the initial value from which the incrementing begins, playing a crucial role in the node's execution and the resulting output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_value`**
    - The 'max_value' parameter sets the upper limit for the increment operation. It defines the range within which the seed value can be incremented, ensuring that the result cycles within a specified boundary.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The output is an integer representing the incremented value of the seed, modulo the specified maximum value.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaqueradeIncrementerNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "seed": ("INT", {"default": 0, "min": -1, "max": 0xffffffffffffffff, "step": 1}),
                "max_value": ("INT", {"default": 1, "min": 1, "max": 0xffffffffffffffff, "step": 1}),
            }
        }

    RETURN_TYPES = ("INT",)
    FUNCTION = "increment"

    CATEGORY = "Masquerade Nodes"

    def increment(self, seed, max_value):
        return (seed % max_value,)

```
