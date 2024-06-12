# Integer Pair
## Documentation
- Class name: `SeargeIntegerPair`
- Category: `Searge/_deprecated_/Integers`
- Output node: `False`

The SeargeIntegerPair node is designed to handle pairs of integer values, allowing for the retrieval and manipulation of these pairs within a deprecated integer-based context. It focuses on providing a straightforward interface for working with two integer values, emphasizing simplicity and directness in integer operations.
## Input types
### Required
- **`value1`**
    - Represents the first integer value in the pair. It is crucial for defining the pair's first component and influences the node's output by serving as one of the two primary integers to be processed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`value2`**
    - Denotes the second integer value in the pair. This parameter is essential for completing the integer pair and affects the node's functionality by being the second primary integer to be handled alongside 'value1'.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`value 1`**
    - Comfy dtype: `INT`
    - The first integer value of the pair, returned as is from the input without modification.
    - Python dtype: `int`
- **`value 2`**
    - Comfy dtype: `INT`
    - The second integer value of the pair, returned unchanged from the input, completing the integer pair output.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeIntegerPair:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "value1": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            "value2": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
        },
        }

    RETURN_TYPES = ("INT", "INT",)
    RETURN_NAMES = ("value 1", "value 2",)
    FUNCTION = "get_value"

    CATEGORY = "Searge/_deprecated_/Integers"

    def get_value(self, value1, value2):
        return (value1, value2,)

```
