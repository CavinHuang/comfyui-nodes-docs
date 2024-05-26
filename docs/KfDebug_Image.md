# Documentation
- Class name: KfDebug_Image
- Category: Debugging
- Output node: True
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfDebug_Image节点旨在工作流中便于图像数据的可视化，提供在处理的不同阶段检查和验证图像输入或输出的手段。它通过提供清晰的图像视觉表示，增强了调试过程，确保图像数据被正确处理并满足预期标准。

# Input types
## Required
- image
    - 图像参数对于KfDebug_Image节点至关重要，因为它是节点可视化的主要输入。它通过允许节点显示图像以供检查，确保图像数据符合预期，并帮助识别任何潜在的问题或差异，影响整个调试过程。
    - Comfy dtype: COMBO[numpy.ndarray,PIL.Image,torch.Tensor]
    - Python dtype: Union[numpy.ndarray, PIL.Image, torch.Tensor]

# Output types
- image
    - KfDebug_Image节点的输出图像作为输入图像状态的视觉确认。它非常重要，因为它提供了一种在工作流中传递图像数据后验证图像数据的完整性和准确性的手段，确保没有发生更改或损坏。
    - Comfy dtype: IMAGE
    - Python dtype: Union[numpy.ndarray, PIL.Image]

# Usage tips
- Infra type: CPU

# Source code
```
class KfDebug_Image(KfDebug_Passthrough):
    RETURN_TYPES = ('IMAGE',)
```