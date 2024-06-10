# Documentation
- Class name: WAS_Logical_XOR
- Category: Logical Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Logical_XOR节点旨在对两个布尔输入执行逻辑异或操作。它在逻辑电路和决策过程中是基础性的，为二进制差异提供了一个简单而强大的机制。

# Input types
## Required
- boolean_a
    - XOR操作的第一个布尔输入。它在确定逻辑比较的结果中起着关键作用，因为节点的功能取决于对两个输入的评估。
    - Comfy dtype: bool
    - Python dtype: bool
- boolean_b
    - XOR操作的第二个布尔输入。它在逻辑评估中与第一个输入同等重要，对节点操作的最终布尔结果有贡献。
    - Comfy dtype: bool
    - Python dtype: bool

# Output types
- result
    - 逻辑异或操作的输出，是一个单一的布尔值，代表两个输入的互斥或非关系。
    - Comfy dtype: bool
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Logical_XOR(WAS_Logical_Comparisons):

    def do(self, boolean_a, boolean_b):
        return (boolean_a != boolean_b,)
```