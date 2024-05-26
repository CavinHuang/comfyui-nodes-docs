# Documentation
- Class name: OutlineMask
- Category: ♾️Mixlab/Mask
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

OutlineMask节点旨在通过应用膨胀或腐蚀过程来操纵图像掩码，以创建轮廓效果。它增强了掩码边缘的视觉区分度，这对于需要清晰和定义明确的掩码边界的应用至关重要。

# Input types
## Required
- mask
    - ‘mask’参数是OutlineMask节点的一个基本输入，代表将要处理的原始图像掩码。它在确定最终轮廓效果中起着关键作用，因为它决定了初始掩码的形状和内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- outline_width
    - ‘outline_width’参数指定要应用于掩码的轮廓扩展或收缩的程度。它是控制生成的轮廓粗细的关键因素，从而影响掩码边缘的视觉影响。
    - Comfy dtype: INT
    - Python dtype: int
- tapered_corners
    - 当设置为true时，‘tapered_corners’参数会将一个锥形效果应用于掩码的角落，创建一个更加细腻和视觉上吸引人的轮廓。这个特性增强了最终输出的美学质量。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- mask
    - OutlineMask节点的‘mask’输出是应用了轮廓效果的已处理图像掩码。它很重要，因为它代表了节点操作的最终产品，准备用于进一步使用或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class OutlineMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'outline_width': ('INT', {'default': 10, 'min': 1, 'max': MAX_RESOLUTION, 'step': 1}), 'tapered_corners': ('BOOLEAN', {'default': True})}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Mask'

    def run(self, mask, outline_width, tapered_corners):
        m1 = grow(mask, outline_width, tapered_corners)
        m2 = grow(mask, -outline_width, tapered_corners)
        m3 = combine(m1, m2, 0, 0)
        return (m3,)
```