# Documentation
- Class name: AIGCImageRemoveBackgroundRembg
- Category: AIGC
- Output node: False
- Repo Ref: https://github.com/esheep/esheep_custom_nodes.git

AIGCImageRemoveBackgroundRembg节点旨在使用先进的图像分割技术无缝去除图像背景。它利用SAM（Segment Anything Model）和GroundingDINO模型实现高质量的背景去除，为用户提供了用于进一步使用的干净前景对象。

# Input types
## Required
- image
    - 图像参数对于节点的操作至关重要，因为它是将从中移除背景的来源。图像的质量和格式直接影响节点的执行和生成的掩码的准确性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- text
    - 文本参数用于指导分割过程，确保正确识别并保留感兴趣的区域。它在节点理解和处理图像内容的能力中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
- sam_model_name
    - sam_model_name参数指定用于分割的预训练SAM模型。模型的选择可以影响节点的性能和分割结果的质量。
    - Comfy dtype: COMBO["sam_vit_h_4b8939.pth", "sam_vit_l_0b3195.pth", "sam_vit_b_01ec64.pth"]
    - Python dtype: str
- groundingdino_model_name
    - groundingdino_model_name参数决定了应用于识别图像内感兴趣区域的GroundingDINO模型。此参数对于精确的对象识别和分割至关重要。
    - Comfy dtype: COMBO["GroundingDINO_SwinT_OGC", "GroundingDINO_SwinB"]
    - Python dtype: str
## Optional
- dino_box_threshold
    - dino_box_threshold参数用于设置GroundingDINO模型输出的阈值。它影响节点决定考虑哪些区域进行分割。
    - Comfy dtype: FLOAT
    - Python dtype: float
- highest_confidence_mode
    - highest_confidence_mode参数控制节点关于基于置信度分数选择分割掩码的行为。它是决定最终输出质量的一个重要因素。
    - Comfy dtype: INT
    - Python dtype: int
- return_index
    - return_index参数指示应返回生成的掩码中的哪一个。它允许用户从多个分割结果中选择所需的输出。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- new_image
    - new_image输出包含处理过的图像，背景已去除，可供进一步使用或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - mask输出提供分割的二进制表示，突出显示已从原始图像中移除的区域。
    - Comfy dtype: MASK
    - Python dtype: np.ndarray

# Usage tips
- Infra type: GPU

# Source code
```
class AIGCImageRemoveBackgroundRembg:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'text': ('STRING', {'multiline': False}), 'sam_model_name': (['sam_vit_h_4b8939.pth', 'sam_vit_l_0b3195.pth', 'sam_vit_b_01ec64.pth'],), 'groundingdino_model_name': (['GroundingDINO_SwinT_OGC', 'GroundingDINO_SwinB'],), 'dino_box_threshold': ('FLOAT', {'default': 0.3, 'min': -100.0, 'max': 100.0, 'step': 0.1}), 'highest_confidence_mode': ('INT', {'default': 0, 'min': 0, 'max': 1, 'step': 1}), 'return_index': ('INT', {'default': 0})}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'sam'
    CATEGORY = 'AIGC'

    def sam(self, image, text: str, sam_model_name: str, groundingdino_model_name: str, dino_box_threshold: float, highest_confidence_mode: int, return_index: int):
        (new_image, mask) = sam_with_groundingdino(image, text, sam_model_name, groundingdino_model_name, dino_box_threshold, bool(highest_confidence_mode), return_index)
        return (new_image, mask)
```