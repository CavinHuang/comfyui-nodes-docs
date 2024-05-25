# Documentation
- Class name: IPAdapterStyleCompositionBatch
- Category: Style Composition
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterStyleCompositionBatch节点旨在以批量处理的方式促进图像风格和图像组合的组合。它集成了风格适应技术，以无缝融合不同的视觉元素，强调生成图像中风格一致性的重要性。

# Input types
## Required
- model
    - 模型参数对节点的操作至关重要，因为它定义了用于风格组合的底层神经网络架构。它直接影响节点生成具有所需风格特征的图像的能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter参数对于将输入图像适应模型的风格至关重要。它在确保输入图像与模型的风格期望保持一致以实现有效的风格组合中扮演着重要角色。
    - Comfy dtype: IPADAPTER
    - Python dtype: torch.Tensor
- image_style
    - image_style参数是提供组合过程风格参考的关键输入。它决定了输出图像应体现的视觉风格，影响整体的审美结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image_composition
    - image_composition参数是节点操作的组合基础。它是将根据image_style提供的风格进行风格化和转换的图像，形成最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- weight_style
    - weight_style参数允许微调风格输入对最终组合的影响。当需要在原始组合和应用的风格之间取得平衡时，它特别有用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_composition
    - weight_composition参数调整组合元素对最终输出的贡献。它对于实现生成图像的风格和组合方面的和谐融合很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- expand_style
    - expand_style参数决定是否应扩展风格以适应组合。这对于确保风格均匀应用于整个图像可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- start_at
    - start_at参数指定组合过程的起始点。它用于控制风格应用的初始阶段，影响组合的进展。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数标记组合过程的终点。它决定了风格应用的最后阶段，影响风格在整个组合中应用的范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- embeds_scaling
    - embeds_scaling参数用于选择风格组合中涉及的嵌入的缩放方法。它是确定组合图像质量和特性的关键因素。
    - Comfy dtype: COMBO['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty']
    - Python dtype: str

# Output types
- composed_images
    - composed_images输出代表了风格组合过程的最终结果。它包含了根据输入参数风格化和组合后的合成图像，展示了节点的能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterStyleCompositionBatch(IPAdapterStyleComposition):

    def __init__(self):
        self.unfold_batch = True

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'ipadapter': ('IPADAPTER',), 'image_style': ('IMAGE',), 'image_composition': ('IMAGE',), 'weight_style': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 5, 'step': 0.05}), 'weight_composition': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 5, 'step': 0.05}), 'expand_style': ('BOOLEAN', {'default': False}), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'embeds_scaling': (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],)}, 'optional': {'image_negative': ('IMAGE',), 'attn_mask': ('MASK',), 'clip_vision': ('CLIP_VISION',)}}
```