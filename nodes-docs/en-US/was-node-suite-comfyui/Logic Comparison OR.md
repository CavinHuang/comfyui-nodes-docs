---
tags:
- BooleanLogic
- ConditionalSelection
---

# Logic Comparison OR
## Documentation
- Class name: `Logic Comparison OR`
- Category: `WAS Suite/Logic`
- Output node: `False`

This node performs a logical OR operation on two boolean inputs, returning true if at least one of the inputs is true, and false otherwise. It abstracts the basic logical OR functionality into a node for use within logical operations or decision-making processes.
## Input types
### Required
- **`boolean_a`**
    - The first boolean input for the OR operation. Its value influences the result by potentially making the overall result true if it is true.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`boolean_b`**
    - The second boolean input for the OR operation. Similar to the first input, its true value can make the overall result true, contributing to the logical OR condition.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The result of the logical OR operation, indicating whether at least one of the inputs is true.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Logical_OR(WAS_Logical_Comparisons):
    def do(self, boolean_a, boolean_b):
        return (boolean_a or boolean_b,)

```
