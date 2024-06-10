---
tags:
- SigmaScheduling
---

# Sigma Schedule Interpolated Mean 🎭🅐🅓
## Documentation
- Class name: `ADE_SigmaScheduleWeightedAverageInterp`
- Category: `Animate Diff 🎭🅐🅓/sample settings/sigma schedule`
- Output node: `False`

This node is designed to create a new sigma schedule by interpolating between two given sigma schedules based on a specified weight range and interpolation method. It effectively blends the characteristics of both input schedules into a single, new schedule, allowing for dynamic adjustments in the diffusion process.
## Input types
### Required
- **`schedule_A`**
    - The first sigma schedule to be interpolated.
    - Comfy dtype: `SIGMA_SCHEDULE`
    - Python dtype: `SigmaSchedule`
- **`schedule_B`**
    - The second sigma schedule to be interpolated.
    - Comfy dtype: `SIGMA_SCHEDULE`
    - Python dtype: `SigmaSchedule`
- **`weight_A_Start`**
    - The starting weight for the first sigma schedule in the interpolation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_A_End`**
    - The ending weight for the first sigma schedule in the interpolation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`interpolation`**
    - The method of interpolation to be used for blending the sigma schedules.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `InterpolationMethod`
## Output types
- **`sigma_schedule`**
    - Comfy dtype: `SIGMA_SCHEDULE`
    - The resulting sigma schedule after interpolation.
    - Python dtype: `SigmaSchedule`
## Usage tips
- Infra type: `CPU`
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

```
