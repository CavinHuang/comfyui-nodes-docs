# Documentation
- Class name: BasicPipeToDetailerPipe
- Category: ImpactPack/Pipe
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

BasicPipeToDetailerPipe 节点旨在将基本管道结构转换为更详细的管道，增强后续任务的处理能力。它通过整合各种组件，如bbox_detector、通配符和可选模型，共同完善输入数据以进行更复杂的分析。

# Input types
## Required
- basic_pipe
    - basic_pipe 参数至关重要，因为它提供了节点操作所需的基础数据结构。它是节点促进的转换过程的先决条件。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, ...]
- bbox_detector
    - bbox_detector 是识别和定位数据中兴趣区域的关键组件。其整合允许在节点的工作流程中进行更精确的操控和分析。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: Any
- wildcard
    - wildcard 参数通过允许在执行期间动态替换占位符，为节点的处理引入了灵活性。这一特性增强了节点对各种数据场景的适应性。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- Select to add LoRA
    - LoRA 选择参数提供了对节点功能的可选增强，允许将额外的抽象层或复杂性纳入处理管道中。
    - Comfy dtype: COMBO[Select the LoRA to add to the text]
    - Python dtype: Union[str, None]
- Select to add Wildcard
    - 此可选参数允许用户在处理流程中引入额外的通配符，可用于更动态和多样化的数据操作。
    - Comfy dtype: COMBO[Select the Wildcard to add to the text]
    - Python dtype: Union[str, None]
- sam_model_opt
    - 可选的 sam_model_opt 参数使节点能够使用高级模型进行更复杂的分析，以防默认处理不够充分。
    - Comfy dtype: SAM_MODEL
    - Python dtype: Union[Any, None]
- segm_detector_opt
    - 当提供 segm_detector_opt 参数时，允许在节点操作中进行更细粒度的分割检测，可能提高结果的准确性。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: Union[Any, None]
- detailer_hook
    - detailer_hook 是一个可选参数，可用于自定义或扩展节点的功能，允许针对特定用例进行定制处理。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: Union[Any, None]

# Output types
- detailer_pipe
    - detailer_pipe 输出代表了节点处理后得到的增强型管道。它是一个准备用于进一步分析或下游任务的详细结构。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: Tuple[Any, ...]

# Usage tips
- Infra type: CPU

# Source code
```
class BasicPipeToDetailerPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'basic_pipe': ('BASIC_PIPE',), 'bbox_detector': ('BBOX_DETECTOR',), 'wildcard': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'Select to add LoRA': (['Select the LoRA to add to the text'] + folder_paths.get_filename_list('loras'),), 'Select to add Wildcard': (['Select the Wildcard to add to the text'],)}, 'optional': {'sam_model_opt': ('SAM_MODEL',), 'segm_detector_opt': ('SEGM_DETECTOR',), 'detailer_hook': ('DETAILER_HOOK',)}}
    RETURN_TYPES = ('DETAILER_PIPE',)
    RETURN_NAMES = ('detailer_pipe',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Pipe'

    def doit(self, *args, **kwargs):
        basic_pipe = kwargs['basic_pipe']
        bbox_detector = kwargs['bbox_detector']
        wildcard = kwargs['wildcard']
        sam_model_opt = kwargs.get('sam_model_opt', None)
        segm_detector_opt = kwargs.get('segm_detector_opt', None)
        detailer_hook = kwargs.get('detailer_hook', None)
        (model, clip, vae, positive, negative) = basic_pipe
        pipe = (model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, None, None, None, None)
        return (pipe,)
```