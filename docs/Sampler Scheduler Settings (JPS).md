
# Documentation
- Class name: Sampler Scheduler Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False

该节点旨在简化生成式管道中采样器和调度器的选择与配置过程，使用户能够指定和获取各种采样策略及其相应调度算法的设置。

# Input types
## Required
- sampler_name
    - 指定要使用的采样器名称，对确定生成过程中的采样策略起着至关重要的作用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: comfy.samplers.KSampler.SAMPLERS
- scheduler
    - 决定要应用的调度算法，直接影响采样过程的执行和效率。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: comfy.samplers.KSampler.SCHEDULERS

# Output types
- sampler_name
    - 返回所选采样器的名称。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 返回所选的调度算法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Sampler_Scheduler_Settings:
    CATEGORY = 'JPS Nodes/Settings'
    RETURN_TYPES = (comfy.samplers.KSampler.SAMPLERS,comfy.samplers.KSampler.SCHEDULERS,)
    RETURN_NAMES = ("sampler_name","scheduler",)
    FUNCTION = "get_samsched"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"sampler_name": (comfy.samplers.KSampler.SAMPLERS,),"scheduler": (comfy.samplers.KSampler.SCHEDULERS,)}}

    def get_samsched(self, sampler_name, scheduler):
        return (sampler_name, scheduler, )

```
