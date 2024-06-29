# Documentation
- Class name: ToBasicPipe
- Category: ImpactPack/Pipe
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ToBasicPipe节点旨在简化模型操作的基本流水线的组装过程。它高效地将模型、clip、VAE和条件输入等各个组件结合成一个连贯的结构，便于执行后续任务。

# Input types
## Required
- model
    - 模型参数对于节点的功能至关重要，因为它代表了用于处理输入数据的核心算法组件。它对于节点产生有意义的结果至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip参数在节点的操作中起着重要作用，它为模型的处理定义了视觉上下文。它是节点解释和操作视觉数据能力的一个不可分割的部分。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- vae
    - VAE参数对于节点至关重要，因为它涉及变分自编码器组件，这对于生成或处理数据的潜在表示至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- positive
    - 正参数对节点很重要，因为它提供了引导模型行为朝向期望结果的正向条件输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - 负参数对节点至关重要，因为它提供了帮助通过引导模型远离不希望的结果来细化模型输出的负向条件输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor

# Output types
- basic_pipe
    - basic_pipe输出是节点的主要结果，将组合的组件封装成单一的、连贯的流水线，准备进行进一步的处理或分析。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, torch.Tensor, torch.nn.Module, torch.Tensor, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class ToBasicPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'vae': ('VAE',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',)}}
    RETURN_TYPES = ('BASIC_PIPE',)
    RETURN_NAMES = ('basic_pipe',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Pipe'

    def doit(self, model, clip, vae, positive, negative):
        pipe = (model, clip, vae, positive, negative)
        return (pipe,)
```