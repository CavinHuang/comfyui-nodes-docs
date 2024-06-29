# Documentation
- Class name: IPAdapterFaceID
- Category: ipadapter/faceid
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterFaceID节点旨在成像流程中集成和处理面部识别数据。它利用高级模型提高面部识别任务的准确性，确保系统能够从图像中可靠地识别个人。

# Input types
## Required
- model
    - 模型参数对于节点的操作至关重要，因为它定义了用于面部识别的机器学习模型。它是面部识别过程的主干，使节点能够分析和处理面部特征。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter参数是必需的，因为它为节点提供了与系统中其他组件通信的必要接口，促进了面部识别数据的交换。
    - Comfy dtype: IPADAPTER
    - Python dtype: str
- image
    - 图像输入对节点的功能至关重要，提供了面部识别模型分析的视觉数据。它是节点处理以提取面部特征进行识别的原始材料。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- weight
    - 权重参数允许调整面部识别结果对总体结果的影响。它是一个调整因子，可以修改以在准确性和性能之间实现平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_faceidv2
    - weight_faceidv2参数用于微调FaceID版本2模型在面部识别过程中的贡献。它允许定制模型对最终识别结果的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- combine_embeds
    - combine_embeds参数决定了面部识别过程中不同嵌入如何组合。它是融合面部特征数据以增强识别能力的关键因素。
    - Comfy dtype: COMBO[concat, add, subtract, average, norm average]
    - Python dtype: str
- start_at
    - start_at参数指定面部特征提取过程的起始点。它用于控制用于面部识别的图像片段。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数标记面部特征提取过程的终点。它与start_at一起，定义了用于分析的图像范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- embeds_scaling
    - embeds_scaling参数负责缩放面部识别中使用的嵌入。它调整特征向量的大小以优化识别过程。
    - Comfy dtype: COMBO[V only, K+V, K+V w/ C penalty, K+mean(V) w/ C penalty]
    - Python dtype: str

# Output types
- face_id_output
    - face_id_output在通过模型处理输入图像后提供最终的面部识别结果。它是节点分析的结晶，代表了识别任务的结果。
    - Comfy dtype: OUTPUT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterFaceID(IPAdapterAdvanced):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'ipadapter': ('IPADAPTER',), 'image': ('IMAGE',), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05}), 'weight_faceidv2': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 5.0, 'step': 0.05}), 'weight_type': (WEIGHT_TYPES,), 'combine_embeds': (['concat', 'add', 'subtract', 'average', 'norm average'],), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'embeds_scaling': (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],)}, 'optional': {'image_negative': ('IMAGE',), 'attn_mask': ('MASK',), 'clip_vision': ('CLIP_VISION',), 'insightface': ('INSIGHTFACE',)}}
    CATEGORY = 'ipadapter/faceid'
```