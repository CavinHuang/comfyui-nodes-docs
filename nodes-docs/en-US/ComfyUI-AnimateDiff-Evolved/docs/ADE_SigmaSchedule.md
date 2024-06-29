---
tags:
- SigmaScheduling
---

# Create Sigma Schedule 🎭🅐🅓
## Documentation
- Class name: `ADE_SigmaSchedule`
- Category: `Animate Diff 🎭🅐🅓/sample settings/sigma schedule`
- Output node: `False`

The ADE_SigmaSchedule node is designed to generate a sigma schedule based on a given beta schedule. It abstracts the complexity of sigma schedule creation, offering a straightforward way to obtain a sigma schedule tailored to specific model sampling types and configurations.
## Input types
### Required
- **`beta_schedule`**
    - Specifies the beta schedule to be used for generating the sigma schedule. This parameter is crucial as it determines the base configuration from which the sigma schedule will be derived.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `BetaSchedules.ALIAS_ACTIVE_LIST`
## Output types
- **`sigma_schedule`**
    - Comfy dtype: `SIGMA_SCHEDULE`
    - Outputs a sigma schedule object, which is essential for defining the progression of noise levels in diffusion-based generative models.
    - Python dtype: `SigmaSchedule (custom type from the animatediff package)`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SigmaScheduleNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "beta_schedule": (BetaSchedules.ALIAS_ACTIVE_LIST,),
            }
        }
    
    RETURN_TYPES = ("SIGMA_SCHEDULE",)
    CATEGORY = "Animate Diff 🎭🅐🅓/sample settings/sigma schedule"
    FUNCTION = "get_sigma_schedule"

    def get_sigma_schedule(self, beta_schedule: str):
        model_type = ModelSamplingType.from_alias(ModelSamplingType.EPS)
        new_model_sampling = BetaSchedules._to_model_sampling(alias=beta_schedule,
                                                              model_type=model_type)
        return (SigmaSchedule(model_sampling=new_model_sampling, model_type=model_type),)

```
