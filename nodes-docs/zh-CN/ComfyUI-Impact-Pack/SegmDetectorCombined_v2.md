# Documentation
- Class name: SegmDetectorCombined
- Category: ImpactPack/Detector
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SegmDetectorCombined节点旨在无缝集成分割和检测功能。它利用分割检测器处理图像并生成一个二进制掩码，以区分图像中的感兴趣对象和背景。此节点对于需要精确定位和分割的应用至关重要，例如在自动驾驶系统或医学成像中。

# Input types
## Required
- segm_detector
    - segm_detector参数至关重要，因为它代表了执行分割和检测任务的核心模型。它对节点的运行至关重要，因为它直接影响生成的掩码的质量和准确性。
    - Comfy dtype: SEGM_DETECTOR
    - Python dtype: torch.nn.Module
- image
    - image参数是节点处理的输入。它是一个基本组件，因为节点的所有操作都围绕着分析和操作这张图像以产生所需的掩码。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- threshold
    - threshold参数用于控制检测的灵敏度。它在确定哪些对象被识别并包含在最终掩码中起着重要作用，因此影响节点的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- dilation
    - dilation参数允许扩展检测到的对象边界。它在细化掩码边缘方面很重要，特别是在精确边界划分不太关键的场景中特别有用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASK
    - MASK输出是SegmDetectorCombined节点的主要结果。它是一个二进制掩码，标志着将感兴趣对象从图像的其余部分分割出来，这对于下游处理任务至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SegmDetectorCombined:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segm_detector': ('SEGM_DETECTOR',), 'image': ('IMAGE',), 'threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'dilation': ('INT', {'default': 0, 'min': -512, 'max': 512, 'step': 1})}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detector'

    def doit(self, segm_detector, image, threshold, dilation):
        mask = segm_detector.detect_combined(image, threshold, dilation)
        if mask is None:
            mask = torch.zeros((image.shape[2], image.shape[1]), dtype=torch.float32, device='cpu')
        return (mask.unsqueeze(0),)
```