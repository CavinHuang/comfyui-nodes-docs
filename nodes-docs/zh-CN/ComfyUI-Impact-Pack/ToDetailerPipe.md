# Documentation
- Class name: ToDetailerPipe
- Category: ImpactPack/Pipe
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ToDetailerPipe节点旨在将输入数据转换为更详细和结构化的格式。它通过整合各种组件，如模型、剪辑和检测器，来提炼和增强数据的细节级别。此节点在准备数据进行进一步分析或可视化方面发挥着关键作用，确保数据满足必要的质量和细节标准。

# Input types
## Required
- model
    - 模型参数对于节点的操作至关重要，因为它定义了用于数据转换的主要算法框架。它直接影响节点处理和提炼输入数据的能力，确保输出满足预期的细节要求。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 剪辑参数是数据转换过程中的一个关键组件，它通过提供上下文信息和约束来协助数据转换。它确保转换遵循特定指南，从而维护输出数据的完整性和一致性。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- vae
    - VAE（变分自编码器）是节点架构中的一个重要元素，负责将数据编码和解码为潜在空间表示。它在细节增强过程中起着重要作用，使节点能够从输入数据生成详细且丰富的输出。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- positive
    - 正面参数作为节点操作的指导，提供了正面的示例或条件，输出应遵循这些条件。这对于确保节点的输出与期望的质量和细节标准一致至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[str]
- negative
    - 负面参数通过提供输出应避免的示例或条件，补充了正面参数。它对于引导节点生成符合所需标准且不包含不需要的特征的输出非常重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[str]
- bbox_detector
    - bbox_detector参数对于识别和定位输入数据中的兴趣区域至关重要。它有助于节点专注于特定区域，增强输出的细节和精度。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: Callable
- wildcard
    - 通配符参数允许动态和灵活的数据处理，使节点能够适应各种输入场景。它对于确保节点能够处理各种数据类型和格式非常重要，从而提高了其多功能性和实用性。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- Select to add LoRA
    - LoRA选择参数提供了将特定低秩适应（Low-Rank Adaptations）纳入节点处理流程的灵活性。这可以通过允许节点根据特定用例或需求调整其操作来增强节点的功能。
    - Comfy dtype: COMBO['Select the LoRA to add to the text', folder_paths.get_filename_list('loras')]
    - Python dtype: Union[str, None]
- Select to add Wildcard
    - 额外的通配符参数提供了在节点操作中包含更多动态元素的选项。它可以用来引入可变性，并根据不同的数据输入或处理需求调整节点的行为。
    - Comfy dtype: COMBO['Select the Wildcard to add to the text']
    - Python dtype: Union[str, None]

# Output types
- detailer_pipe
    - detailer_pipe输出代表了节点处理的成果，包含了详细和精炼的数据。它标志着节点成功执行，并为下游应用提供了一个结构化的格式。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: Tuple[Any, ...]

# Usage tips
- Infra type: CPU

# Source code
```
class ToDetailerPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'vae': ('VAE',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'bbox_detector': ('BBOX_DETECTOR',), 'wildcard': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'Select to add LoRA': (['Select the LoRA to add to the text'] + folder_paths.get_filename_list('loras'),), 'Select to add Wildcard': (['Select the Wildcard to add to the text'],)}, 'optional': {'sam_model_opt': ('SAM_MODEL',), 'segm_detector_opt': ('SEGM_DETECTOR',), 'detailer_hook': ('DETAILER_HOOK',)}}
    RETURN_TYPES = ('DETAILER_PIPE',)
    RETURN_NAMES = ('detailer_pipe',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Pipe'

    def doit(self, *args, **kwargs):
        pipe = (kwargs['model'], kwargs['clip'], kwargs['vae'], kwargs['positive'], kwargs['negative'], kwargs['wildcard'], kwargs['bbox_detector'], kwargs.get('segm_detector_opt', None), kwargs.get('sam_model_opt', None), kwargs.get('detailer_hook', None), kwargs.get('refiner_model', None), kwargs.get('refiner_clip', None), kwargs.get('refiner_positive', None), kwargs.get('refiner_negative', None))
        return (pipe,)
```