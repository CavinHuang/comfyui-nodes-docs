# Documentation
- Class name: MakeImageBatch
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

‘MakeImageBatch’节点旨在高效地将多个单独的图像或现有的图像批次合并为一个单一的、统一的批次。这个节点在图像处理任务的预处理阶段中扮演着至关重要的角色，允许将各种图像输入聚合成适合批量处理的格式。

# Input types
## Required
- image1
    - 作为图像批次创建基础的主要图像。它是必需的，其存在启动了批次形成过程。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- image2
    - 可以连接到批次的可选附加图像。它增强了批次内的多样性，为处理提供了更多数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image3
    - 批次中的另一个可选图像，进一步扩展了用于全面分析的数据集。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image4
    - 可以包含在批次中的额外图像，以增加图像数据的体积。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image5
    - 此图像是可选的，它增加了图像批次的复杂性和丰富性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image6
    - 可以添加到批次中的最终可选图像，为数据集大小提供最后的贡献。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- result
    - 输出是通过按顺序附加输入图像创建的整合图像批次。它很重要，因为它代表了批次创建过程的顶点。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MakeImageBatch:
    """
    Creates a batch of images from multiple individual images or batches.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image1': ('IMAGE',)}, 'optional': {'image2': ('IMAGE',), 'image3': ('IMAGE',), 'image4': ('IMAGE',), 'image5': ('IMAGE',), 'image6': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'append'
    CATEGORY = 'Masquerade Nodes'

    def append(self, image1, image2=None, image3=None, image4=None, image5=None, image6=None):
        result = image1
        if image2 is not None:
            result = torch.cat((result, image2), 0)
        if image3 is not None:
            result = torch.cat((result, image3), 0)
        if image4 is not None:
            result = torch.cat((result, image4), 0)
        if image5 is not None:
            result = torch.cat((result, image5), 0)
        if image6 is not None:
            result = torch.cat((result, image6), 0)
        return (result,)
```