# Documentation
- Class name: pipeIn
- Category: EasyUse/Pipe
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

pipeIn节点作为数据流的中心通道，促进信息在管道中的过渡和转换。它旨在通过集成各种输入并管理它们在系统内的路由来简化数据处理流程。该节点的主要功能是确保必要的组件被有效传递，使得后续操作能够按预期执行。

# Input types
## Required
- pipe
    - pipe参数至关重要，因为它代表了pipeIn节点的主要数据和指令来源。它包含了所有必要的元素，如模型、条件数据以及其他相关信息，这些信息决定了节点的操作和结果。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
## Optional
- model
    - model参数非常重要，因为它定义了pipeIn节点处理中将使用的核心算法或神经网络架构。这对于节点的正确功能和产生准确结果至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- pos
    - 正面条件数据，称为'pos'，在指导pipeIn节点的行为方面起着至关重要的作用。它为模型提供了必要的上下文，以便以期望的方式生成或处理数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- neg
    - 负面条件数据，或'neg'，同样重要，因为它为模型的输出设定了边界。它帮助节点完善其操作，并确保结果与预期结果一致。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- latent
    - latent参数在处理未观察到的或潜在的数据时非常关键。它使得pipeIn节点能够将隐藏变量纳入其处理中，这可以显著影响最终输出。
    - Comfy dtype: LATENT
    - Python dtype: Any
- vae
    - vae参数对于节点在编码和解码数据方面的功能至关重要。它代表了变分自编码器模型，对于pipeIn节点执行与数据压缩和生成相关的任务非常必要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- clip
    - 当pipeIn节点需要将生成的数据与特定上下文或内容对齐时，clip参数非常重要。它集成了CLIP模型，这对于理解和生成与给定描述匹配的图像或文本至关重要。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- image
    - 当pipeIn节点涉及视觉数据处理时，image参数是必不可少的。它携带了节点将操作或分析的视觉信息，以实现期望的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- xyplot
    - xyplot参数用于定义pipeIn节点的绘图设置。它对于数据的视觉表示和分析很重要，允许节点产生有意义的可视化，帮助理解数据的结构和趋势。
    - Comfy dtype: XYPLOT
    - Python dtype: Any
- my_unique_id
    - my_unique_id参数是pipeIn节点实例的唯一标识符。它对于在复杂系统中跟踪和管理节点很重要，确保每个实例可以单独监控和控制。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- pipe
    - 输出pipe是经过pipeIn节点处理的精炼和结构化的数据集。它封装了节点执行过程中的结果和任何修改，作为管道内进一步操作或分析的基础。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class pipeIn:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'pipe': ('PIPE_LINE',), 'model': ('MODEL',), 'pos': ('CONDITIONING',), 'neg': ('CONDITIONING',), 'latent': ('LATENT',), 'vae': ('VAE',), 'clip': ('CLIP',), 'image': ('IMAGE',), 'xyPlot': ('XYPLOT',)}, 'hidden': {'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('pipe',)
    FUNCTION = 'flush'
    CATEGORY = 'EasyUse/Pipe'

    def flush(self, pipe=None, model=None, pos=None, neg=None, latent=None, vae=None, clip=None, image=None, xyplot=None, my_unique_id=None):
        model = model if model is not None else pipe.get('model')
        if model is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', 'Model missing from pipeLine')
        pos = pos if pos is not None else pipe.get('positive')
        if pos is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', 'Pos Conditioning missing from pipeLine')
        neg = neg if neg is not None else pipe.get('negative')
        if neg is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', 'Neg Conditioning missing from pipeLine')
        vae = vae if vae is not None else pipe.get('vae')
        if vae is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', 'VAE missing from pipeLine')
        clip = clip if clip is not None else pipe.get('clip')
        if clip is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', 'Clip missing from pipeLine')
        if latent is not None:
            samples = latent
        elif image is None:
            samples = pipe.get('samples') if pipe is not None else None
            image = pipe.get('images') if pipe is not None else None
        elif image is not None:
            if pipe is None:
                batch_size = 1
            else:
                batch_size = pipe['loader_settings']['batch_size'] if 'batch_size' in pipe['loader_settings'] else 1
            samples = {'samples': vae.encode(image[:, :, :, :3])}
            samples = RepeatLatentBatch().repeat(samples, batch_size)[0]
        if pipe is None:
            pipe = {'loader_settings': {'positive': '', 'negative': '', 'xyplot': None}}
        xyplot = xyplot if xyplot is not None else pipe['loader_settings']['xyplot'] if xyplot in pipe['loader_settings'] else None
        new_pipe = {**pipe, 'model': model, 'positive': pos, 'negative': neg, 'vae': vae, 'clip': clip, 'samples': samples, 'images': image, 'seed': pipe.get('seed') if pipe is not None and 'seed' in pipe else None, 'loader_settings': {**pipe['loader_settings'], 'xyplot': xyplot}}
        del pipe
        return (new_pipe,)
```