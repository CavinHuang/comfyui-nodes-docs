# Documentation
- Class name: WAS_Logical_OR
- Category: Logical Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Logical_OR节点旨在对两个布尔输入执行逻辑或操作。在决策过程中，它在存在任一条件就足以触发某个动作或结果时是基础性的。

# Input types
## Required
- boolean_a
    - 逻辑或操作的第一个布尔输入。它在确定函数结果中起着关键作用，因为它是当为真时将导致整体输出为真的条件之一。
    - Comfy dtype: bool
    - Python dtype: bool
- boolean_b
    - 逻辑或操作的第二个布尔输入。它与第一个输入同等重要，因为它代表了满足条件时可以导致输出为真的另一个条件。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- result
    - 两个输入之间逻辑或操作的结果。它表示是否至少满足了一个条件，概括了或逻辑的精髓。
    - Comfy dtype: bool
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Logical_OR(WAS_Logical_Comparisons):

    def do(self, boolean_a, boolean_b):
        return (boolean_a or boolean_b,)
```