# Timesteps Conditioning 🎭🅐🅓
## Documentation
- Class name: ADE_TimestepsConditioning
- Category: Animate Diff 🎭🅐🅓/conditioning
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点专注于调整在动画或扩散过程中特定条件的应用时间，允许精确控制在动画进程中引入某些效果或修改的时间。这使得条件的应用更加动态和细致，从而提高生成内容的整体质量和灵活性。

## Input types
### Required
- start_percent
    - 指定应用给定条件的起始点（占总动画长度的百分比），允许精确的时间控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 定义条件应用的结束点（占总动画长度的百分比），使效果能够定制到动画的特定阶段。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Output types
- timesteps_cond
    - Comfy dtype: TIMESTEPS_COND
    - 条件的时间调整，封装为一种特定类型，表示在整个动画或扩散过程中的条件调度。
    - Python dtype: TimestepsCond

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class ConditioningTimestepsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001})
            }
        }
    
    RETURN_TYPES = ("TIMESTEPS_COND",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning"
    FUNCTION = "create_schedule"

    def create_schedule(self, start_percent: float, end_percent: float):
        return (TimestepsCond(start_percent=start_percent, end_percent=end_percent),)