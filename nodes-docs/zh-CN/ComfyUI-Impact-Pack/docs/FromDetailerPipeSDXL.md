# Documentation
- Class name: FromDetailerPipe_SDXL
- Category: ImpactPack/Pipe
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

FromDetailerPipe_SDXL 节点的 'doit' 方法旨在通过从 detailer pipe 中解包和组织各种组件（如模型、条件器和检测器）来编排处理管道。它在 ImpactPack 框架内的数据和功能流程中发挥关键作用，确保不同模块之间的无缝集成。

# Input types
## Required
- detailer_pipe
    - 参数 'detailer_pipe' 是必需的，因为它作为节点接收其操作所需组件的结构化集合的通道。它是主要输入，决定了节点的执行路径和随后的输出。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: Tuple[DETAILER_PIPE, MODEL, CLIP, VAE, CONDITIONING, CONDITIONING, BBOX_DETECTOR, SAM_MODEL, SEGM_DETECTOR, DETAILER_HOOK]

# Output types
- detailer_pipe
    - 输出 'detailer_pipe' 是由节点处理和组织的结构化组件集合。它很重要，因为它构成了管道后续阶段进一步处理的基础。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: DETAILER_PIPE
- model
    - 输出 'model' 表示节点处理管道中使用的一个机器学习模型。对于需要预测分析或模式识别的任务来说，它是一个关键组件。
    - Comfy dtype: MODEL
    - Python dtype: MODEL
- clip
    - 输出 'clip' 是一个可能涉及文本或图像处理的组件，有助于节点处理和解释上下文数据的能力。
    - Comfy dtype: CLIP
    - Python dtype: CLIP
- vae
    - 输出 'vae' 代表变分自编码器，这是一种用于无监督学习任务的神经网络类型。它在节点生成或重建数据的能力中起着重要作用。
    - Comfy dtype: VAE
    - Python dtype: VAE
- bbox_detector
    - 输出 'bbox_detector' 是一个负责在图像或视频中检测边界框的模块。对于需要空间定位对象或感兴趣区域的应用来说，它非常重要。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: BBOX_DETECTOR
- sam_model_opt
    - 输出 'sam_model_opt' 是场景注意力模型的优化版本，它增强了节点专注于并处理数据中特定区域的能力。
    - Comfy dtype: SAM_MODEL
    - Python dtype: SAM_MODEL
- segm_detector_opt
    - 输出 'segm_detector_opt' 是一个优化的分割检测器，对于涉及识别和分离图像内不同区域的任务至关重要。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: SEGM_DETECTOR
- detailer_hook
    - 输出 'detailer_hook' 是一种机制，允许定制或扩展节点的功能，提供处理特定用例的灵活性。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: DETAILER_HOOK
- refiner_model
    - 输出 'refiner_model' 是另一个机器学习模型，可能用于完善或增强节点工作流程中主模型的输出。
    - Comfy dtype: MODEL
    - Python dtype: MODEL

# Usage tips
- Infra type: CPU

# Source code
```
class FromDetailerPipe_SDXL:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'detailer_pipe': ('DETAILER_PIPE',)}}
    RETURN_TYPES = ('DETAILER_PIPE', 'MODEL', 'CLIP', 'VAE', 'CONDITIONING', 'CONDITIONING', 'BBOX_DETECTOR', 'SAM_MODEL', 'SEGM_DETECTOR', 'DETAILER_HOOK', 'MODEL', 'CLIP', 'CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('detailer_pipe', 'model', 'clip', 'vae', 'positive', 'negative', 'bbox_detector', 'sam_model_opt', 'segm_detector_opt', 'detailer_hook', 'refiner_model', 'refiner_clip', 'refiner_positive', 'refiner_negative')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Pipe'

    def doit(self, detailer_pipe):
        (model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, refiner_model, refiner_clip, refiner_positive, refiner_negative) = detailer_pipe
        return (detailer_pipe, model, clip, vae, positive, negative, bbox_detector, sam_model_opt, segm_detector_opt, detailer_hook, refiner_model, refiner_clip, refiner_positive, refiner_negative)
```