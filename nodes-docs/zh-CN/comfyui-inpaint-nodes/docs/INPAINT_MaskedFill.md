# Documentation
- Class name: MaskedFill
- Category: inpaint
- Output node: False
- Repo Ref: https://github.com/Acly/comfyui-inpaint-nodes

该节点通过使用不同的算法填充图像中缺失或遮蔽的区域，并与周围上下文相匹配，从而执行图像修复，使填充区域与原始图像无缝融合。

# Input types
## Required
- image
    - 图像参数是必需的，因为它提供了图像修复过程的基础输入。它是节点操作的主要数据，用于实现所需的图像修复效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 遮罩参数定义了需要进行图像修复的图像区域。它作为节点的指南，用于确定图像内容需要填充或修改的位置。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- fill
    - 填充参数决定了要使用的图像修复方法，这对填充内容的质量和风格有重大影响。它对于实现期望的视觉结果至关重要。
    - Comfy dtype: COMBO[('neutral', 'telea', 'navier-stokes')]
    - Python dtype: str
## Optional
- falloff
    - 衰减参数通过控制侵蚀和模糊操作的半径来影响图像修复过渡的平滑度，从而决定了填充区域与原始图像的融合方式。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出图像是图像修复过程的结果，其中遮蔽区域已填充与周围上下文相匹配的内容，提供了一个无缝且视觉上连贯的最终图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class MaskedFill:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'mask': ('MASK',), 'fill': (['neutral', 'telea', 'navier-stokes'],), 'falloff': ('INT', {'default': 0, 'min': 0, 'max': 8191, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    CATEGORY = 'inpaint'
    FUNCTION = 'fill'

    def fill(self, image: Tensor, mask: Tensor, fill: str, falloff: int):
        alpha = mask.expand(1, *mask.shape[-2:]).floor()
        falloff = make_odd(falloff)
        if falloff > 0:
            erosion = binary_erosion(alpha, falloff)
            alpha = alpha * gaussian_blur(erosion, falloff)
        if fill == 'neutral':
            image = image.detach().clone()
            m = (1.0 - alpha).squeeze(1)
            for i in range(3):
                image[:, :, :, i] -= 0.5
                image[:, :, :, i] *= m
                image[:, :, :, i] += 0.5
        else:
            import cv2
            method = cv2.INPAINT_TELEA if fill == 'telea' else cv2.INPAINT_NS
            alpha_np = alpha.squeeze(0).cpu().numpy()
            alpha_bc = alpha_np.reshape(*alpha_np.shape, 1)
            for slice in image:
                image_np = slice.cpu().numpy()
                filled_np = cv2.inpaint((255.0 * image_np).astype(np.uint8), (255.0 * alpha_np).astype(np.uint8), 3, method)
                filled_np = filled_np.astype(np.float32) / 255.0
                filled_np = image_np * (1.0 - alpha_bc) + filled_np * alpha_bc
                slice.copy_(torch.from_numpy(filled_np))
        return (image,)
```