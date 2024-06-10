---
tags:
- BooleanLogic
- ConditionalSelection
---

# Logic Comparison XOR
## Documentation
- Class name: `Logic Comparison XOR`
- Category: `WAS Suite/Logic`
- Output node: `False`

This node performs an exclusive logical XOR operation on two boolean inputs, returning true if exactly one of the inputs is true, and false otherwise. It abstracts the concept of non-equivalence or exclusive disjunction in boolean logic, providing a straightforward way to compare two boolean values for exclusivity.
## Input types
### Required
- **`boolean_a`**
    - The first boolean value to compare. It plays a crucial role in determining the result of the XOR operation by its exclusivity with the second boolean value.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`boolean_b`**
    - The second boolean value to compare. It is essential in the XOR operation, working in conjunction with the first boolean value to determine exclusivity.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The result of the XOR operation, indicating whether exactly one of the input boolean values is true.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Logical_XOR(WAS_Logical_Comparisons):
    def do(self, boolean_a, boolean_b):
        return (boolean_a != boolean_b,)

```
