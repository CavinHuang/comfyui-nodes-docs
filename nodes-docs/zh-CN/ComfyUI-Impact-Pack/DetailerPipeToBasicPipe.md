# Documentation
- Class name: DetailerPipeToBasicPipe
- Category: ImpactPack/Pipe
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

DetailerPipeToBasicPipe节点旨在将详细的管道结构转换为更基本的形式。它通过提取详细管道的基本组成部分并将它们重新格式化为标准、更易于管理的结构，在简化复杂数据处理工作流程中发挥着关键作用。

# Input types
## Required
- detailer_pipe
    - detailer_pipe参数对于节点的操作至关重要，因为它提供了需要转换的详细管道结构。它是主要的输入参数，决定了节点的处理和输出的形成。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: Tuple[torch.nn.Module, torch.Tensor, torch.nn.Module, torch.Tensor, torch.Tensor]

# Output types
- base_basic_pipe
    - base_basic_pipe是输入管道的简化版本，专注于基本操作所需的核心元素。它很重要，因为它允许流程化处理和更容易地集成到更广泛的系统中。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, torch.Tensor, torch.nn.Module, torch.Tensor, torch.Tensor]
- refiner_basic_pipe
    - refiner_basic_pipe是另一个输出，它代表从详细结构派生出的精炼的基本管道。对于需要更专注和优化处理管道的应用来说，它是必不可少的。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, torch.Tensor, torch.nn.Module, torch.Tensor, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class DetailerPipeToBasicPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'detailer_pipe': ('DETAILER_PIPE',)}}
    RETURN_TYPES = ('BASIC_PIPE', 'BASIC_PIPE')
    RETURN_NAMES = ('base_basic_pipe', 'refiner_basic_pipe')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Pipe'

    def doit(self, detailer_pipe):
        (model, clip, vae, positive, negative, _, _, _, _, _, refiner_model, refiner_clip, refiner_positive, refiner_negative) = detailer_pipe
        pipe = (model, clip, vae, positive, negative)
        refiner_pipe = (refiner_model, refiner_clip, vae, refiner_positive, refiner_negative)
        return (pipe, refiner_pipe)
```