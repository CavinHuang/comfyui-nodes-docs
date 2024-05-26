# Documentation
- Class name: CR_ModuleInput
- Category: Comfyroll/Pipe/Module
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ModuleInput 是一个用于处理和处理模块输入数据的节点。它在初始化和管理数据通过系统流动中起着关键作用，确保必要的组件被输入到模块操作的后续阶段。

# Input types
## Required
- pipe
    - “pipe”参数是必需的，因为它代表了节点操作的主要数据结构。正是通过这个参数，节点接收输入数据，然后这些数据在模块的工作流程中被处理和使用。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[Any, ...]

# Output types
- pipe
    - “pipe”输出是数据流的延续，封装了输入阶段的所有处理信息。它作为数据传递给后续节点或模块组件的通道。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[Any, ...]
- model
    - “model”输出表示节点在模块操作中可能使用的机器学习或AI模型。它是模块设计执行的任何预测或分析任务的关键组件。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- pos
    - “pos”输出代表正面条件数据，可用于引导模块内的生成或处理朝着更有利的结果发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- neg
    - “neg”输出表示负面条件数据，用于引导模块的操作远离不希望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- latent
    - “latent”输出指的是数据的潜在空间表示，在许多机器学习模型中是一个关键概念，特别是在生成模型的上下文中。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - “vae”输出与模块中的变分自编码器组件相关，它在编码和解码潜在空间内的信息中起着重要作用。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- clip
    - “clip”输出涉及模块内CLIP模型的集成，它有助于将生成的内容与文本描述对齐。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- controlnet
    - “controlnet”输出代表了模块内的控制网络，它负责管理生成过程的方向和重点。
    - Comfy dtype: CONTROL_NET
    - Python dtype: torch.nn.Module
- image
    - “image”输出是数据的视觉表示，通常是模块图像生成或处理任务的最终结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- seed
    - “seed”输出提供了用于初始化随机数生成器的随机数或种子，确保随机过程中的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - “show_help”输出是指向节点文档的URL链接，为用户提供了如何有效使用该节点的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ModuleInput:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',)}}
    RETURN_TYPES = ('PIPE_LINE', 'MODEL', 'CONDITIONING', 'CONDITIONING', 'LATENT', 'VAE', 'CLIP', 'CONTROL_NET', 'IMAGE', 'INT', 'STRING')
    RETURN_NAMES = ('pipe', 'model', 'pos', 'neg', 'latent', 'vae', 'clip', 'controlnet', 'image', 'seed', 'show_help')
    FUNCTION = 'flush'
    CATEGORY = icons.get('Comfyroll/Pipe/Module')

    def flush(self, pipe):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-module-input'
        (model, pos, neg, latent, vae, clip, controlnet, image, seed) = pipe
        return (pipe, model, pos, neg, latent, vae, clip, controlnet, image, seed, show_help)
```