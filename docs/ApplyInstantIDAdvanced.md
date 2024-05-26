# Documentation
- Class name: ApplyInstantIDAdvanced
- Category: ImageProcessing
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_InstantID.git

ApplyInstantIDAdvanced节点通过使用控制网络和调节输入来应用高级图像处理技术，以增强面部识别能力。

# Input types
## Required
- instantid
    - InstantID对于在图像数据中识别和跟踪个体至关重要，作为节点处理的唯一标识符。
    - Comfy dtype: INSTANTID
    - Python dtype: str
- insightface
    - InsightFace提供了面部特征提取和识别所需的分析框架，这对节点的功能至关重要。
    - Comfy dtype: FACEANALYSIS
    - Python dtype: str
- control_net
    - 控制网络对于指导节点的面部分析至关重要，确保面部特征的准确和高效处理。
    - Comfy dtype: CONTROL_NET
    - Python dtype: str
- image
    - 图像输入对节点的操作至关重要，提供了面部识别和增强的视觉数据。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- model
    - 模型参数对于节点应用高级面部识别算法和提高结果准确性至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- positive
    - 正向调节输入对于完善面部识别过程至关重要，确保节点输出准确和相关的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 负向调节输入有助于过滤掉不相关或不正确的面部特征，提高节点产生精确结果的能力。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
## Optional
- ip_weight
    - IP权重参数影响面部识别过程中对InstantID的重视程度，影响结果的整体准确性和相关性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cn_strength
    - 控制网强度参数调整控制网对面部分析的影响，影响节点操作的精确性和有效性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_at
    - start_at参数定义了面部特征分析范围的开始，这对于将节点的处理集中在图像的特定区域很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数指定了面部特征分析范的结束，确保节点的处理限制在图像的相关部分。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise
    - 噪声参数在面部识别过程中引入受控的随机性，这可以帮助提高节点结果的鲁棒性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output_image
    - 输出图像是节点操作的结果，展示了增强的面部特征和改进的识别能力。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- output_results
    - 输出结果包含有关面部识别过程的详细信息，包括识别的特征及其对应的置信度分数。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: GPU

# Source code
```
class ApplyInstantIDAdvanced(ApplyInstantID):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'instantid': ('INSTANTID',), 'insightface': ('FACEANALYSIS',), 'control_net': ('CONTROL_NET',), 'image': ('IMAGE',), 'model': ('MODEL',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'ip_weight': ('FLOAT', {'default': 0.8, 'min': 0.0, 'max': 3.0, 'step': 0.01}), 'cn_strength': ('FLOAT', {'default': 0.8, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'noise': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.1})}, 'optional': {'image_kps': ('IMAGE',), 'mask': ('MASK',)}}
```