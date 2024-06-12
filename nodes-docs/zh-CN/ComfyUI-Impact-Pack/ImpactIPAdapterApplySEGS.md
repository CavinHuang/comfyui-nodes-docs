# Documentation
- Class name: IPAdapterApplySEGS
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

IPAdapterApplySEGS节点旨在集成并应用分段掩码，是ImpactPack工具套件的一部分。它利用IPAdapter框架的力量，根据参考图像调节图像生成，允许传输主题或风格。此节点对于需要精确控制生成过程的任务至关重要，确保输出紧密遵循所需的美学或主题元素。

# Input types
## Required
- segs
    - ‘segs’参数至关重要，因为它定义了节点将处理的分段掩码。这些掩码对于引导生成符合特定标准或约束的图像至关重要。参数的正确应用直接影响节点生成准确和相关输出的能力。
    - Comfy dtype: SEGS
    - Python dtype: List[NamedTuple]
- ipadapter_pipe
    - ‘ipadapter_pipe’参数是实现IPAdapter模型集成的关键组件。它负责无缝应用图像到图像的调节，这对于在生成的图像中实现所需的风格或主题转移至关重要。
    - Comfy dtype: IPADAPTER_PIPE
    - Python dtype: Tuple[Any, ...]
- weight
    - ‘weight’参数在调整参考图像对生成过程的影响中起着重要作用。它允许微调风格或主题转移的程度，确保最终输出满足用户的期望，而不会被参考图像过度支配。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- SEGS
    - 输出‘SEGS’代表经过IPAdapter模型调节的处理过的分段掩码。这个输出很重要，因为它包含了节点完善和调整输入掩码以更好地符合所需生成标准的能力。
    - Comfy dtype: SEGS
    - Python dtype: List[NamedTuple]

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterApplySEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'ipadapter_pipe': ('IPADAPTER_PIPE',), 'weight': ('FLOAT', {'default': 0.7, 'min': -1, 'max': 3, 'step': 0.05}), 'noise': ('FLOAT', {'default': 0.4, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'weight_type': (['original', 'linear', 'channel penalty'], {'default': 'channel penalty'}), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 0.9, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'unfold_batch': ('BOOLEAN', {'default': False}), 'faceid_v2': ('BOOLEAN', {'default': False}), 'weight_v2': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05}), 'context_crop_factor': ('FLOAT', {'default': 1.2, 'min': 1.0, 'max': 100, 'step': 0.1}), 'reference_image': ('IMAGE',)}, 'optional': {'combine_embeds': (['concat', 'add', 'subtract', 'average', 'norm average'],), 'neg_image': ('IMAGE',)}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs, ipadapter_pipe, weight, noise, weight_type, start_at, end_at, unfold_batch, faceid_v2, weight_v2, context_crop_factor, reference_image, combine_embeds='concat', neg_image=None):
        if len(ipadapter_pipe) == 4:
            print(f'[Impact Pack] IPAdapterApplySEGS: Installed Inspire Pack is outdated.')
            raise Exception('Inspire Pack is outdated.')
        new_segs = []
        (h, w) = segs[0]
        if reference_image.shape[2] != w or reference_image.shape[1] != h:
            reference_image = tensor_resize(reference_image, w, h)
        for seg in segs[1]:
            context_crop_region = make_crop_region(w, h, seg.crop_region, context_crop_factor)
            cropped_image = crop_image(reference_image, context_crop_region)
            control_net_wrapper = core.IPAdapterWrapper(ipadapter_pipe, weight, noise, weight_type, start_at, end_at, unfold_batch, weight_v2, cropped_image, neg_image=neg_image, prev_control_net=seg.control_net_wrapper, combine_embeds=combine_embeds)
            new_seg = SEG(seg.cropped_image, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, control_net_wrapper)
            new_segs.append(new_seg)
        return ((segs[0], new_segs),)
```