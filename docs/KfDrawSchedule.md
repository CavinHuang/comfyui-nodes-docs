# Documentation
- Class name: KfDrawSchedule
- Category: RootCategory
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点旨在可视化在keyframed中定义的调度计划，将复杂的调度过程抽象为易于理解的图形表示。它将调度计划转换为一系列权重曲线，每条曲线对应一个关键帧的贡献，便于分析和理解调度动态。

# Input types
## Required
- schedule
    - 调度参数至关重要，因为它定义了将要由节点可视化的keyframed曲线及其相关参数。它是生成权重曲线和结果图的主要输入。
    - Comfy dtype: SCHEDULE
    - Python dtype: kf.Keyframed
## Optional
- n
    - 参数'n'对于确定图形的分辨率非常重要。它影响曲线采样的点数，这可能会影响可视化的清晰度和细节。
    - Comfy dtype: INT
    - Python dtype: int
- show_legend
    - 参数'show_legend'控制是否在图上显示图例。这有助于区分不同的权重曲线，并理解它们对整个调度的各自贡献。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- img_tensor
    - 输出的img_tensor代表了输入调度的可视化图形，作为绘图的结果。它封装了权重曲线及其动态，提供了调度过程的清晰且简洁的图形摘要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class KfDrawSchedule:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('IMAGE',)

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'schedule': ('SCHEDULE', {'forceInput': True}), 'n': ('INT', {'default': 64}), 'show_legend': ('BOOLEAN', {'default': True})}}

    def main(self, schedule, n, show_legend):
        curves = schedule_to_weight_curves(schedule)
        img_tensor = plot_curve(curves, n, show_legend, is_pgroup=True)
        return (img_tensor,)
```