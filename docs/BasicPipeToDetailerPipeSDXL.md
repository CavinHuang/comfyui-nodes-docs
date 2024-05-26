# Documentation
- Class name: BasicPipeToDetailerPipeSDXL
- Category: ImpactPack/Pipe
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

BasicPipeToDetailerPipeSDXL 节点旨在将基础管道结构转换为适合高级处理阶段的更详细形式。它通过整合各种组件，如 bbox_detector、LoRA 和 Wildcard 选择，增强了管道在分割和细化等任务中的能力。

# Input types
## Required
- base_basic_pipe
    - base_basic_pipe 参数是必需的，因为它提供了节点运行所需的基础管道结构。这是一个关键输入，直接影响节点处理和转换数据的能力。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, ...]
- refiner_basic_pipe
    - refiner_basic_pipe 参数用于细化基础管道，提供额外的处理能力层。它是提高管道输出细节和准确性的关键组件。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, ...]
- bbox_detector
    - bbox_detector 是识别和定位数据中感兴趣区域的关键组件。其作用对于使节点能够执行空间分析和对象检测任务至关重要。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: Any
- wildcard
    - wildcard 参数允许动态输入模式，增强了节点的灵活性。它对于适应各种数据格式和处理需求具有重要意义。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- sam_model_opt
    - 可选的 sam_model_opt 参数可用于指定用于语义注释的模型，增加了节点分析能力的深度。
    - Comfy dtype: SAM_MODEL
    - Python dtype: Optional[Any]
- segm_detector_opt
    - 提供的 segm_detector_opt 参数使节点能够执行分割任务，有助于对数据进行更详细的分析。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: Optional[Any]
- detailer_hook
    - detailer_hook 参数是可选特性，允许定制节点的处理管道，以满足特定的用例或需求。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: Optional[Any]

# Output types
- detailer_pipe
    - detailer_pipe 输出是节点生成的经过细化和详细化的管道结构。它很重要，因为它为进一步的高级处理和分析奠定了基础。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: Tuple[Any, ...]

# Usage tips
- Infra type: CPU

# Source code
```
class BasicPipeToDetailerPipeSDXL:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_basic_pipe': ('BASIC_PIPE',), 'refiner_basic_pipe': ('BASIC_PIPE',), 'bbox_detector': ('BBOX_DETECTOR',), 'wildcard': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'Select to add LoRA': (['Select the LoRA to add to the text'] + folder_paths.get_filename_list('loras'),), 'Select to add Wildcard': (['Select the Wildcard to add to the text'],)}, 'optional': {'sam_model_opt': ('SAM_MODEL',), 'segm_detector_opt': ('SEGM_DETECTOR',), 'detailer_hook': ('DETAILER_HOOK',)}}
    RETURN_TYPES = ('DETAILER_PIPE',)
    RETURN_NAMES = ('detailer_pipe',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Pipe'

    def doit(self, *args, **kwargs):
        base_basic_pipe = kwargs['base_basic_pipe']
        refiner_basic_pipe = kwargs['refiner_basic_pipe']
        bbox_detector = kwargs['bbox_detector']
        wildcard = kwargs['wildcard']
        sam_model_opt = kwargs.get('sam_model_opt', None)
        segm_detector_opt = kwargs.get('segm_detector_opt', None)
        detailer_hook = kwargs.get('detailer_hook', None)
        (model, clip, vae, positive, negative) = base_basic_pipe
        (refiner_model, refiner_clip, refiner_vae, refiner_positive, refiner_negative) = refiner_basic_pipe
        pipe = (model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, refiner_model, refiner_clip, refiner_positive, refiner_negative)
        return (pipe,)
```