# Create Sigma Schedule 🎭🅐🅓
## Documentation
- Class name: ADE_SigmaSchedule
- Category: Animate Diff 🎭🅐🅓/sample settings/sigma schedule
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

ADE_SigmaSchedule节点旨在根据给定的beta计划生成一个sigma计划。它抽象了sigma计划创建的复杂性，提供了一种简便的方法来获得符合特定模型采样类型和配置的sigma计划。

## Input types
### Required
- beta_schedule
    - 指定用于生成sigma计划的beta计划。此参数至关重要，因为它决定了将派生sigma计划的基本配置。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: BetaSchedules.ALIAS_ACTIVE_LIST

## Output types
- sigma_schedule
    - Comfy dtype: SIGMA_SCHEDULE
    - 输出一个sigma计划对象，它对于定义基于扩散的生成模型中的噪声级别进程至关重要。
    - Python dtype: SigmaSchedule (custom type from the animatediff package)

## Usage tips
- Infra type: CPU
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