# Documentation
- Class name: IPAdapterMS
- Category: ipadapter/dev
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterMS节点旨在将各种图像处理模型集成到一个统一的框架中。它通过一组可配置的参数促进图像数据的操作和增强，旨在优化集成模型的性能。

# Input types
## Required
- model
    - 模型参数对节点的操作至关重要，因为它定义了要使用的核心图像处理模型。它直接影响节点处理和分析图像数据的能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter参数对节点至关重要，因为它指定了将用于与模型接口的适配器。它在节点与模型的交互以及增强模型功能方面扮演着重要角色。
    - Comfy dtype: IPADAPTER
    - Python dtype: str
- image
    - 图像参数是节点功能的基础，它为图像处理提供输入数据。它是节点将操作和分析的视觉内容的主要来源。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- weight
    - 权重参数允许调整图像处理的某些方面对最终输出的影响。它是微调节点操作以实现期望结果的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- weight_faceidv2
    - weight_faceidv2参数用于调节图像处理中面部特征识别的强调程度。在处理面部识别任务时，它是一个可选但重要的因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- combine_embeds
    - combine_embeds参数决定了节点内不同嵌入的组合方法。这是一个关键的决策点，影响节点输出的整合和一致性。
    - Comfy dtype: COMBO[concat, add, subtract, average, norm average]
    - Python dtype: str
- start_at
    - start_at参数定义了图像处理操作的起始点。它用于指定节点开始分析和操作图像数据的初始阶段。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数设置了图像处理操作的终点。它决定了节点分析和操作图像数据的最终阶段。
    - Comfy dtype: FLOAT
    - Python dtype: float
- embeds_scaling
    - embeds_scaling参数用于缩放节点内的嵌入。它是控制嵌入对节点输出大小和影响的重要因素。
    - Comfy dtype: COMBO[V only, K+V, K+V w/ C penalty, K+mean(V) w/ C penalty]
    - Python dtype: str
- layer_weights
    - layer_weights参数允许为模型内的不同层指定权重。它是一个可选但强大的工具，用于根据特定需求定制节点的行为。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- processed_image
    - processed_image输出代表了节点执行的图像处理的结果。它包含了节点的操作和分析，提供了所有操作完成后的最终视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterMS(IPAdapterAdvanced):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'ipadapter': ('IPADAPTER',), 'image': ('IMAGE',), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 5, 'step': 0.05}), 'weight_faceidv2': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 5.0, 'step': 0.05}), 'weight_type': (WEIGHT_TYPES,), 'combine_embeds': (['concat', 'add', 'subtract', 'average', 'norm average'],), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'embeds_scaling': (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],), 'layer_weights': ('STRING', {'default': '', 'multiline': True})}, 'optional': {'image_negative': ('IMAGE',), 'attn_mask': ('MASK',), 'clip_vision': ('CLIP_VISION',), 'insightface': ('INSIGHTFACE',)}}
    CATEGORY = 'ipadapter/dev'
```