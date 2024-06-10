# Documentation
- Class name: LatentComposite
- Category: latent
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentComposite节点旨在混合两个不同样本集的潜在表示。它执行合成操作，可以是正常或羽化的方式，根据指定的坐标和混合方法，将一个样本集无缝集成到另一个中。

# Input types
## Required
- samples_to
    - 参数'samples_to'表示将'samples_from'合成的基潜在样本。它至关重要，因为它决定了最终输出的结构和维度。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- samples_from
    - 参数'samples_from'定义了将合成到'samples_to'上的潜在样本。它的选择显著影响最终组合。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- x
    - 参数'x'指定合成操作的水平起始坐标。它的值直接影响'samples_from'在'samples_to'内的位置。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - 参数'y'确定合成操作的垂直起始坐标。它对于'samples_from'在'samples_to'内的放置至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- feather
    - 参数'feather'控制合成操作边缘的平滑度。非零值会在两组样本之间产生羽化或渐进的过渡。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples_out
    - 参数'samples_out'是合成操作的结果，代表从'samples_to'和'samples_from'合并后的潜在样本。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class LatentComposite:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples_to': ('LATENT',), 'samples_from': ('LATENT',), 'x': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'y': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'feather': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'composite'
    CATEGORY = 'latent'

    def composite(self, samples_to, samples_from, x, y, composite_method='normal', feather=0):
        x = x // 8
        y = y // 8
        feather = feather // 8
        samples_out = samples_to.copy()
        s = samples_to['samples'].clone()
        samples_to = samples_to['samples']
        samples_from = samples_from['samples']
        if feather == 0:
            s[:, :, y:y + samples_from.shape[2], x:x + samples_from.shape[3]] = samples_from[:, :, :samples_to.shape[2] - y, :samples_to.shape[3] - x]
        else:
            samples_from = samples_from[:, :, :samples_to.shape[2] - y, :samples_to.shape[3] - x]
            mask = torch.ones_like(samples_from)
            for t in range(feather):
                if y != 0:
                    mask[:, :, t:1 + t, :] *= 1.0 / feather * (t + 1)
                if y + samples_from.shape[2] < samples_to.shape[2]:
                    mask[:, :, mask.shape[2] - 1 - t:mask.shape[2] - t, :] *= 1.0 / feather * (t + 1)
                if x != 0:
                    mask[:, :, :, t:1 + t] *= 1.0 / feather * (t + 1)
                if x + samples_from.shape[3] < samples_to.shape[3]:
                    mask[:, :, :, mask.shape[3] - 1 - t:mask.shape[3] - t] *= 1.0 / feather * (t + 1)
            rev_mask = torch.ones_like(mask) - mask
            s[:, :, y:y + samples_from.shape[2], x:x + samples_from.shape[3]] = samples_from[:, :, :samples_to.shape[2] - y, :samples_to.shape[3] - x] * mask + s[:, :, y:y + samples_from.shape[2], x:x + samples_from.shape[3]] * rev_mask
        samples_out['samples'] = s
        return (samples_out,)
```