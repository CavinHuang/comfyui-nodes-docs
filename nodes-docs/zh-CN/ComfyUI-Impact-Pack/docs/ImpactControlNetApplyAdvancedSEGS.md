# Documentation
- Class name: ControlNetApplyAdvancedSEGS
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ControlNetApplyAdvancedSEGS 节点旨在通过应用控制网络来增强分割过程，以细化分割掩码。它通过调整控制网络在整个图像中的影响，确保从一个区域到另一个区域的平滑过渡，而不出现可见的接缝。这个节点特别适用于需要精确控制分割输出的场景。

# Input types
## Required
- segs
    - 'segs' 参数至关重要，因为它提供了节点将处理的初始分割数据。它直接影响节点的执行，通过确定控制网络细化的起点。
    - Comfy dtype: SEGS
    - Python dtype: List[Tuple[Image, List[NamedTuple], BoundingBox, Label, ControlNetAdvancedWrapper]]
- control_net
    - 'control_net' 参数定义了将用于指导分割过程的控制网络。它对节点的功能至关重要，因为它决定了如何细化分割掩码。
    - Comfy dtype: CONTROL_NET
    - Python dtype: torch.nn.Module
- strength
    - 'strength' 参数调整控制网络对分割的影响强度。它是确定分割输出最终质量的关键因素，允许微调控制网络的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - 'start_percent' 参数指定控制网络效果的起始百分比。它对于控制分割过程开始时的过渡区域很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 'end_percent' 参数定义了控制网络效果的结束百分比。它对于管理分割过程结束时的过渡区域至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- segs_preprocessor
    - 可选的 'segs_preprocessor' 参数允许在将分割数据输入控制网络之前进行预处理。它可以通过以更有利于控制网络细化过程的方式准备数据来提高节点的性能。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: Callable
- control_image
    - 可选的 'control_image' 参数提供了一个可以用来影响控制网络决策的额外图像。当需要额外的上下文以实现更准确的分割时，它特别有用。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Output types
- segs
    - 'segs' 输出包含应用控制网络后的细化分割数据。它代表了节点操作的最终结果，对下游处理很重要。
    - Comfy dtype: SEGS
    - Python dtype: List[Tuple[Image, List[NamedTuple], BoundingBox, Label, ControlNetAdvancedWrapper]]

# Usage tips
- Infra type: GPU

# Source code
```
class ControlNetApplyAdvancedSEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'control_net': ('CONTROL_NET',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_percent': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}, 'optional': {'segs_preprocessor': ('SEGS_PREPROCESSOR',), 'control_image': ('IMAGE',)}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs, control_net, strength, start_percent, end_percent, segs_preprocessor=None, control_image=None):
        new_segs = []
        for seg in segs[1]:
            control_net_wrapper = core.ControlNetAdvancedWrapper(control_net, strength, start_percent, end_percent, segs_preprocessor, seg.control_net_wrapper, original_size=segs[0], crop_region=seg.crop_region, control_image=control_image)
            new_seg = SEG(seg.cropped_image, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, control_net_wrapper)
            new_segs.append(new_seg)
        return ((segs[0], new_segs),)
```