# Documentation
- Class name: ImageToMask
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

ImageToMask节点旨在将输入图像转换为掩码表示。它提供了一种基于强度或alpha值转换图像的方法，有助于从输入数据创建二进制或单通道掩码，这对于各种图像处理任务（如分割）至关重要。

# Input types
## Required
- image
    - 图像参数是必需的，因为它是节点的主要输入。它通过确定要生成的掩码的来源来影响节点的执行。预期图像以张量格式存在，节点将处理该张量以产生所需的掩码输出。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- method
    - 方法参数决定了节点采用的转换策略。它很重要，因为它决定了掩码是基于强度还是alpha值派生，这反过来又影响了最终掩码的特性和适用于下游应用的适宜性。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- MASK
    - MASK输出是一个张量，表示从输入图像派生的掩码。它是一个关键的输出，因为它是节点转换过程的直接结果将转换后的图像数据封装成适合于分割或其他基于掩码的应用的格式。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageToMask:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'method': (['intensity', 'alpha'],)}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'convert'
    CATEGORY = 'Masquerade Nodes'

    def convert(self, image, method):
        if method == 'intensity':
            if len(image.shape) > 3 and image.shape[3] == 4:
                image = tensor2rgb(image)
            return (tensor2mask(image),)
        else:
            return (tensor2rgba(image)[:, :, :, 0],)
```