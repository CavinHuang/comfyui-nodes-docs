# Documentation
- Class name: FromDetailerPipe_v2
- Category: ImpactPack/Pipe
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

FromDetailerPipe_v2节点旨在协调复杂处理管道中的信息和资源流动。它作为模型、检测器和钩子等各个组件的通道，确保它们在系统中得到适当的集成和利用。该节点在简化操作和提高管道整体效率方面发挥着关键作用。

# Input types
## Required
- detailer_pipe
    - detailer_pipe参数至关重要，因为它封装了节点操作所需的核心组件。它作为一个管道，向节点提供必要的数据和配置以进行处理。有效处理此参数对于节点有效运作并实现其预期目的至关重要。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: Tuple[Any, ...]

# Output types
- detailer_pipe
    - 输出的detailer_pipe是一个关键元素，它封装了处理后的数据和配置，准备传递给管道的后续阶段。它代表了节点处理的成果，对于保持工作流程的连续性和完整性至关重要。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: Tuple[Any, ...]
- model
    - 模型输出表示管道中使用的机器学习或统计模型。它是一个基本组件，为系统的分析能力做出贡献，允许根据输入数据进行预测、分类或其他推断。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip输出表示已提取用于特定分析或处理的数据片段或部分。它是节点操作中的一个重要元素，通常用于需要完整数据子集的专注任务。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- vae
    - vae输出指的是变分自编码器，这是一种能够学习和将数据编码成低维表示的神经网络类型。它通过提供压缩和解压缩信息的有效手段，在节点的功能中扮演着重要角色。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- positive
    - positive输出表示影响节点处理的一组正面条件或因素。它用于引导节点在系统中生成或识别期望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - negative输出表示在节点操作期间考虑的一组负面条件或因素。它通过提供与正面条件的对比，有助于完善节点的决策过程。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- bbox_detector
    - bbox_detector输出负责识别和定位图像或数据集中的兴趣区域。它是需要对象检测或空间感知的任务的关键组件。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: torch.nn.Module
- sam_model_opt
    - sam_model_opt输出指的是样本模型的可选实例，可能用于管道内采样或生成数据点。它通过允许结合采样技术，为节点的能力增加了灵活性。
    - Comfy dtype: SAM_MODEL
    - Python dtype: Optional[torch.nn.Module]
- segm_detector_opt
    - segm_detector_opt输出是一个可选组件，专门用于将图像或数据的部分进行分割以进行进一步分析。它通过启用对视觉或结构化数据的更细粒度处理，增强了节点的功能。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: Optional[torch.nn.Module]
- detailer_hook
    - detailer_hook输出是一个可定制的钩子，允许将额外的功能或扩展集成到节点中。它提供了一种方法，可以根据特定的用例或要求定制节点的行为。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: Callable[..., Any]

# Usage tips
- Infra type: CPU

# Source code
```
class FromDetailerPipe_v2:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'detailer_pipe': ('DETAILER_PIPE',)}}
    RETURN_TYPES = ('DETAILER_PIPE', 'MODEL', 'CLIP', 'VAE', 'CONDITIONING', 'CONDITIONING', 'BBOX_DETECTOR', 'SAM_MODEL', 'SEGM_DETECTOR', 'DETAILER_HOOK')
    RETURN_NAMES = ('detailer_pipe', 'model', 'clip', 'vae', 'positive', 'negative', 'bbox_detector', 'sam_model_opt', 'segm_detector_opt', 'detailer_hook')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Pipe'

    def doit(self, detailer_pipe):
        (model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, _, _, _, _) = detailer_pipe
        return (detailer_pipe, model, clip, vae, positive, negative, bbox_detector, sam_model_opt, segm_detector_opt, detailer_hook)
```