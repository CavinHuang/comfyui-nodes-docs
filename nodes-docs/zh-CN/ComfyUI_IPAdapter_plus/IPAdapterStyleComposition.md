# Documentation
- Class name: IPAdapterStyleComposition
- Category: ipadapter/style_composition
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterStyleComposition节点旨在无缝融合图像风格和构图，为创意图像处理提供了一个强大的框架。它巧妙地将风格元素与构图结构融合，增强了最终输出的视觉效果和连贯性。

# Input types
## Required
- model
    - 模型参数对于节点的操作至关重要，因为它决定了用于风格和构图适应的底层架构。它是节点功能构建的基础，使得输入图像的转换成为可能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter参数对于节点至关重要，因为它提供了必要的适配器机制，以便与模型集成进行风格组合。它在节点处理和适应构图框架内的风格中起着关键作用。
    - Comfy dtype: IPADAPTER
    - Python dtype: torch.Tensor
- image_style
    - image_style参数对节点的目的至关重要，因为它代表了将要与其他元素艺术地组合的风格输入。它是节点旨在融入最终图像的主要视觉风格来源。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray
- image_composition
    - image_composition参数对于定义风格元素将被整合的结构布局至关重要。它为节点的构图过程设定了舞台，确保最终图像反映了风格和结构的和谐融合。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray
## Optional
- weight_style
    - weight_style参数允许对组合中的风格影响进行微调。它是控制风格和构图之间平衡的关键因素，确保最终输出与所需的审美相一致。
    - Comfy dtype: FLOAT
    - Python dtype: float
- combine_embeds
    - combine_embeds参数决定了用于整合风格特征的嵌入组合方法。它对于节点有效合并不同风格输入的能力至关重要，影响最终图像的风格一致性。
    - Comfy dtype: COMBO[concat, add, subtract, average, norm average]
    - Python dtype: str
- start_at
    - start_at参数定义了构图过程的起始点，允许控制风格整合的初始阶段。它是节点管理风格应用进程的重要因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数指定了构图过程的终点，允许控制风格整合的最终阶段。它对于节点确定风格在构图中的影响范围至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- embeds_scaling
    - embeds_scaling参数调整了构图中使用的嵌入的缩放，这对于在整个过程中保持风格特征的完整性和质量至关重要。
    - Comfy dtype: COMBO[V only, K+V, K+V w/ C penalty, K+mean(V) w/ C penalty]
    - Python dtype: str

# Output types
- composed_image
    - composed_image输出代表了风格组合过程的最终结果，其中风格元素已经和谐地融入到构图结构中。它是对节点产生视觉上令人愉悦和连贯图像能力的一个证明。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterStyleComposition(IPAdapterAdvanced):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'ipadapter': ('IPADAPTER',), 'image_style': ('IMAGE',), 'image_composition': ('IMAGE',), 'weight_style': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 5, 'step': 0.05}), 'weight_composition': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 5, 'step': 0.05}), 'expand_style': ('BOOLEAN', {'default': False}), 'combine_embeds': (['concat', 'add', 'subtract', 'average', 'norm average'], {'default': 'average'}), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'embeds_scaling': (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],)}, 'optional': {'image_negative': ('IMAGE',), 'attn_mask': ('MASK',), 'clip_vision': ('CLIP_VISION',)}}
    CATEGORY = 'ipadapter/style_composition'
```