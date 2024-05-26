# Documentation
- Class name: WAS_Logical_AND
- Category: Logical Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Logical_AND节点旨在执行逻辑与操作。它评估两个布尔输入，以确定两个条件是否都为真，返回一个布尔结果，表示输入的逻辑与。

# Input types
## Required
- boolean_a
    - 第一个布尔输入，用于逻辑与操作。它至关重要，因为它代表了必须为真的条件之一，以使最终结果为真。
    - Comfy dtype: bool
    - Python dtype: bool
- boolean_b
    - 第二个布尔输入，也用于逻辑与操作。它的值同样重要，因为只有当它与第一个输入同时为真时，节点才会返回真结果。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- result
    - 两个输入布尔值之间逻辑与操作的结果。它很重要，因为它提供了逻辑与运算的最终结果。
    - Comfy dtype: bool
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Logical_AND(WAS_Logical_Comparisons):

    def do(self, boolean_a, boolean_b):
        return (boolean_a and boolean_b,)
```