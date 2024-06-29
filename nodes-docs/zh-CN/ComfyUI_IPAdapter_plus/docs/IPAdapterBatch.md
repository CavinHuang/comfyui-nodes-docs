# Documentation
- Class name: IPAdapterBatch
- Category: Image Processing
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterBatch节点旨在以批量方式高效处理图像数据，利用底层IPAdapterAdvanced类的处理能力。它专注于将图像适配以与其他模型或处理管道集成，确保图像数据格式正确且权重适当，以实现最佳性能。

# Input types
## Required
- model
    - 模型参数对于节点的操作至关重要，因为它定义了将用于处理图像数据的机器学习模型。它直接影响节点的执行和产生的结果质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter参数是必不可少的，因为它指定了将用于将图像数据与模型集成的适配器。它在图像数据处理方式及其后续结果中扮演着重要角色。
    - Comfy dtype: IPADAPTER
    - Python dtype: Any
- image
    - 图像输入对节点的功能至关重要，提供了将由模型处理和转换的原始数据。它是节点操作的主要信息源。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- weight
    - 权重参数允许调整图像数据对模型输出的影响。在为特定应用微调节点行为时尤其重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - weight_type参数决定了权重将如何应用于图像数据，这对于控制处理过程中对数据不同方面的强调至关重要。
    - Comfy dtype: WEIGHT_TYPES
    - Python dtype: str
- start_at
    - start_at参数定义了处理图像数据的起始点，这对于专注于图像中的特定区域或特征非常有用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数标记了图像数据处理的终点，允许选择要考虑的图像数据的子集。
    - Comfy dtype: FLOAT
    - Python dtype: float
- embeds_scaling
    - embeds_scaling参数非常重要，因为它决定了嵌入的缩放方法，影响图像特征在模型中的表示和使用方式。
    - Comfy dtype: COMBO['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty']
    - Python dtype: str
## Optional
- image_negative
    - 可选的image_negative参数提供了一个用于比较或对比的额外图像，增强了节点区分类似图像的能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- attn_mask
    - 当提供attn_mask参数时，可以用来指定模型在处理期间应该关注或忽略图像数据的哪些部分。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- clip_vision
    - clip_vision参数用于集成CLIP视觉模型以增强图像特征提取，这可以在某些应用中提高节点的性能。
    - Comfy dtype: CLIP_VISION
    - Python dtype: Any

# Output types

# Usage tips
- Infra type: CPU

# Source code
```
class IPAdapterBatch(IPAdapterAdvanced):

    def __init__(self):
        self.unfold_batch = True

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'ipadapter': ('IPADAPTER',), 'image': ('IMAGE',), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 5, 'step': 0.05}), 'weight_type': (WEIGHT_TYPES,), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'embeds_scaling': (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],)}, 'optional': {'image_negative': ('IMAGE',), 'attn_mask': ('MASK',), 'clip_vision': ('CLIP_VISION',)}}
```