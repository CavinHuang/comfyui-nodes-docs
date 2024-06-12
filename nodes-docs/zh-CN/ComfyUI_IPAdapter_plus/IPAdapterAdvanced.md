# Documentation
- Class name: IPAdapterAdvanced
- Category: ipadapter
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterAdvanced节点旨在使用IPAdapter模型应用高级图像处理技术。它智能地结合不同的嵌入和权重，以增强模型在风格和组合转移等任务中的性能。该节点在使模型适应特定图像处理要求中发挥关键作用，确保输出满足所需的美学和技术标准。

# Input types
## Required
- model
    - 模型参数对于IPAdapterAdvanced节点至关重要，因为它定义了将应用图像处理技术的基线模型。它直接影响节点的执行和处理后图像的质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - ipadapter参数是节点功能的关键组成部分，为图像处理任务提供必要的适配和配置。它决定了模型如何与输入图像互动以实现期望的结果。
    - Comfy dtype: IPADAPTER
    - Python dtype: Dict[str, Any]
- image
    - 图像参数至关重要，因为它代表了节点将处理的输入图像。图像的质量和特性显著影响节点的操作和最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- weight
    - 权重参数允许用户调整图像处理对模型的影响。这对于微调节点的性能很重要，以便在原始图像和处理后的图像之间实现所需的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - IPAdapterAdvanced节点的输出模型是融合了高级图像处理技术的加工模型。它很重要，因为它代表了所有转换应用后模型的最终状态。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterAdvanced:

    def __init__(self):
        self.unfold_batch = False

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'ipadapter': ('IPADAPTER',), 'image': ('IMAGE',), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 5, 'step': 0.05}), 'weight_type': (WEIGHT_TYPES,), 'combine_embeds': (['concat', 'add', 'subtract', 'average', 'norm average'],), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'embeds_scaling': (['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty'],)}, 'optional': {'image_negative': ('IMAGE',), 'attn_mask': ('MASK',), 'clip_vision': ('CLIP_VISION',)}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'apply_ipadapter'
    CATEGORY = 'ipadapter'

    def apply_ipadapter(self, model, ipadapter, start_at, end_at, weight=1.0, weight_style=1.0, weight_composition=1.0, expand_style=False, weight_type='linear', combine_embeds='concat', weight_faceidv2=None, image=None, image_style=None, image_composition=None, image_negative=None, clip_vision=None, attn_mask=None, insightface=None, embeds_scaling='V only', layer_weights=None):
        is_sdxl = isinstance(model.model, (comfy.model_base.SDXL, comfy.model_base.SDXLRefiner, comfy.model_base.SDXL_instructpix2pix))
        if image_style is not None:
            if not is_sdxl:
                raise Exception('Style + Composition transfer is only available for SDXL models at the moment.')
            image = image_style
            weight = weight_style
            if image_composition is None:
                image_composition = image_style
            weight_type = 'strong style and composition' if expand_style else 'style and composition'
        ipa_args = {'image': image, 'image_composition': image_composition, 'image_negative': image_negative, 'weight': weight, 'weight_composition': weight_composition, 'weight_faceidv2': weight_faceidv2, 'weight_type': weight_type, 'combine_embeds': combine_embeds, 'start_at': start_at, 'end_at': end_at, 'attn_mask': attn_mask, 'unfold_batch': self.unfold_batch, 'embeds_scaling': embeds_scaling, 'insightface': insightface if insightface is not None else ipadapter['insightface']['model'] if 'insightface' in ipadapter else None, 'layer_weights': layer_weights}
        if 'ipadapter' in ipadapter:
            ipadapter_model = ipadapter['ipadapter']['model']
            clip_vision = clip_vision if clip_vision is not None else ipadapter['clipvision']['model']
        else:
            ipadapter_model = ipadapter
            clip_vision = clip_vision
        if clip_vision is None:
            raise Exception('Missing CLIPVision model.')
        del ipadapter
        return (ipadapter_execute(model.clone(), ipadapter_model, clip_vision, **ipa_args),)
```