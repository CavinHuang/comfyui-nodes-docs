# Documentation
- Class name: RegionalConditioningSimple
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

此类节点提供了一种使用CLIP和指定掩码对图像应用区域性条件的方法。它允许根据用户输入微调图像生成，以专注于某些区域，提高生成内容的相关性和准确性。

# Input types
## Required
- clip
    - “clip”参数对于节点的运作至关重要，因为它定义了图像生成所基于的视觉上下文。它是条件过程的主要输入。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- mask
    - “mask”参数对于指定图像内的兴趣区域至关重要。它指导节点选择性地应用条件效果，确保生成的内容与用户期望的焦点区域一致。
    - Comfy dtype: MASK
    - Python dtype: PIL.Image
- strength
    - “strength”参数调整区域性条件的强度，允许用户控制对指定区域的强调程度。它直接影响输出中条件特征的显著性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- set_cond_area
    - “set_cond_area”参数决定了定义区域性条件区域的方法。它可以是默认设置或基于掩码边界，这影响了掩码如何应用于图像。
    - Comfy dtype: COMBO
    - Python dtype: str
- prompt
    - “prompt”参数提供了指导图像生成过程的文本描述。它是条件不可或缺的一部分，因为它为AI提供了创建与期望输出匹配的内容的上下文和方向。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- conditioning
    - “conditioning”输出代表了已应用于图像的处理过的区域性条件数据。它包含了输入参数的效果，是进一步图像操作或分析的关键组成部分。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class RegionalConditioningSimple:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip': ('CLIP',), 'mask': ('MASK',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'set_cond_area': (['default', 'mask bounds'],), 'prompt': ('STRING', {'multiline': True, 'placeholder': 'prompt'})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Regional'

    def doit(self, clip, mask, strength, set_cond_area, prompt):
        conditioning = nodes.CLIPTextEncode().encode(clip, prompt)[0]
        conditioning = nodes.ConditioningSetMask().append(conditioning, mask, set_cond_area, strength)[0]
        return (conditioning,)
```