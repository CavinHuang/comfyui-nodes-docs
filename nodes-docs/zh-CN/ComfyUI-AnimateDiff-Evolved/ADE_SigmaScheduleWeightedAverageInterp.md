# Sigma Schedule Interpolated Mean 🎭🅐🅓
## Documentation
- Class name: ADE_SigmaScheduleWeightedAverageInterp
- Category: Animate Diff 🎭🅐🅓/sample settings/sigma schedule
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在通过基于指定的权重范围和插值方法在两个给定的sigma计划之间进行插值来创建一个新的sigma计划。它有效地将两个输入计划的特性融合成一个新的计划，从而在扩散过程中实现动态调整。

## Input types
### Required
- schedule_A
    - 第一个要插值的sigma计划。
    - Comfy dtype: SIGMA_SCHEDULE
    - Python dtype: SigmaSchedule
- schedule_B
    - 第二个要插值的sigma计划。
    - Comfy dtype: SIGMA_SCHEDULE
    - Python dtype: SigmaSchedule
- weight_A_Start
    - 插值中第一个sigma计划的起始权重。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_A_End
    - 插值中第一个sigma计划的结束权重。
    - Comfy dtype: FLOAT
    - Python dtype: float
- interpolation
    - 用于混合sigma计划的插值方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: InterpolationMethod

## Output types
- sigma_schedule
    - Comfy dtype: SIGMA_SCHEDULE
    - 插值后的结果sigma计划。
    - Python dtype: SigmaSchedule

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class InterpolatedWeightedAverageSigmaScheduleNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "schedule_A": ("SIGMA_SCHEDULE",),
                "schedule_B": ("SIGMA_SCHEDULE",),
                "weight_A_Start": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.001}),
                "weight_A_End": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.001}),
                "interpolation": (InterpolationMethod._LIST,),
            }
        }
    
    RETURN_TYPES = ("SIGMA_SCHEDULE",)
    CATEGORY = "Animate Diff 🎭🅐🅓/sample settings/sigma schedule"
    FUNCTION = "get_sigma_schedule"

    def get_sigma_schedule(self, schedule_A: SigmaSchedule, schedule_B: SigmaSchedule,
                           weight_A_Start: float, weight_A_End: float, interpolation: str):
        validate_sigma_schedule_compatibility(schedule_A, schedule_B)
        # get reverse weights, since sigmas are currently reversed
        weights = InterpolationMethod.get_weights(num_from=weight_A_Start, num_to=weight_A_End,
                                                  length=schedule_A.total_sigmas(), method=interpolation, reverse=True)
        weights = weights.to(schedule_A.model_sampling.sigmas.dtype).to(schedule_A.model_sampling.sigmas.device)
        new_sigmas = schedule_A.model_sampling.sigmas * weights + schedule_B.model_sampling.sigmas * (1.0-weights)
        combo_schedule = schedule_A.clone()
        combo_schedule.model_sampling.set_sigmas(new_sigmas)
        return (combo_schedule,)