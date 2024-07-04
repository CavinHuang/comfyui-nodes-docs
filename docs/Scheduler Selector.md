
# Documentation
- Class name: Scheduler Selector
- Category: ImageSaverTools/utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Scheduler Selector节点旨在简化Comfy采样器中预定义调度器列表的选择过程。它为用户提供了一个简洁的接口，使其能够轻松选择最适合图像生成或修改任务的调度器，从而抽象化了调度器选择的复杂性。

# Input types
## Required
- scheduler
    - 指定要选择的调度器。该参数允许用户从可用的调度器列表中进行选择，通过确定使用的调度算法来影响图像生成过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- scheduler
    - 返回所选调度器的名称。这个输出对于需要识别和使用特定调度器的后续处理步骤至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)



## Source code
```python
class SchedulerSelector:
    CATEGORY = 'ImageSaverTools/utils'
    RETURN_TYPES = (comfy.samplers.KSampler.SCHEDULERS,)
    RETURN_NAMES = ("scheduler",)
    FUNCTION = "get_names"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"scheduler": (comfy.samplers.KSampler.SCHEDULERS,)}}

    def get_names(self, scheduler):
        return (scheduler,)

```
