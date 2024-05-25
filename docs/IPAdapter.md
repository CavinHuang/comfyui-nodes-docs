# Documentation
- Class name: IPAdapterSimple
- Category: ipadapter
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterSimple节点旨在将图像处理适配器无缝集成到模型的工作流程中。它根据提供的图像和适配器配置对模型应用各种转换和加权，增强了模型根据特定风格或提示生成或处理图像的能力。

# Input types
## Required
- model
    - 模型参数是必不可少的，因为它代表了将由IPAdapterSimple节点适应或修改的核心结构。这是决定节点后续处理和输出的主要输入。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter参数指定了将指导节点内图像处理的适配器配置。它是一个关键组件，使节点能够应用特定的风格或转换。
    - Comfy dtype: IPADAPTER
    - Python dtype: Dict[str, Any]
- image
    - 图像参数是IPAdapterSimple节点的关键输入，因为它是将根据适配器设置进行处理和转换的视觉数据。它直接影响节点的最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- weight
    - 权重参数调整图像对模型输出的影响。它是一个浮点值，根据其大小可以显著改变节点的处理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_at
    - start_at参数定义了图像对模型影响的起始点。它是一个浮点值，有助于控制转换的初始强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数标记了图像对模型影响的终点。它与start_at参数一起工作，以确定转换效果的范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - weight_type参数指示权重参数如何影响模型。它可以指定诸如'standard'、'prompt is more important'或'style transfer'等风格，每种风格对节点的功能都有不同的影响。
    - Comfy dtype: COMBO[standard, prompt is more important, style transfer]
    - Python dtype: str
## Optional
- attn_mask
    - 可选的attn_mask参数用于指定在处理期间模型应关注输入的哪些部分。它对于将模型的注意力集中在图像的某些区域特别有用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- model
    - 输出模型代表了应用IPAdapterSimple节点转换后的输入模型的适应或修改版本。它封装了节点赋予的新图像处理能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterSimple:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'ipadapter': ('IPADAPTER',), 'image': ('IMAGE',), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05}), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'weight_type': (['standard', 'prompt is more important', 'style transfer'],)}, 'optional': {'attn_mask': ('MASK',)}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'apply_ipadapter'
    CATEGORY = 'ipadapter'

    def apply_ipadapter(self, model, ipadapter, image, weight, start_at, end_at, weight_type, attn_mask=None):
        if weight_type.startswith('style'):
            weight_type = 'style transfer'
        elif weight_type == 'prompt is more important':
            weight_type = 'ease out'
        else:
            weight_type = 'linear'
        ipa_args = {'image': image, 'weight': weight, 'start_at': start_at, 'end_at': end_at, 'attn_mask': attn_mask, 'weight_type': weight_type, 'insightface': ipadapter['insightface']['model'] if 'insightface' in ipadapter else None}
        if 'ipadapter' not in ipadapter:
            raise Exception('IPAdapter model not present in the pipeline. Please load the models with the IPAdapterUnifiedLoader node.')
        if 'clipvision' not in ipadapter:
            raise Exception('CLIPVision model not present in the pipeline. Please load the models with the IPAdapterUnifiedLoader node.')
        return (ipadapter_execute(model.clone(), ipadapter['ipadapter']['model'], ipadapter['clipvision']['model'], **ipa_args),)
```