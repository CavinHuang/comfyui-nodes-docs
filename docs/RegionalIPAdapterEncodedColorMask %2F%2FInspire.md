# Documentation
- Class name: RegionalIPAdapterEncodedColorMask
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点将颜色掩码应用于图像，对其进行编码以供IPAdapter模型使用。它允许对掩码的应用进行精确控制，使用户能够专注于图像的特定区域，在生成过程中进行条件化处理。

# Input types
## Required
- color_mask
    - 将要应用颜色掩码的输入图像。这张图像是生成过程中区域条件化的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask_color
    - 用于定义掩码的颜色值。此参数至关重要，因为它决定了在条件化过程中哪些部分的输入图像将被强调或忽略。
    - Comfy dtype: STRING
    - Python dtype: str
- embeds
    - 嵌入向量为模型提供额外的上下文，增强了条件化过程。这些嵌入向量对于根据输入提示和期望的风格塑造最终输出至关重要。
    - Comfy dtype: EMBEDS
    - Python dtype: List[torch.Tensor]
- weight
    - 权重参数调整掩码对生成的影响。更高的权重导致更严格遵守掩码，而较低的权重则允许更多的变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - 该参数决定了权重应用的类型，这可以显著改变条件化效果。它允许在掩码如何影响生成内容方面采取不同的策略。
    - Comfy dtype: COMBO
    - Python dtype: str
- start_at
    - 掩码效果的起始点，范围从0.0到1.0。它控制掩码对生成过程的初始影响强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - 掩码效果的结束点，也从0.0到1.0范围。它决定了掩码对生成过程的影响如何逐渐减弱直至结束。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- unfold_batch
    - 启用此选项后，允许批量应用掩码，这对于单次处理多个图像很有益处。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- REGIONAL_IPADAPTER
    - 输出是一个区域性条件化的IPAdapter对象，可以用于后续的生成步骤，携带编码的掩码信息以指导模型。
    - Comfy dtype: REGIONAL_IPADAPTER
    - Python dtype: IPAdapterConditioning
- MASK
    - 已处理的掩码图像，准备应用于生成流程。它是实现期望区域效果的关键组成部分。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class RegionalIPAdapterEncodedColorMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'color_mask': ('IMAGE',), 'mask_color': ('STRING', {'multiline': False, 'default': '#FFFFFF'}), 'embeds': ('EMBEDS',), 'weight': ('FLOAT', {'default': 0.7, 'min': -1, 'max': 3, 'step': 0.05}), 'weight_type': (['original', 'linear', 'channel penalty'],), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'unfold_batch': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('REGIONAL_IPADAPTER', 'MASK')
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Regional'

    def doit(self, color_mask, mask_color, embeds, weight, weight_type, start_at=0.0, end_at=1.0, unfold_batch=False):
        mask = color_to_mask(color_mask, mask_color)
        cond = IPAdapterConditioning(mask, weight, weight_type, embeds=embeds, start_at=start_at, end_at=end_at, unfold_batch=unfold_batch)
        return (cond, mask)
```