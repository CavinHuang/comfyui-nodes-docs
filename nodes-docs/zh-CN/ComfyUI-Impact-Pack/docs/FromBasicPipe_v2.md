# Documentation
- Class name: FromBasicPipe_v2
- Category: ImpactPack/Pipe
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

FromBasicPipe_v2节点的'doit'方法旨在从给定的基本管道中处理并返回结构化输出。它封装了ImpactPack中数据流的精髓，确保了模型、剪辑和VAE等必要组件为下游任务准备就绪。

# Input types
## Required
- basic_pipe
    - ‘basic_pipe’参数是节点的关键输入，因为它代表了包含处理所必需的基本元素的基础管道。它对节点的执行至关重要，并直接影响操作的结果。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, ...]

# Output types
- basic_pipe
    - ‘basic_pipe’输出是输入的反映，标志着节点操作中成功处理和保留基础管道。它是依赖于初始数据结构完整性的后续任务的关键组件。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, ...]
- model
    - ‘model’输出表示从基础管道派生的机器学习模型，对于系统内的预测分析和决策过程至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - ‘clip’输出代表了一个可能涉及数据特征操作或提取的组件，在节点的整体功能中扮演着重要角色。
    - Comfy dtype: CLIP
    - Python dtype: Any
- vae
    - ‘vae’输出标志着节点中存在变分自编码器，这对于涉及无监督学习和数据降维的任务至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- positive
    - ‘positive’输出表明了一个正向调节因素，可能用于指导或影响节点内后续过程的行为。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - ‘negative’输出对应于一个负向调节因素，这在控制或修改后续操作的方向上可能至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class FromBasicPipe_v2:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'basic_pipe': ('BASIC_PIPE',)}}
    RETURN_TYPES = ('BASIC_PIPE', 'MODEL', 'CLIP', 'VAE', 'CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('basic_pipe', 'model', 'clip', 'vae', 'positive', 'negative')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Pipe'

    def doit(self, basic_pipe):
        (model, clip, vae, positive, negative) = basic_pipe
        return (basic_pipe, model, clip, vae, positive, negative)
```