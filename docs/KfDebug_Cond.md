# Documentation
- Class name: KfDebug_Cond
- Category: debugging
- Output node: True
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfDebug_Cond 节点旨在提供一种可视化和理解关键帧模型中调节方面的方法。它对于调试非常有用，确保调节数据被正确处理，从而更明智地进行模型优化。

# Input types
## Required
- conditioning_data
    - 调节数据（conditioning_data）对于 KfDebug_Cond 节点至关重要，因为它代表了用于调节模型输出的输入数据。正确处理该参数对于节点正常工作和调试过程的有效性至关重要。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Output types
- debug_info
    - KfDebug_Cond 节点的 debug_info 输出包含了有关调节过程的宝贵信息。这些信息可以用来识别模型调节中的任何问题，从而促进调试和优化过程。
    - Comfy dtype: dict
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class KfDebug_Cond(KfDebug_Passthrough):
    RETURN_TYPES = ('CONDITIONING',)
```