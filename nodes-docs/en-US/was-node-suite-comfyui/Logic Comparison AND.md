---
tags:
- BooleanLogic
- ConditionalSelection
---

# Logic Comparison AND
## Documentation
- Class name: `Logic Comparison AND`
- Category: `WAS Suite/Logic`
- Output node: `False`

The Logic Comparison AND node performs a logical AND operation on two boolean inputs, returning the result of this operation as a boolean output. This node is part of the WAS Suite/Logic category and is designed to facilitate logical operations within workflows, enabling conditional logic and decision-making based on boolean values.
## Input types
### Required
- **`boolean_a`**
    - The first boolean input for the AND operation. Its value significantly influences the outcome, as the operation requires both inputs to be true for a true result.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`boolean_b`**
    - The second boolean input for the AND operation. Together with boolean_a, it determines the result of the AND operation, which is true only if both inputs are true.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The boolean result of the logical AND operation between boolean_a and boolean_b.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Logical_AND(WAS_Logical_Comparisons):
    def do(self, boolean_a, boolean_b):
        return (boolean_a and boolean_b,)

```
