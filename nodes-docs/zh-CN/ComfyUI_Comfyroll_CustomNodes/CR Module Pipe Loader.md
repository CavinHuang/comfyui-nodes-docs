# Documentation
- Class name: CR_ModulePipeLoader
- Category: Comfyroll/Pipe/Module
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ModulePipeLoader 是一个旨在将各种模型和数据类型统一加载和集成到一个管道中的节点。它便于模型、潜在表示和其他条件因素的无缝处理，使得复杂的操作能够以结构化和高效的方式执行。

# Input types
## Optional
- model
    - 模型参数对于定义节点操作的核心算法结构至关重要。它决定了要加载的模型类型，因此显著影响节点的处理能力和结果。
    - Comfy dtype: MODEL
    - Python dtype: Union[str, Path]
- pos
    - 正向调节输入对于需要方向性指导或增强的节点至关重要。它提供了一个正向参考，有助于将节点的功能引导至期望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[str, List[str]]
- neg
    - 负向调节参数作为正向输入的平衡，允许节点通过纳入抑制信号来微调其响应并避免不希望的效果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[str, List[str]]
- latent
    - 潜在表示对于处理降维或特征提取的节点至关重要。此参数使节点能够使用压缩的数据表示，提高数据处理的效率。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor, List[torch.Tensor]]
- vae
    - 变分自编码器（VAE）参数对于使用生成模型进行数据合成的节点至关重要。它允许节点利用VAE的能力来创建新的数据实例。
    - Comfy dtype: VAE
    - Python dtype: Union[str, Path]
- clip
    - CLIP参数对于使用多模态学习方法的节点至关重要，特别是涉及视觉和文本数据的任务。它使节点能够整合CLIP模型以增强跨模态交互。
    - Comfy dtype: CLIP
    - Python dtype: Union[str, Path]
- controlnet
    - 控制网参数对于需要结构化控制流或条件执行路径的节点至关重要。它提供了一个基于预定义条件管理节点操作逻辑的框架。
    - Comfy dtype: CONTROL_NET
    - Python dtype: Union[str, Path]
- image
    - 图像输入对于处理视觉数据的节点是基础性的。它允许节点摄取和操作视觉内容，这对于广泛的基于图像的应用至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, Path, PIL.Image]
- seed
    - 种子参数通过为随机数生成提供固定点来确保结果的可复现性。在需要一致结果的随机过程中，它尤其重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- pipe
    - 管道输出代表了构建的管道，它封装了提供给节点的所有输入和设置。它是系统内进一步处理或分析的关键组件。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple[Any, ...]
- show_help
    - show_help 输出提供了指向节点文档的链接，为用户提供了如何有效使用该节点的指导。它是了解节点功能和潜在用例的重要资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ModulePipeLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'model': ('MODEL',), 'pos': ('CONDITIONING',), 'neg': ('CONDITIONING',), 'latent': ('LATENT',), 'vae': ('VAE',), 'clip': ('CLIP',), 'controlnet': ('CONTROL_NET',), 'image': ('IMAGE',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('PIPE_LINE', 'STRING')
    RETURN_NAMES = ('pipe', 'show_help')
    FUNCTION = 'pipe_input'
    CATEGORY = icons.get('Comfyroll/Pipe/Module')

    def pipe_input(self, model=0, pos=0, neg=0, latent=0, vae=0, clip=0, controlnet=0, image=0, seed=0):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-module-pipe-loader'
        pipe_line = (model, pos, neg, latent, vae, clip, controlnet, image, seed)
        return (pipe_line, show_help)
```