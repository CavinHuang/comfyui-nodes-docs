# Documentation
- Class name: Canny
- Category: image/preprocessors
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Canny节点旨在使用Canny算法检测图像中的边缘，这是一种流行的边缘检测技术。它通过应用包括高斯滤波、梯度计算、非极大值抑制和滞后阈值处理的多阶段过程来增强输入图像中边缘的清晰度。该节点在图像预处理中扮演着关键角色，适用于特征检测、分割和图像分析等应用。

# Input types
## Required
- image
    - 输入图像是Canny节点操作的基础，因为它是执行边缘检测的主要数据。输入图像的质量和分辨率直接影响检测到的边缘的准确性和细节。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- low_threshold
    - 低阈值参数对于边缘检测的初始阶段至关重要，它定义了边缘识别的下限。它与高阈值一起工作，微调检测过程并控制边缘检测的灵敏度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- high_threshold
    - 高阈值对于检测到的边缘的细化至关重要，它设定了边缘接受的上限。它有助于控制假边缘的数量，并确保只有在最终输出中保留最显著的边缘。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - Canny节点的输出图像是输入图像的边缘版本，其中已检测并突出显示了边缘。此输出对于进一步的图像分析或作为需要边缘信息的其他处理节点的输入非常重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class Canny:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'low_threshold': ('FLOAT', {'default': 0.4, 'min': 0.01, 'max': 0.99, 'step': 0.01}), 'high_threshold': ('FLOAT', {'default': 0.8, 'min': 0.01, 'max': 0.99, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'detect_edge'
    CATEGORY = 'image/preprocessors'

    def detect_edge(self, image, low_threshold, high_threshold):
        output = canny(image.to(comfy.model_management.get_torch_device()).movedim(-1, 1), low_threshold, high_threshold)
        img_out = output[1].to(comfy.model_management.intermediate_device()).repeat(1, 3, 1, 1).movedim(1, -1)
        return (img_out,)
```