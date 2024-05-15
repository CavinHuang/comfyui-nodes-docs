# Documentation
- Class name: JoinImageWithAlpha
- Category: mask/compositing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

JoinImageWithAlpha节点旨在将alpha遮罩与图像无缝集成，通过将两个元素混合来增强视觉组合。它通过调整alpha遮罩的大小以匹配输入图像的尺寸，然后将它们组合以产生具有alpha通道的单个输出图像，从而允许更复杂的遮罩和合成技术。

# Input types
## Required
- image
    - 图像参数是节点的主要输入，代表将与alpha遮罩组合的基础视觉内容。它对节点的操作至关重要，因为它决定了最终输出图像的底层结构。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- alpha
    - alpha参数定义了将应用于图像的遮罩。它至关重要，因为它控制了最终合成图像中不同区域的透明度和可见性，允许对混合过程进行精确控制。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Output types
- output_image
    - output_image是节点操作的结果，是一个带有alpha通道的组合图像，反映了输入图像和alpha遮罩的集成。这个输出很重要，因为它使得进一步的处理或具有高级遮罩功能的渲染成为可能。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class JoinImageWithAlpha:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'alpha': ('MASK',)}}
    CATEGORY = 'mask/compositing'
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'join_image_with_alpha'

    def join_image_with_alpha(self, image: torch.Tensor, alpha: torch.Tensor):
        batch_size = min(len(image), len(alpha))
        out_images = []
        alpha = 1.0 - resize_mask(alpha, image.shape[1:])
        for i in range(batch_size):
            out_images.append(torch.cat((image[i][:, :, :3], alpha[i].unsqueeze(2)), dim=2))
        result = (torch.stack(out_images),)
        return result
```