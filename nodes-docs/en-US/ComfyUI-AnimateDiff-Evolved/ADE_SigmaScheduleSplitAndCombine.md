---
tags:
- SigmaScheduling
---

# Sigma Schedule Split Combine 🎭🅐🅓
## Documentation
- Class name: `ADE_SigmaScheduleSplitAndCombine`
- Category: `Animate Diff 🎭🅐🅓/sample settings/sigma schedule`
- Output node: `False`

This node is designed to manipulate sigma schedules by splitting and combining them based on specified weights and interpolation methods. It enables the creation of new sigma schedules that are hybrids of two input schedules, allowing for customized progression of sigma values over time.
## Input types
### Required
- **`schedule_Start`**
    - The starting sigma schedule for the split and combination process, determining the initial segment of the new sigma schedule.
    - Comfy dtype: `SIGMA_SCHEDULE`
    - Python dtype: `SigmaSchedule`
- **`schedule_End`**
    - The ending sigma schedule for the split and combination process, influencing the latter segment of the new sigma schedule.
    - Comfy dtype: `SIGMA_SCHEDULE`
    - Python dtype: `SigmaSchedule`
- **`idx_split_percent`**
    - The percentage at which the initial sigma schedule is split, dictating the point of transition between the two schedules.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`sigma_schedule`**
    - Comfy dtype: `SIGMA_SCHEDULE`
    - The resulting sigma schedule, a hybrid of the starting and ending input schedules modified according to the specified split percentage.
    - Python dtype: `SigmaSchedule`
## Usage tips
- Infra type: `CPU`
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

```
