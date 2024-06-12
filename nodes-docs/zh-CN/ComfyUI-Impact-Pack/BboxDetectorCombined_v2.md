# Documentation
- Class name: BboxDetectorCombined
- Category: Detection
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

BboxDetectorCombined节点旨在使用预训练的边界框检测器检测并分割图像中的对象。它处理输入图像以识别兴趣区域并生成一个掩码，该掩码描绘了这些区域。此节点对于需要精确对象定位和分割的应用至关重要，例如在监控、机器人技术和自主系统中。

# Input types
## Required
- bbox_detector
    - bbox_detector参数对于节点的操作至关重要，因为它提供了用于检测图像中对象的预训练模型。它是一个关键组件，使节点能够准确识别和定位对象。
    - Comfy dtype: BBOX_DETECTOR
    - Python dtype: torch.nn.Module
- image
    - image参数是节点处理以检测和分割对象的输入。它是节点功能的基础，节点的性能在很大程度上依赖于输入图像的质量和分辨率。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- threshold
    - threshold参数用于设置对象检测的置信度水平。它在过滤假阳性和确保只有置信度高于某个水平的对象被检测中起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dilation
    - dilation参数应用于检测到的对象掩码，以扩展它们的边界。这对于细化分割很有用，确保掩码包含整个对象，即使对象的边缘没有被完美检测到。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - mask输出是表示输入图像中检测到的对象分割的二进制图像。它是节点操作的重要结果，为进一步分析或处理提供了对象的清晰划分。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class BboxDetectorCombined(SegmDetectorCombined):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'bbox_detector': ('BBOX_DETECTOR',), 'image': ('IMAGE',), 'threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'dilation': ('INT', {'default': 4, 'min': -512, 'max': 512, 'step': 1})}}

    def doit(self, bbox_detector, image, threshold, dilation):
        mask = bbox_detector.detect_combined(image, threshold, dilation)
        if mask is None:
            mask = torch.zeros((image.shape[2], image.shape[1]), dtype=torch.float32, device='cpu')
        return (mask.unsqueeze(0),)
```