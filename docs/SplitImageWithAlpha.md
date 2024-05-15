# Documentation
- Class name: SplitImageWithAlpha
- Category: mask/compositing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SplitImageWithAlpha节点旨在将图像的颜色信息与alpha通道分离。它在图像处理中执行一个基本功能，通过将输入图像分成两个部分：彩色图像和alpha遮罩。此节点对于需要透明度操作的任务至关重要，例如合成图像或为视觉特效创建遮罩。

# Input types
## Required
- image
    - 'image'参数是包含图像数据的输入张量。它至关重要，因为它是节点处理的主要信息来源。节点依赖此输入来提取颜色和alpha组件，然后这些组件用于后续的图像操作中。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Output types
- color_image
    - 'color_image'输出包含从输入图像中提取的颜色信息。它很重要，因为它代表了没有透明度层的视觉内容，可以直接用于显示或进一步处理。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- alpha_mask
    - 'alpha_mask'输出是输入图像的alpha通道，代表透明度信息。与原始alpha相比，它是反转的，以便在常见的合成操作中使用，其中较高的值表示更大的不透明度。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SplitImageWithAlpha:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',)}}
    CATEGORY = 'mask/compositing'
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'split_image_with_alpha'

    def split_image_with_alpha(self, image: torch.Tensor):
        out_images = [i[:, :, :3] for i in image]
        out_alphas = [i[:, :, 3] if i.shape[2] > 3 else torch.ones_like(i[:, :, 0]) for i in image]
        result = (torch.stack(out_images), 1.0 - torch.stack(out_alphas))
        return result
```