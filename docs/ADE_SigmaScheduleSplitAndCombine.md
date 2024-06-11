# Sigma Schedule Split Combine 🎭🅐🅓
## Documentation
- Class name: ADE_SigmaScheduleSplitAndCombine
- Category: Animate Diff 🎭🅐🅓/sample settings/sigma schedule
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在通过基于指定的权重和插值方法拆分和组合sigma计划来操作它们。它允许创建两个输入计划的混合新sigma计划，从而实现sigma值随时间的自定义进程。

## Input types
### Required
- schedule_Start
    - 用于拆分和组合过程的起始sigma计划，决定新sigma计划的初始部分。
    - Comfy dtype: SIGMA_SCHEDULE
    - Python dtype: SigmaSchedule
- schedule_End
    - 用于拆分和组合过程的结束sigma计划，影响新sigma计划的后段。
    - Comfy dtype: SIGMA_SCHEDULE
    - Python dtype: SigmaSchedule
- idx_split_percent
    - 初始sigma计划拆分的百分比，决定两个计划之间的过渡点。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Output types
- sigma_schedule
    - Comfy dtype: SIGMA_SCHEDULE
    - 结果sigma计划，是根据指定的拆分百分比修改的起始和结束输入计划的混合体。
    - Python dtype: SigmaSchedule

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class SplitAndCombineSigmaScheduleNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "schedule_Start": ("SIGMA_SCHEDULE",),
                "schedule_End": ("SIGMA_SCHEDULE",),
                "idx_split_percent": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.001})
            }
        }
    
    RETURN_TYPES = ("SIGMA_SCHEDULE",)
    CATEGORY = "Animate Diff 🎭🅐🅓/sample settings/sigma schedule"
    FUNCTION = "get_sigma_schedule"

    def get_sigma_schedule(self, schedule_Start: SigmaSchedule, schedule_End: SigmaSchedule, idx_split_percent: float):
        validate_sigma_schedule_compatibility(schedule_Start, schedule_End)
        # first, calculate index to act as split; get diff from 1.0 since sigmas are flipped at this stage
        idx = int((1.0-idx_split_percent) * schedule_Start.total_sigmas())
        new_sigmas = torch.cat([schedule_End.model_sampling.sigmas[:idx], schedule_Start.model_sampling.sigmas[idx:]], dim=0)
        new_schedule = schedule_Start.clone()
        new_schedule.model_sampling.set_sigmas(new_sigmas)
        return (new_schedule,)