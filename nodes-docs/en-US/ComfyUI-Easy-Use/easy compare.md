---
tags:
- Comparison
---

# Compare
## Documentation
- Class name: `easy compare`
- Category: `EasyUse/Logic/Math`
- Output node: `False`

The 'easy compare' node provides a straightforward way to compare two values based on a specified comparison operation. It abstracts the complexity of various comparison operations into a simple interface, enabling users to easily integrate logical comparison functionality within their workflows.
## Input types
### Required
- **`a`**
    - The first value to be compared. It plays a crucial role in the comparison operation, serving as the baseline for the comparison.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`b`**
    - The second value to be compared against the first. Its comparison to the first value determines the outcome of the operation.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`comparison`**
    - Specifies the type of comparison operation to be performed between the two values. This determines how the values are evaluated against each other.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The result of the comparison operation, indicating whether the specified condition between the two values is met.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Compare:
    @classmethod
    def INPUT_TYPES(s):
        s.compare_functions = list(COMPARE_FUNCTIONS.keys())
        return {
            "required": {
                "a": (AlwaysEqualProxy("*"), {"default": 0}),
                "b": (AlwaysEqualProxy("*"), {"default": 0}),
                "comparison": (s.compare_functions, {"default": "a == b"}),
            },
        }

    RETURN_TYPES = ("BOOLEAN",)
    RETURN_NAMES = ("boolean",)
    FUNCTION = "compare"
    CATEGORY = "EasyUse/Logic/Math"

    def compare(self, a, b, comparison):
        return (COMPARE_FUNCTIONS[comparison](a, b),)

```
