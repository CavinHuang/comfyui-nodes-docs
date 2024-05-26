# Documentation
- Class name: EditBasicPipe
- Category: ImpactPack/Pipe
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

EditBasicPipe类的'doit'方法旨在修改基本管道的组成部分。它允许有选择性地用新值替换模型、剪辑、VAE和条件输入等元素，如果提供了新值。该方法的灵活性确保了管道可以根据特定需求进行调整，而不需要改变基础结构。

# Input types
## Required
- basic_pipe
    - 'basic_pipe'参数是一个包含管道核心元素的元组。它至关重要，因为它构成了修改的基础。该方法利用此输入来保留现有的结构或根据指定集成新组件。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, ...]
## Optional
- model
    - 'model'参数是一个可选输入，允许用户为管道指定一个新模型。如果提供，它将替换管道中的现有模型，从而实现定制以适应不同的分析或预测任务。
    - Comfy dtype: MODEL
    - Python dtype: Optional[Any]
- clip
    - 'clip'参数是另一个可以更新的可选元素。当管道需要不同的裁剪机制或与各种数据处理技术集成时，它特别有用。
    - Comfy dtype: CLIP
    - Python dtype: Optional[Any]
- vae
    - 'vae'参数允许在管道中包含或更新变分自编码器。这对于涉及降维或生成模型的任务可能非常重要。
    - Comfy dtype: VAE
    - Python dtype: Optional[Any]
- positive
    - 'positive'参数表示一个条件输入，如果必要可以被替换。当任务涉及强化学习或需要对模型行为进行特定指导时，它在管道中扮演着重要角色。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[Any]
- negative
    - 'negative'参数用于为管道指定一个负面条件输入。当模型需要从不应该做的事情的例子中学习时，这很重要，这对于某些类型的对比学习是必不可少的。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[Any]

# Output types
- basic_pipe
    - 输出'basic_pipe'是输入管道的修改版本，反映了对其组件所做的任何更新。它很重要，因为它代表了带有新配置的管道，准备用于进一步使用或部署。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, ...]

# Usage tips
- Infra type: CPU

# Source code
```
class EditBasicPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'basic_pipe': ('BASIC_PIPE',)}, 'optional': {'model': ('MODEL',), 'clip': ('CLIP',), 'vae': ('VAE',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',)}}
    RETURN_TYPES = ('BASIC_PIPE',)
    RETURN_NAMES = ('basic_pipe',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Pipe'

    def doit(self, basic_pipe, model=None, clip=None, vae=None, positive=None, negative=None):
        (res_model, res_clip, res_vae, res_positive, res_negative) = basic_pipe
        if model is not None:
            res_model = model
        if clip is not None:
            res_clip = clip
        if vae is not None:
            res_vae = vae
        if positive is not None:
            res_positive = positive
        if negative is not None:
            res_negative = negative
        pipe = (res_model, res_clip, res_vae, res_positive, res_negative)
        return (pipe,)
```