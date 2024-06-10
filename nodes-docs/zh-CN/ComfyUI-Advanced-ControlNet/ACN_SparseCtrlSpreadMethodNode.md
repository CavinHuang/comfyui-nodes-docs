# Documentation
- Class name: SparseSpreadMethodNode
- Category: Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

SparseSpreadMethodNode 类旨在生成和管理给定范围内的稀疏索引分布。它抽象地处理了不同扩散方法的逻辑，例如均匀、开始、结束和中心，允许灵活处理稀疏数据。

# Input types
## Required
- spread
    - 参数 'spread' 决定了稀疏索引如何在整个长度范围内分布。它对节点的操作至关重要，因为它决定了稀疏数据生成的模式，这可能显著影响过程的结果。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- SPARSE_METHOD
    - 输出参数 'SPARSE_METHOD' 表示用于扩散索引的方法。它很重要，因为它封装了所选扩散策略的逻辑，这对于依赖于稀疏索引分布的下游任务至关重要。
    - Comfy dtype: SparseSpreadMethod
    - Python dtype: SparseSpreadMethod

# Usage tips
- Infra type: CPU

# Source code
```
class SparseSpreadMethodNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'spread': (SparseSpreadMethod.LIST,)}}
    RETURN_TYPES = ('SPARSE_METHOD',)
    FUNCTION = 'get_method'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl'

    def get_method(self, spread: str):
        return (SparseSpreadMethod(spread=spread),)
```