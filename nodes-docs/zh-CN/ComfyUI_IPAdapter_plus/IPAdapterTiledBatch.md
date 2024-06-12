# Documentation
- Class name: IPAdapterTiledBatch
- Category: Image Processing
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterTiledBatch节点旨在以批量格式适应和处理图像数据，使用平铺技术进行高效计算。它特别适用于处理大型图像或需要批量处理的情况。该节点强调灵活性和性能，允许通过各种参数进行定制，这些参数影响图像转换过程。

# Input types
## Required
- model
    - 模型参数对于节点至关重要，因为它定义了用于图像处理的基础模型。它直接影响节点的执行和处理后的图像质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter参数对于节点的操作至关重要，因为它指定了用于平铺图像数据的适配器。它在节点有效处理大型图像的能力中起着关键作用。
    - Comfy dtype: IPADAPTER
    - Python dtype: Any
- image
    - 图像参数是节点功能的基础，因为它代表了要处理的输入图像。节点的输出严重依赖于输入图像的质量和特征。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- weight
    - 权重参数允许调整图像处理对最终输出的影响。它很重要，因为它提供了一种控制图像转换强度的方法。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - 权重类型参数确定要应用于图像处理的加权类型。它很重要，因为它可以显著改变节点的处理方法和生成的图像特征。
    - Comfy dtype: WEIGHT_TYPES
    - Python dtype: str
- start_at
    - start_at参数指定图像处理的起始点。它很重要，因为它决定了节点开始其操作的初始位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数定义了图像处理的终点。它很关键，因为它设置了节点处理图像数据的限制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sharpening
    - 锐化参数用于增强处理后图像的清晰度。它很重要，因为它可以通过增加锐度来提高输出的视觉质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- embeds_scaling
    - embeds_scaling参数用于缩放图像处理期间生成的嵌入。它很重要，因为它可以影响嵌入的维度和质量，影响节点的性能。
    - Comfy dtype: COMBO['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty']
    - Python dtype: str
- image_negative
    - image_negative参数用于为图像处理提供负面示例。在应用对比学习的情况下，它可能很重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- attn_mask
    - attn_mask参数用于在处理期间屏蔽图像的某些部分。它对于集中节点对图像特定区域的注意力很重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- clip_vision
    - clip_vision参数用于将CLIP视觉模型集成到图像处理中。对于需要理解和生成图像特征的任务，它可能很重要。
    - Comfy dtype: CLIP_VISION
    - Python dtype: Any

# Output types
- processed_images
    - processed_images输出包含节点执行的图像处理的结果。它很重要，因为它代表了节点操作的最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class IPAdapterTiledBatch(IPAdapterTiled):

    def __init__(self):
        self.unfold_batch = True

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'ipadapter': ('IPADAPTER',), 'image': ('IMAGE',), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05}), 'weight_type': (WEIGHT_TYPES,), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'sharpening': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'embeds_scaling': (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],)}, 'optional': {'image_negative': ('IMAGE',), 'attn_mask': ('MASK',), 'clip_vision': ('CLIP_VISION',)}}
```