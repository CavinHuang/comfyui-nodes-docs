# Documentation
- Class name: KfDebug_Int
- Category: Debug
- Output node: True
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfDebug_Int节点旨在方便用户在计算图中检查和分析整数值。它使用户能够监控和理解整数数据的流动，确保模型中涉及整数的操作的正确性。该节点通过提供对整数处理和转换的清晰、专注的视图来帮助调试，避免了其他数据类型的复杂性。

# Input types
## Required
- input
    - 输入参数是将整数值输入到KfDebug_Int节点的关键元素。它对节点的功能至关重要，因为它允许节点监控和分析整数值。输入在决定节点的输出及其在调试过程中提供的洞察中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - KfDebug_Int节点的输出是经过检查和分析的加工整数值。它作为节点操作的确认以及计算图中整数值的完整性的证明。输出非常重要，因为它为进一步的调试或验证模型的性能提供了基础。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class KfDebug_Int(KfDebug_Passthrough):
    RETURN_TYPES = ('INT',)
```