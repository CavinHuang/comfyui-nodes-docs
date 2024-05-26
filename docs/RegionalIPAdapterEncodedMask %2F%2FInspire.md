# Documentation
- Class name: RegionalIPAdapterEncodedMask
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

RegionalIPAdapterEncodedMask 类旨在将区域掩码应用于图像处理适配器，使得可以根据指定的掩码对生成的图像进行条件化处理。该节点通过专注于图像中的特定感兴趣区域，增强了对图像生成过程的控制。它允许对图像属性和风格转移进行微调，确保生成的内容紧密符合所需的视觉元素。

# Input types
## Required
- mask
    - 掩码参数对于定义节点将关注图像的哪些区域至关重要。它作为图像生成过程的指南，确保指定的区域根据用户意图得到强调或修改。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- embeds
    - 嵌入向量提供了一种将额外上下文和信息纳入图像生成过程的方法。它们可以捕捉到仅凭掩码可能不存在的细微差别和细节，提高了生成图像的整体质量和相关性。
    - Comfy dtype: embeds
    - Python dtype: torch.Tensor
- weight
    - 权重参数调整掩码和嵌入向量对图像生成的影响。通过调整这个值，用户可以控制掩码和嵌入向量对最终输出的影响程度，从而在期望的视觉元素和自然生成过程之间实现平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - 权重类型参数决定了如何将权重应用于掩码和嵌入向量。每种类型提供了一种不同的方法来混合用户输入和生成模型的输出，影响最终图像的风格和外观。
    - Comfy dtype: COMBO[original, linear, channel penalty]
    - Python dtype: str
- start_at
    - start_at 参数定义了掩码对图像影响的开始位置。它有助于控制掩码影响的空间分布，确保准确定位到目标区域。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at 参数指定了掩码对图像影响的结束位置。它与 start_at 配合使用，定义了掩码影响的应用范围，允许对生成图像的区域条件化进行精确控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- unfold_batch
    - unfold_batch 参数允许在应用掩码和嵌入向量时操纵批次维度。这对于高效处理大量图像批次非常有用，优化了节点的性能和吞吐量。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- REGIONAL_IPADAPTER
    - RegionalIPAdapterEncodedMask 节点的输出是一个根据输入掩码、嵌入向量和其他参数修改过的条件化图像适配器。这个输出可以用作进一步图像生成或操作任务的构建块，无缝集成到创作工作流程中。
    - Comfy dtype: REGIONAL_IPADAPTER
    - Python dtype: IPAdapterConditioning

# Usage tips
- Infra type: GPU

# Source code
```
class RegionalIPAdapterEncodedMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'embeds': ('embeds',), 'weight': ('FLOAT', {'default': 0.7, 'min': -1, 'max': 3, 'step': 0.05}), 'weight_type': (['original', 'linear', 'channel penalty'],), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'unfold_batch': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('REGIONAL_IPADAPTER',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Regional'

    def doit(self, mask, embeds, weight, weight_type, start_at=0.0, end_at=1.0, unfold_batch=False):
        cond = IPAdapterConditioning(mask, weight, weight_type, embeds=embeds, start_at=start_at, end_at=end_at, unfold_batch=unfold_batch)
        return (cond,)
```