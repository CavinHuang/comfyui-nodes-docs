# Documentation
- Class name: FromDetailerPipe
- Category: ImpactPack/Pipe
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

FromDetailerPipe节点的'doit'方法旨在编排从细节化管道中提取和组织各种组件。它作为将模型、剪辑和检测器等不同元素集成到冲击分析工作流程后续阶段的管道。

# Input types
## Required
- detailer_pipe
    - 参数'detailer_pipe'是必需的，因为它提供了包含节点工作所需所有组件的输入管道。它是节点提取模型、剪辑和其他相关数据以进行进一步处理的主要来源。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: Tuple[Any, ...]

# Output types
- model
    - 'model'输出代表管道内使用的计算模型的核心，它在数据分析和处理中起着关键作用。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 'clip'输出是生成和操作视觉表示的关键组件，通常与模型一起用于特征提取。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- vae
    - 'vae'输出表示变分自编码器模型，它对于涉及数据表示编码和解码的任务至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- positive
    - 'positive'输出作为条件数据的一种形式，对后续模型或算法的行为产生积极影响。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - 'negative'输出与'positive'输出类似，但提供的条件数据对模型的行为产生负面影响。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- bbox_detector
    - 'bbox_detector'输出负责识别和定位图像内的兴趣区域，通常用于目标检测任务。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: torch.nn.Module
- sam_model_opt
    - 'sam_model_opt'输出指的是一个可选的场景感知模型，它可以用于更复杂的场景分析和理解。
    - Comfy dtype: SAM_MODEL
    - Python dtype: Optional[torch.nn.Module]
- segm_detector_opt
    - 'segm_detector_opt'输出是图像分割的可选组件，有助于需要详细图像分析的任务。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: Optional[torch.nn.Module]
- detailer_hook
    - 'detailer_hook'输出是一个额外的钩子，可用于扩展或定制节点的功能以适应特定用例。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class FromDetailerPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'detailer_pipe': ('DETAILER_PIPE',)}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', 'CONDITIONING', 'CONDITIONING', 'BBOX_DETECTOR', 'SAM_MODEL', 'SEGM_DETECTOR', 'DETAILER_HOOK')
    RETURN_NAMES = ('model', 'clip', 'vae', 'positive', 'negative', 'bbox_detector', 'sam_model_opt', 'segm_detector_opt', 'detailer_hook')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Pipe'

    def doit(self, detailer_pipe):
        (model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, _, _, _, _) = detailer_pipe
        return (model, clip, vae, positive, negative, bbox_detector, sam_model_opt, segm_detector_opt, detailer_hook)
```