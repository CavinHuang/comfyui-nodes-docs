# Documentation
- Class name: KfDebug_Float
- Category: Debugging
- Output node: True
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfDebug_Float 节点旨在通过提供一种检查和分析数据处理流水线中浮点数的方法来促进调试过程。它是开发人员验证计算各个阶段数值数据的完整性和行为的关键工具。

# Input types
## Required
- input_float
    - input_float 参数对于节点的操作至关重要，因为它表示需要调试的浮点数。它在节点的执行中起着核心作用，是主要的待检查和分析的数据。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output_float
    - output_float 参数非常重要，因为它代表了由节点处理过的已调试的浮点数。它对于下游流程至关重要，因为它确保了数据流的连续性和可靠性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class KfDebug_Float(KfDebug_Passthrough):
    RETURN_TYPES = ('FLOAT',)
```