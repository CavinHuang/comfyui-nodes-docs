# Documentation
- Class name: KfDebug_Clip
- Category: Debugging
- Output node: True
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点便于检查和验证处理流程中的数据，特别关注CLIP数据的完整性和结构。它的设计目的是提供对数据流的洞察，并确保正在处理的信息满足所需的标准和规格。

# Input types
## Required
- input
    - 输入参数对于节点至关重要，因为它携带了需要调试和检查的数据。它直接影响节点的运行和调试输出的质量。
    - Comfy dtype: CLIP
    - Python dtype: Any

# Output types
- output
    - 该节点的输出代表了调试过程的结果。它很重要，因为它提供了经过调试节点处理后数据状态的全面概述。
    - Comfy dtype: CLIP
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class KfDebug_Clip(KfDebug_Passthrough):
    RETURN_TYPES = ('CLIP',)
```