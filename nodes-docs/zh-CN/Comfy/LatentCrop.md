# Documentation
- Class name: LatentCrop
- Category: latent/transform
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LatentCrop节点旨在从较大的潜在空间表示中操作和提取特定区域。它在将数据的注意力集中在进一步处理或分析的相关区域中发挥着关键作用，从而增强了后续操作的效率和精度。

# Input types
## Required
- samples
    - “samples”参数是LatentCrop节点的核心输入，代表要被裁剪的潜在空间数据。对于节点的操作至关重要，因为它决定了裁剪过程的源材料。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- width
    - “width”参数指定了在潜在空间中裁剪区域所需的宽度。它是输出尺寸的关键决定因素，直接影响被提取数据的范围。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - “height”参数定义了在潜在空间中裁剪区域所需的高度。与“width”一起，它形成了最终输出的尺寸，将节点的功能集中在数据的特定部分上。
    - Comfy dtype: INT
    - Python dtype: int
- x
    - “x”参数设置潜在空间内裁剪操作的水平起始点。它在定义数据提取开始的确切位置方面至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - “y”参数确定潜在空间内裁剪操作的垂直起始点。它与“x”参数协同工作，以精确确定裁剪的起始坐标。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- cropped_samples
    - “cropped_samples”输出包含裁剪操作后的潜在空间数据的结果。它代表了原始数据的细化部分，根据指定的尺寸和位置参数进行了调整。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LatentCrop:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'width': ('INT', {'default': 512, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 512, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'x': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'y': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'crop'
    CATEGORY = 'latent/transform'

    def crop(self, samples, width, height, x, y):
        s = samples.copy()
        samples = samples['samples']
        x = x // 8
        y = y // 8
        if x > samples.shape[3] - 8:
            x = samples.shape[3] - 8
        if y > samples.shape[2] - 8:
            y = samples.shape[2] - 8
        new_height = height // 8
        new_width = width // 8
        to_x = new_width + x
        to_y = new_height + y
        s['samples'] = samples[:, :, y:to_y, x:to_x]
        return (s,)
```