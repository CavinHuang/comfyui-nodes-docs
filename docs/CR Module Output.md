# Documentation
- Class name: CR_ModuleOutput
- Category: Comfyroll/Pipe/Module
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ModuleOutput是一个旨在管理和修改流水线输出的节点，确保根据特定条件和输入来指导和优化数据流。

# Input types
## Required
- pipe
    - pipe参数是必要的，因为它代表了正在被节点处理和转换的主要数据流。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple
## Optional
- model
    - model参数允许调整流水线中的底层模型，影响节点的处理能力。
    - Comfy dtype: MODEL
    - Python dtype: Any
- pos
    - pos参数作为一个调节输入，根据积极强化或期望的结果来精炼输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- neg
    - neg参数引入了负面调节，使节点能够避免输出中不希望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- latent
    - latent参数用于将潜变量纳入节点的操作中，为输出增加了复杂性和细微差别。
    - Comfy dtype: LATENT
    - Python dtype: Any
- vae
    - vae参数用于整合变分自编码器功能，增强节点处理无监督学习任务的能力。
    - Comfy dtype: VAE
    - Python dtype: Any
- clip
    - clip参数使节点能够应用CLIP模型特性，提高输出中的上下文理解和生成能力。
    - Comfy dtype: CLIP
    - Python dtype: Any
- controlnet
    - controlnet参数用于引入控制机制，可以指导节点的行为并精炼其输出。
    - Comfy dtype: CONTROL_NET
    - Python dtype: Any
- image
    - image参数允许节点纳入视觉数据，增强输出的多模态能力。
    - Comfy dtype: IMAGE
    - Python dtype: Any
- seed
    - seed参数对于确保节点随机操作的可复现性和一致性至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- pipe
    - 输出pipe是输入的修改版，现已优化并定制以满足节点设定的特定要求和条件。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Tuple
- show_help
    - show_help输出提供了一个参考链接到文档，以便进一步理解和指导使用该节点。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ModuleOutput:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',)}, 'optional': {'model': ('MODEL',), 'pos': ('CONDITIONING',), 'neg': ('CONDITIONING',), 'latent': ('LATENT',), 'vae': ('VAE',), 'clip': ('CLIP',), 'controlnet': ('CONTROL_NET',), 'image': ('IMAGE',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('PIPE_LINE', 'STRING')
    RETURN_NAMES = ('pipe', 'show_help')
    FUNCTION = 'pipe_output'
    CATEGORY = icons.get('Comfyroll/Pipe/Module')

    def pipe_output(self, pipe, model=None, pos=None, neg=None, latent=None, vae=None, clip=None, controlnet=None, image=None, seed=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pipe-Nodes#cr-module-output'
        (new_model, new_pos, new_neg, new_latent, new_vae, new_clip, new_controlnet, new_image, new_seed) = pipe
        if model is not None:
            new_model = model
        if pos is not None:
            new_pos = pos
        if neg is not None:
            new_neg = neg
        if latent is not None:
            new_latent = latent
        if vae is not None:
            new_vae = vae
        if clip is not None:
            new_clip = clip
        if controlnet is not None:
            new_controlnet = controlnet
        if image is not None:
            new_image = image
        if seed is not None:
            new_seed = seed
        pipe = (new_model, new_pos, new_neg, new_latent, new_vae, new_clip, new_controlnet, new_image, new_seed)
        return (pipe, show_help)
```