# Documentation
- Class name: KfDebug_Model
- Category: Debugging
- Output node: True
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点便于检查和分析模型的内部状态和输出，提供了一种理解和调试模型在推理过程中行为的手段。

# Input types
## Required
- input_data
    - 输入数据非常关键，它代表了模型处理的样本或样本批次。它直接影响模型的输出和从调试中获得的洞察。
    - Comfy dtype: COMBO[numpy.ndarray, torch.Tensor]
    - Python dtype: Union[numpy.ndarray, torch.Tensor]
- model
    - 模型参数至关重要，它定义了正在被调试行为的神经网络结构。模型的配置和参数决定了调试过程。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Output types
- debug_info
    - 调试信息很重要，因为它提供了模型内部工作的详细概览，有助于识别潜在问题和改进领域。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: GPU

# Source code
```
class KfDebug_Model(KfDebug_Passthrough):
    RETURN_TYPES = ('MODEL',)
```