# Documentation
- Class name: MaskedBlur
- Category: inpaint
- Output node: False
- Repo Ref: https://github.com/Acly/comfyui-inpaint-nodes

MaskedBlur 节点旨在使用复杂的图像修复技术填充图像中缺失或不需要的部分。它对遮罩区域应用选择性模糊，使它们与周围图像内容无缝融合。该节点特别适用于基于内容的图像编辑和修复。

# Input types
## Required
- image
    - 将由节点处理的输入图像。它是图像修复操作的主要数据源，其质量直接影响最终结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 遮罩定义了图像中应该被模糊和填充的区域。它是一个关键参数，决定了图像的哪些部分将经历修复过程。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- blur
    - 模糊参数控制应用于遮罩区域的模糊效果的程度。这是一个重要的设置，它影响填充区域与图像其余部分之间的过渡平滑度。
    - Comfy dtype: INT
    - Python dtype: int
- falloff
    - 衰减参数决定了模糊效果在遮罩区域边缘处减弱的速率。它用于创建从模糊到未模糊区域的更自然和渐进的过渡。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output_image
    - 输出图像是图像修复过程的结果。它包含了原始图像，其中遮罩区域已填充并模糊以匹配周围区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MaskedBlur:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'mask': ('MASK',), 'blur': ('INT', {'default': 255, 'min': 3, 'max': 8191, 'step': 1}), 'falloff': ('INT', {'default': 0, 'min': 0, 'max': 8191, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    CATEGORY = 'inpaint'
    FUNCTION = 'fill'

    def fill(self, image: Tensor, mask: Tensor, blur: int, falloff: int):
        blur = make_odd(blur)
        falloff = min(make_odd(falloff), blur - 2)
        (image, mask) = to_torch(image, mask)
        original = image.clone()
        alpha = mask.floor()
        if falloff > 0:
            erosion = binary_erosion(alpha, falloff)
            alpha = alpha * gaussian_blur(erosion, falloff)
        alpha = alpha.repeat(1, 3, 1, 1)
        image = gaussian_blur(image, blur)
        image = original + (image - original) * alpha
        return (to_comfy(image),)
```