# Documentation
- Class name: FromBasicPipe
- Category: ImpactPack/Pipe
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

FromBasicPipe 节点的 'doit' 方法是数据处理管道中的关键通道，负责提取和组织模型、剪辑和变分自编码器（VAE）等核心元素。它确保必要的数据结构被高效地检索和准备，以便在工作流程中无缝集成不同的数据组件。

# Input types
## Required
- basic_pipe
    - 'basic_pipe' 参数对于 'doit' 方法至关重要，因为它包含了节点操作所需的基础数据结构。它作为一个通道，通过它模型、剪辑和 VAE 组件被引导，突出了它在使节点有效运行中的关键作用。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, Any, Any, Any, Any]

# Output types
- model
    - 'model' 输出表示节点数据处理框架中的关键组件，代表对节点功能至关重要的机器学习模型。它在塑造节点对工作流程的整体贡献中起着重要作用，强调了其在数据管道中的重要性。
    - Comfy dtype: MODEL
    - Python dtype: Any
- clip
    - 'clip' 输出代表了对节点操作至关重要的数据片段。它用于提取和操作信息的特定部分，强调了它在节点有效处理和管理数据能力中的重要性。
    - Comfy dtype: CLIP
    - Python dtype: Any
- vae
    - 'vae' 输出表示节点架构中存在变分自编码器，是编码和解码数据表示的关键组件。它的包含对于节点转换和解释复杂数据结构的能力至关重要。
    - Comfy dtype: VAE
    - Python dtype: Any
- positive
    - 'positive' 输出表明了一个用于引导节点处理逻辑的条件因素。它在引导节点生成期望结果方面扮演着重要角色，突出了它在节点操作中的战略重要性。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - 'negative' 输出代表了对节点决策过程至关重要的相反条件因素。它在定义节点操作的边界并确保节点的执行与预期目标一致方面至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class FromBasicPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'basic_pipe': ('BASIC_PIPE',)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', 'CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('model', 'clip', 'vae', 'positive', 'negative')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Pipe'

    def doit(self, basic_pipe):
        (model, clip, vae, positive, negative) = basic_pipe
        return (model, clip, vae, positive, negative)
```