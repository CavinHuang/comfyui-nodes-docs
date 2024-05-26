# Documentation
- Class name: ChangeChannelCount
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

ChangeChannelCount节点旨在修改图像张量的通道数。它能够智能地处理不同类型的图像，例如掩码、RGBA和RGB，并根据指定的类型进行转换。在需要进行通道操作以实现兼容性或风格化目的的图像处理工作流程中，此节点发挥着关键作用。

# Input types
## Required
- image
    - 图像参数是表示图像数据的输入张量。它至关重要，因为它是节点将处理的主要数据。节点的操作取决于此图像张量的维度和内容，这直接影响输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- kind
    - kind参数指示应用于输入图像张量的通道转换类型。它至关重要，因为它决定了图像通道的输出格式。根据指定的通道转换类型，kind参数可以显著改变节点的执行和最终结果。
    - Comfy dtype: COMBO['mask', 'RGB', 'RGBA']
    - Python dtype: str

# Output types
- output_image
    - output_image是通道转换过程的结果。它很重要，因为它代表了节点的最终输出，即根据指定的kind具有修改过的通道数的图像张量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ChangeChannelCount:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'kind': (['mask', 'RGB', 'RGBA'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'change_channels'
    CATEGORY = 'Masquerade Nodes'

    def change_channels(self, image, kind):
        image_size = image.size()
        if kind == 'mask':
            return (tensor2mask(image),)
        elif kind == 'RGBA':
            return (tensor2rgba(image),)
        else:
            return (tensor2rgb(image),)
```