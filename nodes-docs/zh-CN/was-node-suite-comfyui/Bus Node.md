# Documentation
- Class name: WAS_Bus
- Category: WAS Suite/Utilities
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Bus节点作为WAS套件中管理和协调各种组件的中心枢纽。它确保模型、剪辑和其他实用工具在系统的不同部分之间高效传递，促进无缝工作流程。

# Input types
## Optional
- bus
    - “bus”参数作为一个容器，持有模型、剪辑、vae、正向和负向等可选元素。它对节点的操作至关重要，因为它允许将相关组件捆绑在一起，从而提高系统内部数据传输的效率。
    - Comfy dtype: TUPLE[None, None, None, None, None]
    - Python dtype: Tuple[Optional[Any], Optional[Any], Optional[Any], Optional[Any], Optional[Any]]
- model
    - “model”参数是节点功能的关键，因为它代表了核心的机器学习组件。它用于处理和分析数据，其存在对于节点成功执行其任务至关重要。
    - Comfy dtype: MODEL
    - Python dtype: Optional[torch.nn.Module]
- clip
    - “clip”参数非常重要，因为它涉及节点操作的多媒体方面。它对于处理和管理视频或音频剪辑至关重要，这些通常是处理流程的关键部分。
    - Comfy dtype: CLIP
    - Python dtype: Optional[Any]
- vae
    - “vae”参数对于节点执行高级数据处理任务的能力至关重要。它代表了一种生成模型，对于创建和操作数据表示至关重要。
    - Comfy dtype: VAE
    - Python dtype: Optional[Any]
- positive
    - “positive”参数在节点的条件处理能力中起着至关重要的作用。它提供了关于期望结果的指导，引导节点的操作朝着实现特定结果的方向前进。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[Any]
- negative
    - “negative”参数是节点过滤掉不需要的元素或结果的能力的关键。它通过指定操作中应避免或排除的内容，有助于完善节点的处理。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[Any]

# Output types
- bus
    - “bus”输出封装了处理过的组件，提供了一种结构化的方式来访问模型、剪辑、vae和条件元素。它很重要，因为它允许有组织地检索和进一步使用这些组件。
    - Comfy dtype: TUPLE[MODEL, CLIP, VAE, CONDITIONING, CONDITIONING]
    - Python dtype: Tuple[torch.nn.Module, Any, Any, Any, Any]
- model
    - “model”输出是处理过的机器学习组件，准备用于进一步分析或用于后续任务。它是节点输出的关键元素，因为它携带了从输入数据派生的计算智能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - “clip”输出代表已经被节点处理或增强的多媒体数据。对于需要音频或视频操作和分析的应用程序来说，它非常重要。
    - Comfy dtype: CLIP
    - Python dtype: Any
- vae
    - “vae”输出是在节点操作中使用过的生成模型。它对于生成新数据实例或执行数据增强任务很重要。
    - Comfy dtype: VAE
    - Python dtype: Any
- positive
    - “positive”输出反映了用来引导节点朝向期望结果的指导。对于需要基于特定标准进行条件处理的应用程序来说，它至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - “negative”输出表示根据节点操作过滤掉或排除的元素。对于涉及移除或避免某些数据点的应用程序来说，它很重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Bus:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'bus': ('BUS',), 'model': ('MODEL',), 'clip': ('CLIP',), 'vae': ('VAE',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',)}}
    RETURN_TYPES = ('BUS', 'MODEL', 'CLIP', 'VAE', 'CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('bus', 'model', 'clip', 'vae', 'positive', 'negative')
    FUNCTION = 'bus_fn'
    CATEGORY = 'WAS Suite/Utilities'

    def bus_fn(self, bus=(None, None, None, None, None), model=None, clip=None, vae=None, positive=None, negative=None):
        (bus_model, bus_clip, bus_vae, bus_positive, bus_negative) = bus
        out_model = model or bus_model
        out_clip = clip or bus_clip
        out_vae = vae or bus_vae
        out_positive = positive or bus_positive
        out_negative = negative or bus_negative
        out_bus = (out_model, out_clip, out_vae, out_positive, out_negative)
        if not out_model:
            raise ValueError('Either model or bus containing a model should be supplied')
        if not out_clip:
            raise ValueError('Either clip or bus containing a clip should be supplied')
        if not out_vae:
            raise ValueError('Either vae or bus containing a vae should be supplied')
        return (out_bus, out_model, out_clip, out_vae, out_positive, out_negative)
```