# Documentation
- Class name: PorterDuffImageComposite
- Category: mask/compositing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PorterDuffImageComposite节点旨在使用Porter-Duff合成操作符执行图像合成。它接收源图像和目标图像以及它们各自的alpha遮罩和合成模式，以产生合成的图像和遮罩。这个节点对于以模拟各种混合模式的视觉效应的方式混合图像至关重要。

# Input types
## Required
- source
    - 源图像是合成过程中的关键输入，因为它代表了将与目标图像混合的主要视觉内容。它对于确定合成结果的最终外观至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- source_alpha
    - 源alpha遮罩定义了源图像的透明度，并在合成过程中源图像与目标图像的交互方式中起着重要作用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- destination
    - 目标图像作为源图像将被合成的背景。它是确定合成图像最终外观的重要组件。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- destination_alpha
    - 目标alpha遮罩指定了目标图像的透明度级别，影响源图像在合成期间如何与其混合。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mode
    - 合成模式决定了用于混合源图像和目标图像的算法。它是一个关键参数，决定了合成操作的视觉结果。
    - Comfy dtype: COMBO[PorterDuffMode]
    - Python dtype: PorterDuffMode

# Output types
- composited_image
    - 合成图像是根据指定的合成模式混合源图像和目标图像的结果。它代表了节点的最终视觉输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- composited_alpha
    - 合成alpha代表合成过程中产生的透明度遮罩。它用于定义合成图像的透明度级别。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class PorterDuffImageComposite:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'source': ('IMAGE',), 'source_alpha': ('MASK',), 'destination': ('IMAGE',), 'destination_alpha': ('MASK',), 'mode': ([mode.name for mode in PorterDuffMode], {'default': PorterDuffMode.DST.name})}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'composite'
    CATEGORY = 'mask/compositing'

    def composite(self, source: torch.Tensor, source_alpha: torch.Tensor, destination: torch.Tensor, destination_alpha: torch.Tensor, mode):
        batch_size = min(len(source), len(source_alpha), len(destination), len(destination_alpha))
        out_images = []
        out_alphas = []
        for i in range(batch_size):
            src_image = source[i]
            dst_image = destination[i]
            assert src_image.shape[2] == dst_image.shape[2]
            src_alpha = source_alpha[i].unsqueeze(2)
            dst_alpha = destination_alpha[i].unsqueeze(2)
            if dst_alpha.shape[:2] != dst_image.shape[:2]:
                upscale_input = dst_alpha.unsqueeze(0).permute(0, 3, 1, 2)
                upscale_output = comfy.utils.common_upscale(upscale_input, dst_image.shape[1], dst_image.shape[0], upscale_method='bicubic', crop='center')
                dst_alpha = upscale_output.permute(0, 2, 3, 1).squeeze(0)
            if src_image.shape != dst_image.shape:
                upscale_input = src_image.unsqueeze(0).permute(0, 3, 1, 2)
                upscale_output = comfy.utils.common_upscale(upscale_input, dst_image.shape[1], dst_image.shape[0], upscale_method='bicubic', crop='center')
                src_image = upscale_output.permute(0, 2, 3, 1).squeeze(0)
            if src_alpha.shape != dst_alpha.shape:
                upscale_input = src_alpha.unsqueeze(0).permute(0, 3, 1, 2)
                upscale_output = comfy.utils.common_upscale(upscale_input, dst_alpha.shape[1], dst_alpha.shape[0], upscale_method='bicubic', crop='center')
                src_alpha = upscale_output.permute(0, 2, 3, 1).squeeze(0)
            (out_image, out_alpha) = porter_duff_composite(src_image, src_alpha, dst_image, dst_alpha, PorterDuffMode[mode])
            out_images.append(out_image)
            out_alphas.append(out_alpha.squeeze(2))
        result = (torch.stack(out_images), torch.stack(out_alphas))
        return result
```