# Documentation
- Class name: KfCurveDraw
- Category: experimental
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点通过绘制给定曲线并生成其图像表示来对其进行可视化。它旨在抽象地表示曲线数据点内的趋势和波动，为理解曲线随时间的行为提供视觉分析工具。

# Input types
## Required
- curve
    - 曲线参数对于节点的运行至关重要，因为它定义了将要可视化的数据集。它包含关键帧，这些关键帧代表特定时间点，每个关键帧都有一个相应的值。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
## Optional
- n
    - 该参数决定了曲线上绘制的点数，这会影响可视化的粒度。它确保曲线得到充分的表示以供分析。
    - Comfy dtype: INT
    - Python dtype: int
- show_legend
    - 启用此参数时，会在图表中添加图例，为每条曲线提供参考，增强可视化的清晰度。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- img_tensor
    - 输出是一个代表绘制曲线的图像张量。它作为数据的视觉摘要，允许进行简单的解释和进一步的处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class KfCurveDraw:
    CATEGORY = f'{CATEGORY}/experimental'
    FUNCTION = 'main'
    RETURN_TYPES = ('IMAGE',)

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'curve': ('KEYFRAMED_CURVE', {'forceInput': True}), 'n': ('INT', {'default': 64}), 'show_legend': ('BOOLEAN', {'default': True})}}

    def main(self, curve, n, show_legend):
        img_tensor = plot_curve(curve, n, show_legend, is_pgroup=False)
        return (img_tensor,)
```