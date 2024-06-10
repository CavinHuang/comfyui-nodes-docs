# Documentation
- Class name: pipeOut
- Category: EasyUse/Pipe
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

pipeOut节点旨在简化流水线的输出过程，确保结果被高效管理和组织。它作为处理各种数据类型的中心枢纽，促进了从处理到分析或存储的过渡。通过处理数据流的最后阶段，该节点保持了输出的完整性和可访问性。

# Input types
## Required
- pipe
    - ‘pipe’参数至关重要，它代表从中提取和管理数据的流水线。它是节点的主要信息来源，决定了输出的类型和结构。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
## Optional
- my_unique_id
    - ‘my_unique_id’参数作为跟踪和关联特定输出与唯一请求或进程的标识符。它有助于系统内数据的组织和检索。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- pipe
    - ‘pipe’输出是处理后数据的全面集合，包含了流水线中的所有结果。它是节点功能的结晶，提供了一个结构化和组织良好的数据集，供进一步使用。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- model
    - ‘model’输出代表了在流水线中使用的机器学习或神经网络模型。它是理解处理数据的基础和所采用方法的关键组成部分。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- pos
    - ‘pos’输出由正向调节数据组成，用于指导和完善模型的预测。它在生成过程中起着关键作用，确保输出与期望结果一致。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Any]
- neg
    - ‘neg’输出包含负向调节数据，用于对比和过滤掉模型预测中不希望的结果。它是保持输出质量和相关性的重要部分。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Any]
- latent
    - ‘latent’输出代表从模型中派生出的中间表示或嵌入。这些潜在特征对于理解数据的底层结构至关重要，可以用于进一步的分析或处理。
    - Comfy dtype: LATENT
    - Python dtype: List[torch.Tensor]
- vae
    - ‘vae’输出指的是流水线中的变化自编码器组件，负责从学习到的潜在空间生成新的数据点。它是创造新颖和多样化输出的关键创新。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- clip
    - ‘clip’输出来自CLIP模型，用于多模态理解和生成。它通过为输出提供上下文和意义来增强节点的能力。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- image
    - ‘image’输出由视觉数据组成，是模型处理的直接结果。它的重要性在于提供了数据的有形和视觉表示，允许立即进行解释和分析。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]
- seed
    - ‘seed’输出是一个数值，用于确保生成过程中的可重复性和一致性。它对于调试和保持输出的可靠性至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class pipeOut:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',)}, 'hidden': {'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE', 'MODEL', 'CONDITIONING', 'CONDITIONING', 'LATENT', 'VAE', 'CLIP', 'IMAGE', 'INT')
    RETURN_NAMES = ('pipe', 'model', 'pos', 'neg', 'latent', 'vae', 'clip', 'image', 'seed')
    FUNCTION = 'flush'
    CATEGORY = 'EasyUse/Pipe'

    def flush(self, pipe, my_unique_id=None):
        model = pipe.get('model')
        pos = pipe.get('positive')
        neg = pipe.get('negative')
        latent = pipe.get('samples')
        vae = pipe.get('vae')
        clip = pipe.get('clip')
        image = pipe.get('images')
        seed = pipe.get('seed')
        return (pipe, model, pos, neg, latent, vae, clip, image, seed)
```