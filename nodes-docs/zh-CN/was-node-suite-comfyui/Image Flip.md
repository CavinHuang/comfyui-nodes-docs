# Documentation
- Class name: WAS_Image_Flip
- Category: WAS Suite/Image/Transform
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

图像翻转方法旨在通过水平或垂直翻转对一组图像进行变换。此操作对于机器学习任务中的数据增强至关重要，它提供了训练数据的多样性，可以提高模型的鲁棒性和泛化能力。

# Input types
## Required
- images
    - 参数 'images' 是要翻转的图像集合。它在节点的操作中起着核心作用，因为转换直接应用于这些图像。节点的结果严重依赖于输入图像的内容和格式。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- mode
    - 参数 'mode' 决定了输入图像将被翻转的方向。它非常重要，因为它决定了应用于图像的转换类型。在 'horizontal' 和 'vertical' 之间的选择直接影响图像处理的最终结果。
    - Comfy dtype: COMBO['horizontal', 'vertical']
    - Python dtype: str

# Output types
- images
    - 输出 'images' 代表翻转变换后的图像。它很重要，因为它是节点操作的直接结果，并用于工作流后续阶段的进一步处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Flip:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'mode': (['horizontal', 'vertical'],)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('images',)
    FUNCTION = 'image_flip'
    CATEGORY = 'WAS Suite/Image/Transform'

    def image_flip(self, images, mode):
        batch_tensor = []
        for image in images:
            image = tensor2pil(image)
            if mode == 'horizontal':
                image = image.transpose(0)
            if mode == 'vertical':
                image = image.transpose(1)
            batch_tensor.append(pil2tensor(image))
        batch_tensor = torch.cat(batch_tensor, dim=0)
        return (batch_tensor,)
```