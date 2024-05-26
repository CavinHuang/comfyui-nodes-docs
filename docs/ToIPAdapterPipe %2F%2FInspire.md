# Documentation
- Class name: ToIPAdapterPipe
- Category: InspirePack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

ToIPAdapterPipe 是一个旨在促进各种图像处理模型和适配器集成的节点。它通过管道编排数据流，确保图像在传递到下一阶段之前由指定的模型适当处理。该节点旨在简化图像处理工作流程，提高效率，并允许在统一的管道中无缝使用不同的模型。

# Input types
## Required
- ipadapter
    - ipadapter 参数对于节点的操作至关重要，因为它定义了用于图像预处理的特定适配器。它在确保输入图像正确格式化并准备好由管道中的后续模型处理中起着关键作用。
    - Comfy dtype: IPADAPTER
    - Python dtype: torch.nn.Module
- model
    - model 输入是必不可少的，因为它代表了节点将使用的图像处理核心模型。它是执行所需图像转换的主要组件，对节点的功能至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip_vision
    - clip_vision 参数是可选的，但可以用来将额外的基于视觉的处理能力集成到管道中。它扩展了节点的功能，允许进行更复杂和多样化的图像分析任务。
    - Comfy dtype: CLIP_VISION
    - Python dtype: torch.nn.Module
- insightface
    - 当提供 insightface 参数时，可以使节点在其处理管道中包含面部识别功能。这对于需要通过面部特征识别或验证个人的应用尤其有用。
    - Comfy dtype: INSIGHTFACE
    - Python dtype: torch.nn.Module

# Output types
- IPADAPTER_PIPE
    - IPADAPTER_PIPE 输出封装了数据在通过节点管道后的处理结果。它代表了图像处理任务的完成，并已准备好用于进一步使用或分析。
    - Comfy dtype: IPADAPTER_PIPE
    - Python dtype: Tuple[torch.nn.Module, torch.nn.Module, torch.nn.Module, Optional[torch.nn.Module], Callable]

# Usage tips
- Infra type: GPU

# Source code
```
class ToIPAdapterPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ipadapter': ('IPADAPTER',), 'model': ('MODEL',)}, 'optional': {'clip_vision': ('CLIP_VISION',), 'insightface': ('INSIGHTFACE',)}}
    RETURN_TYPES = ('IPADAPTER_PIPE',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Util'

    def doit(self, ipadapter, model, clip_vision, insightface=None):
        pipe = (ipadapter, model, clip_vision, insightface, lambda x: x)
        return (pipe,)
```