# Documentation
- Class name: EditDetailerPipe
- Category: ImpactPack/Pipe
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

EditDetailerPipe 是一个旨在通过整合各种模型和组件来增强文本细节级别的节点。它允许通过使用 LoRA 和通配符来定制文本生成过程，并通过可选参数如模型、clip 和 VAE 进一步细化。该节点的主要目标是提供一个灵活且详细的文本编辑框架，可以根据具体需求进行调整。

# Input types
## Required
- detailer_pipe
    - detailer_pipe 参数对于 EditDetailerPipe 节点的运行至关重要，因为它代表了文本编辑管道的初始配置或状态。正是通过这个参数，节点接收到进一步处理和定制所需的基础组件。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: Tuple[Any, ...]
- wildcard
    - wildcard 参数在文本编辑过程中起着关键作用，允许插入动态文本元素。它的 multiline 和 dynamicPrompts 属性表明可以生成的文本的灵活性和互动性，使其成为实现所需细节水平的关键组件。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- Select to add LoRA
    - LoRA 选择参数使用户能够选择特定的 LoRA 模型来增强文本的细节和细微差别。这种选择可以显著影响生成文本的丰富度和深度，使其成为定制过程中的一个重要方面。
    - Comfy dtype: COMBO[Select the LoRA to add to the text]
    - Python dtype: str
- Select to add Wildcard
    - 此参数允许选择要包含在文本中的通配符，为文本生成过程中引入变化性和不可预测性提供了一种机制。通配符的选择可以极大地影响最终结果，使其成为节点运行中的一个重要因素。
    - Comfy dtype: COMBO[Select the Wildcard to add to the text]
    - Python dtype: str
- model
    - model 参数是一个可选输入，可用于指定文本编辑过程中的特定模型。这允许根据手头任务的具体要求定制节点的功能。
    - Comfy dtype: MODEL
    - Python dtype: Any
- clip
    - clip 参数是另一个可选输入，可用于将特定的 CLIP 模型引入文本编辑管道。这可以改变文本的处理和详细化方式，为节点的输出提供额外的控制。
    - Comfy dtype: CLIP
    - Python dtype: Any
- vae
    - vae 参数提供了一种可选的方式，将变分自编码器（VAE）包含在文本编辑过程中。这可以在节点的操作中引入抽象和表示学习的水平，可能提高生成文本的质量。
    - Comfy dtype: VAE
    - Python dtype: Any
- positive
    - positive 参数用于指定正面条件输入，引导文本生成过程朝着期望的结果发展。这在引导节点行为生成具有特定特征的文本时特别有用。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - negative 参数用于定义负面条件输入，阻止生成某些文本特征。这有助于通过过滤掉不需要的元素来细化节点的输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- bbox_detector
    - bbox_detector 参数是一个可选组件，可以集成到节点中以执行边界框检测，这对于涉及空间或几何文本分析的应用非常有用。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: Any
- sam_model
    - sam_model 参数允许包含一个 SAM（基于得分的对抗模型），可用于引导文本生成过程朝着更连贯和上下文相关的输出发展。
    - Comfy dtype: SAM_MODEL
    - Python dtype: Any
- segm_detector
    - segm_detector 参数是将分割检测器纳入节点的可选输入，它可以协助识别和分离文本的不同部分或组件。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: Any
- detailer_hook
    - detailer_hook 参数提供了一种定制节点行为的方法，允许在文本编辑过程中插入自定义钩子或回调。这可以使得高级用户能够实现特定的功能或修改。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: Any
- refiner_model
    - refiner_model 参数是一个可选输入，它通过指定一个次级模型来进一步细化文本编辑过程。这对于需要多阶段文本增强的应用特别有用。
    - Comfy dtype: REFINER_MODEL
    - Python dtype: Any
- refiner_clip
    - refiner_clip 参数允许可选集成一个次级 CLIP 模型以增强文本的细节和连贯性。它为用户提供了一个额外的控制层，以微调节点的输出。
    - Comfy dtype: REFINER_CLIP
    - Python dtype: Any
- refiner_positive
    - refiner_positive 参数用于为次级文本细化阶段提供正面条件输入。这有助于引导节点以更集中的方式产生具有所需属性的文本。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- refiner_negative
    - refiner_negative 参数用于指定次级文本细化过程的负面条件输入。它有助于在文本编辑的最后阶段避免不需要的文本特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any

# Output types
- detailer_pipe
    - 输出的 detailer_pipe 代表通过 EditDetailerPipe 节点处理后的细化和定制的文本编辑管道。它封装了对初始管道所做的所有修改和增强，提供了一个详细且富有细微差别的文本生成框架。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: Tuple[Any, ...]

# Usage tips
- Infra type: CPU

# Source code
```
class EditDetailerPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'detailer_pipe': ('DETAILER_PIPE',), 'wildcard': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'Select to add LoRA': (['Select the LoRA to add to the text'] + folder_paths.get_filename_list('loras'),), 'Select to add Wildcard': (['Select the Wildcard to add to the text'],)}, 'optional': {'model': ('MODEL',), 'clip': ('CLIP',), 'vae': ('VAE',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'bbox_detector': ('BBOX_DETECTOR',), 'sam_model': ('SAM_MODEL',), 'segm_detector': ('SEGM_DETECTOR',), 'detailer_hook': ('DETAILER_HOOK',)}}
    RETURN_TYPES = ('DETAILER_PIPE',)
    RETURN_NAMES = ('detailer_pipe',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Pipe'

    def doit(self, *args, **kwargs):
        detailer_pipe = kwargs['detailer_pipe']
        wildcard = kwargs['wildcard']
        model = kwargs.get('model', None)
        clip = kwargs.get('clip', None)
        vae = kwargs.get('vae', None)
        positive = kwargs.get('positive', None)
        negative = kwargs.get('negative', None)
        bbox_detector = kwargs.get('bbox_detector', None)
        sam_model = kwargs.get('sam_model', None)
        segm_detector = kwargs.get('segm_detector', None)
        detailer_hook = kwargs.get('detailer_hook', None)
        refiner_model = kwargs.get('refiner_model', None)
        refiner_clip = kwargs.get('refiner_clip', None)
        refiner_positive = kwargs.get('refiner_positive', None)
        refiner_negative = kwargs.get('refiner_negative', None)
        (res_model, res_clip, res_vae, res_positive, res_negative, res_wildcard, res_bbox_detector, res_segm_detector, res_sam_model, res_detailer_hook, res_refiner_model, res_refiner_clip, res_refiner_positive, res_refiner_negative) = detailer_pipe
        if model is not None:
            res_model = model
        if clip is not None:
            res_clip = clip
        if vae is not None:
            res_vae = vae
        if positive is not None:
            res_positive = positive
        if negative is not None:
            res_negative = negative
        if bbox_detector is not None:
            res_bbox_detector = bbox_detector
        if segm_detector is not None:
            res_segm_detector = segm_detector
        if wildcard != '':
            res_wildcard = wildcard
        if sam_model is not None:
            res_sam_model = sam_model
        if detailer_hook is not None:
            res_detailer_hook = detailer_hook
        if refiner_model is not None:
            res_refiner_model = refiner_model
        if refiner_clip is not None:
            res_refiner_clip = refiner_clip
        if refiner_positive is not None:
            res_refiner_positive = refiner_positive
        if refiner_negative is not None:
            res_refiner_negative = refiner_negative
        pipe = (res_model, res_clip, res_vae, res_positive, res_negative, res_wildcard, res_bbox_detector, res_segm_detector, res_sam_model, res_detailer_hook, res_refiner_model, res_refiner_clip, res_refiner_positive, res_refiner_negative)
        return (pipe,)
```