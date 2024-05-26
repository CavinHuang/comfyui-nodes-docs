# Documentation
- Class name: KfDebug_Curve
- Category: debug
- Output node: True
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点旨在可视化和分析关键帧路径的曲率，清晰地表示动画中的平滑度和连续性。它有助于理解轨迹并确保运动符合预期，这对于保持最终输出中期望的审美和流畅性至关重要。

# Input types
## Required
- curve_data
    - 该参数保存表示待调试曲线的数值数据。它至关重要，因为它构成了可视化和分析的基础，使节点能够有效处理和显示曲线的特征。
    - Comfy dtype: numpy.ndarray
    - Python dtype: numpy.ndarray

# Output types
- visualized_curve
    - 输出是输入曲线的视觉表示，对于快速识别任何不规则或改进区域至关重要。它提供了一种有形的方式来评估曲线的性能并进行必要的调整。
    - Comfy dtype: PIL.Image
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class KfDebug_Curve(KfDebug_Passthrough):
    RETURN_TYPES = ('KEYFRAMED_CURVE',)
```