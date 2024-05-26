# Documentation
- Class name: RegionalConditioningColorMask
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

RegionalConditioningColorMask 节点旨在将颜色掩码应用于 CLIP 模型的文本编码，增强模型对图像特定区域的关注。它通过将颜色掩码图像转换为二进制掩码来实现这一点，然后将该掩码用于条件文本编码。这允许对图像生成过程进行更精细的控制，确保生成的图像与所需的主题元素紧密对齐。

# Input types
## Required
- clip
    - 参数 'clip' 是 CLIP 模型将编码的输入文本提示。它对于定义模型在图像生成过程中应关注的语义内容至关重要。节点的有效性在很大程度上取决于输入剪辑的相关性和特异性。
    - Comfy dtype: CLIP
    - Python dtype: str
- color_mask
    - 参数 'color_mask' 是定义图像内感兴趣区域的图像。该图像用于创建一个掩码，将引导模型关注指定区域。颜色掩码的质量和准确性直接影响区域条件的精度。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- mask_color
    - 参数 'mask_color' 指定了在 'color_mask' 图像中用于掩码的颜色。它对于识别图像中的目标区域很重要，并应以有效的 RGB 颜色格式提供。掩码颜色的选择影响节点隔离所需区域的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- strength
    - 参数 'strength' 控制掩码对文本编码影响的强度。较高的值增加了对掩码区域的强调，可能导致生成的图像中特征更加明显。它是微调区域焦点和整体图像一致性之间平衡的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- prompt
    - 参数 'prompt' 是一个详细的文本描述，它进一步细化了图像生成过程。它为模型提供了额外的上下文和指导，确保生成的图像更符合用户的创意愿景。提示的内容对最终输出有重大影响。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- set_cond_area
    - 参数 'set_cond_area' 确定掩码如何应用于条件。它可以使用默认行为或显式设置掩码边界。这个选择可以影响节点针对图像内特定区域进行增强区域条件的能力。
    - Comfy dtype: COMBO['default', 'mask bounds']
    - Python dtype: str

# Output types
- conditioning
    - 输出 'conditioning' 表示已经被颜色掩码修改过的文本编码。它用于指导图像生成过程，确保生成的图像反映了输入提示中指定的主题元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- mask
    - 输出 'mask' 是从 'color_mask' 图像派生的二进制掩码。它由节点内部用于将区域条件应用于文本编码，允许对图像生成过程进行更精确的控制。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class RegionalConditioningColorMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip': ('CLIP',), 'color_mask': ('IMAGE',), 'mask_color': ('STRING', {'multiline': False, 'default': '#FFFFFF'}), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'set_cond_area': (['default', 'mask bounds'],), 'prompt': ('STRING', {'multiline': True, 'placeholder': 'prompt'})}}
    RETURN_TYPES = ('CONDITIONING', 'MASK')
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Regional'

    def doit(self, clip, color_mask, mask_color, strength, set_cond_area, prompt):
        mask = color_to_mask(color_mask, mask_color)
        conditioning = nodes.CLIPTextEncode().encode(clip, prompt)[0]
        conditioning = nodes.ConditioningSetMask().append(conditioning, mask, set_cond_area, strength)[0]
        return (conditioning, mask)
```