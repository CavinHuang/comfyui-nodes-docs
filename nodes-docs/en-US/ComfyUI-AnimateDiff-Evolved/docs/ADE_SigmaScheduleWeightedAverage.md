---
tags:
- SigmaScheduling
---

# Sigma Schedule Weighted Mean 🎭🅐🅓
## Documentation
- Class name: `ADE_SigmaScheduleWeightedAverage`
- Category: `Animate Diff 🎭🅐🅓/sample settings/sigma schedule`
- Output node: `False`

This node is designed to create a new sigma schedule by calculating a weighted average of two provided sigma schedules. It allows for the blending of characteristics from both schedules into a single, new schedule based on a specified weighting factor.
## Input types
### Required
- **`schedule_A`**
    - The first sigma schedule to be blended. It serves as one of the bases for the weighted average calculation.
    - Comfy dtype: `SIGMA_SCHEDULE`
    - Python dtype: `SigmaSchedule`
- **`schedule_B`**
    - The second sigma schedule to be blended with the first. It contributes to the weighted average calculation, complementing the first schedule.
    - Comfy dtype: `SIGMA_SCHEDULE`
    - Python dtype: `SigmaSchedule`
- **`weight_A`**
    - The weighting factor for the first sigma schedule. This determines the proportion of the first schedule's characteristics in the final blended schedule.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`sigma_schedule`**
    - Comfy dtype: `SIGMA_SCHEDULE`
    - The resulting sigma schedule after blending the two input schedules based on the specified weighting factor.
    - Python dtype: `SigmaSchedule`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WeightedAverageSigmaScheduleNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "schedule_A": ("SIGMA_SCHEDULE",),
                "schedule_B": ("SIGMA_SCHEDULE",),
                "weight_A": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.001}),
            }
        }
    
    RETURN_TYPES = ("SIGMA_SCHEDULE",)
    CATEGORY = "Animate Diff 🎭🅐🅓/sample settings/sigma schedule"
    FUNCTION = "get_sigma_schedule"

    def get_sigma_schedule(self, schedule_A: SigmaSchedule, schedule_B: SigmaSchedule, weight_A: float):
        validate_sigma_schedule_compatibility(schedule_A, schedule_B)
        new_sigmas = schedule_A.model_sampling.sigmas * weight_A + schedule_B.model_sampling.sigmas * (1-weight_A)
        combo_schedule = schedule_A.clone()
        combo_schedule.model_sampling.set_sigmas(new_sigmas)
        return (combo_schedule,)

```
