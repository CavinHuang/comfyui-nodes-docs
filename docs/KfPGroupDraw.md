# Documentation
- Class name: KfPGroupDraw
- Category: experimental
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点将一组参数组可视化为曲线图，使得能够分析参数随时间或其他变量的变化。它的设计目的是提供参数演变的图形表示，这对于理解所建模系统的动态至关重要。

# Input types
## Required
- parameter_group
    - 此参数保存了一系列参数组的集合，其动态将被可视化。它是至关重要的，因为它构成了节点操作的基础，决定了绘制的数据以及可视化如何表示系统的行为。
    - Comfy dtype: PARAMETER_GROUP
    - Python dtype: Dict[str, Any]
## Optional
- n
    - 此参数指定评估曲线的点数。它影响图表的分辨率，较高的值可以导致参数演变的更平滑表示。
    - Comfy dtype: INT
    - Python dtype: int
- show_legend
    - 此参数控制图表中是否显示图例。当可视化多个参数组时，它对于识别不同的曲线很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- img_tensor
    - 输出是一个表示曲线图图像的张量，它提供了在指定范围内参数演变的视觉摘要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class KfPGroupDraw:
    CATEGORY = f'{CATEGORY}/experimental'
    FUNCTION = 'main'
    RETURN_TYPES = ('IMAGE',)

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'parameter_group': ('PARAMETER_GROUP', {'forceInput': True}), 'n': ('INT', {'default': 64}), 'show_legend': ('BOOLEAN', {'default': True})}}

    def main(self, parameter_group, n, show_legend):
        img_tensor = plot_curve(parameter_group, n, show_legend, is_pgroup=True)
        return (img_tensor,)
```