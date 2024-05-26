# Documentation
- Class name: ApplyRegionalIPAdapters
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

‘ApplyRegionalIPAdapters’节点旨在将一组区域性IP适配器集成并应用于给定的模型管道中。它通过动态地根据指定区域整合各种适配器来简化增强模型功能的过程。该节点旨在优化模型针对特定区域特征的性能，从而提高模型输出的准确性和相关性。

# Input types
## Required
- ipadapter_pipe
    - ‘ipadapter_pipe’参数是将IP适配器集成管道传递给节点的关键通道。它包含了包括IP适配器本身、模型和其他辅助工具在内的必要组件，这些组件对于节点有效地执行其区域适功能至关重要。
    - Comfy dtype: TUPLE
    - Python dtype: Tuple[IPAdapter, Model, ClipVision, InsightFace, LoraLoader]
## Optional
- regional_ipadapter1
    - ‘regional_ipadapter1’参数允许根据区域需求定制IP适配器。它提供了灵活性，以更好地适应特定区域环境，从而增强模型的功能，提高节点的适应性和有效性。
    - Comfy dtype: REGIONAL_IPADAPTER
    - Python dtype: RegionalIPAdapter

# Output types
- MODEL
    - 输出‘MODEL’代表已经用区域性IP适配器进行了适配的模型。它标志着节点处理的完成，此时模型已经能够更加熟练地处理区域特定的任务。
    - Comfy dtype: MODEL
    - Python dtype: Model

# Usage tips
- Infra type: CPU

# Source code
```
class ApplyRegionalIPAdapters:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ipadapter_pipe': ('IPADAPTER_PIPE',), 'regional_ipadapter1': ('REGIONAL_IPADAPTER',)}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Regional'

    def doit(self, **kwargs):
        ipadapter_pipe = kwargs['ipadapter_pipe']
        (ipadapter, model, clip_vision, insightface, lora_loader) = ipadapter_pipe
        del kwargs['ipadapter_pipe']
        for (k, v) in kwargs.items():
            ipadapter_pipe = (ipadapter, model, clip_vision, insightface, lora_loader)
            model = v.doit(ipadapter_pipe)
        return (model,)
```