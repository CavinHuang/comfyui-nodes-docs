# Documentation
- Class name: ColorTint
- Category: postprocessing/Color Adjustments
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

ColorTint节点旨在调整图像的颜色色调，增强或改变其视觉吸引力。它根据选择的模式应用颜色晕染，有效地改变图像的情绪和风格。该节点适用于需要进行颜色调整的后期处理任务，以匹配所需的美学或纠正颜色不平衡。

# Input types
## Required
- image
    - 图像参数是ColorTint节点的主要输入。它是将要进行颜色调整的源图像。图像的质量和特性直接影响最终输出，使其成为实现所需视觉效果的关键组成部分。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- strength
    - 强度参数控制应用于图像的颜色晕染效果的强度。它是一个浮点数，决定了颜色变化的显著程度。较高的值会增加效果，而较低的值则使其更为微妙。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- mode
    - 模式参数决定了要应用于图像的特定颜色晕染。它提供了多种预设选项，每种选项都创造了独特的视觉风格。模式的选择显著影响处理图像的整体情绪和美学。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- result
    - 结果参数是ColorTint节点的输出。它是经过颜色晕染修改的图像，反映了输入设置。这个输出对于继续进一步处理或最终展示至关重要，包含了节点所做的创造性调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ColorTint:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 1.0, 'step': 0.1}), 'mode': (['sepia', 'red', 'green', 'blue', 'cyan', 'magenta', 'yellow', 'purple', 'orange', 'warm', 'cool', 'lime', 'navy', 'vintage', 'rose', 'teal', 'maroon', 'peach', 'lavender', 'olive'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'color_tint'
    CATEGORY = 'postprocessing/Color Adjustments'

    def color_tint(self, image: torch.Tensor, strength: float, mode: str='sepia'):
        if strength == 0:
            return (image,)
        sepia_weights = torch.tensor([0.2989, 0.587, 0.114]).view(1, 1, 1, 3).to(image.device)
        mode_filters = {'sepia': torch.tensor([1.0, 0.8, 0.6]), 'red': torch.tensor([1.0, 0.6, 0.6]), 'green': torch.tensor([0.6, 1.0, 0.6]), 'blue': torch.tensor([0.6, 0.8, 1.0]), 'cyan': torch.tensor([0.6, 1.0, 1.0]), 'magenta': torch.tensor([1.0, 0.6, 1.0]), 'yellow': torch.tensor([1.0, 1.0, 0.6]), 'purple': torch.tensor([0.8, 0.6, 1.0]), 'orange': torch.tensor([1.0, 0.7, 0.3]), 'warm': torch.tensor([1.0, 0.9, 0.7]), 'cool': torch.tensor([0.7, 0.9, 1.0]), 'lime': torch.tensor([0.7, 1.0, 0.3]), 'navy': torch.tensor([0.3, 0.4, 0.7]), 'vintage': torch.tensor([0.9, 0.85, 0.7]), 'rose': torch.tensor([1.0, 0.8, 0.9]), 'teal': torch.tensor([0.3, 0.8, 0.8]), 'maroon': torch.tensor([0.7, 0.3, 0.5]), 'peach': torch.tensor([1.0, 0.8, 0.6]), 'lavender': torch.tensor([0.8, 0.6, 1.0]), 'olive': torch.tensor([0.6, 0.7, 0.4])}
        scale_filter = mode_filters[mode].view(1, 1, 1, 3).to(image.device)
        grayscale = torch.sum(image * sepia_weights, dim=-1, keepdim=True)
        tinted = grayscale * scale_filter
        result = tinted * strength + image * (1 - strength)
        return (result,)
```