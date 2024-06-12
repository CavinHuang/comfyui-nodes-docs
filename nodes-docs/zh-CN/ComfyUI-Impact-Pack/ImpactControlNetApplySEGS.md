# Documentation
- Class name: ControlNetApplySEGS
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ControlNetApplySEGS节点旨在通过应用控制网络来增强分割过程，以细化分割掩码。它通过根据指定的强度参数调整控制网络的影响，确保控制网络的输出与分割结果的无缝集成。

# Input types
## Required
- segs
    - ‘segs’参数至关重要，因为它提供了节点将处理的初始分割数据。它对节点的执行至关重要，因为它构成了应用控制网络的基础。
    - Comfy dtype: SEGS
    - Python dtype: List[impact.core.SEG]
- control_net
    - ‘control_net’参数对节点至关重要，因为它定义了用于细化分割的控制网络。它直接影响最终分割输出的质量和准确性。
    - Comfy dtype: CONTROL_NET
    - Python dtype: impact.core.ControlNet
- strength
    - ‘strength’参数决定了控制网络对分割过程的影响程度。它是平衡分割细化与原始分割数据之间的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- segs_preprocessor
    - 可选的‘segs_preprocessor’参数允许在控制网络使用之前对分割数据进行预处理。这对于确保输入数据处于正确的格式或已经过必要的转换可能很重要。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: Callable
- control_image
    - 提供的‘control_image’参数用于通过提供额外的图像上下文来增强控制网络的应用。这可以提高节点对分割进行更明智调整的能力。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Output types
- SEGS
    - 输出'SEGS'包含应用控制网络后的细化分割掩码。它代表了节点处理的成果，对进一步分析或下游任务具有重要意义。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[str, List[impact.core.SEG]]

# Usage tips
- Infra type: CPU

# Source code
```
class ControlNetApplySEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'control_net': ('CONTROL_NET',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01})}, 'optional': {'segs_preprocessor': ('SEGS_PREPROCESSOR',), 'control_image': ('IMAGE',)}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, segs, control_net, strength, segs_preprocessor=None, control_image=None):
        new_segs = []
        for seg in segs[1]:
            control_net_wrapper = core.ControlNetWrapper(control_net, strength, segs_preprocessor, seg.control_net_wrapper, original_size=segs[0], crop_region=seg.crop_region, control_image=control_image)
            new_seg = SEG(seg.cropped_image, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, control_net_wrapper)
            new_segs.append(new_seg)
        return ((segs[0], new_segs),)
```