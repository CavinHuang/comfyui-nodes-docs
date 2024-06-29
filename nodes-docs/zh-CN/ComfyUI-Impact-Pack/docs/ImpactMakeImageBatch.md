# Documentation
- Class name: MakeImageBatch
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

‘MakeImageBatch’节点旨在高效地将多个图像组合成一个单一的批次以供进一步处理。它通过在必要时调整大小以确保批次中的所有图像具有相同的尺寸，并将它们沿批次维度连接起来。该节点在准备图像处理任务的统一数据集方面发挥着关键作用，例如批量神经网络训练或批量图像操作。

# Input types
## Required
- image1
    - ‘image1’参数是用作图像批次尺寸参考的第一个图像。它至关重要，因为如果后续图像的尺寸不同，它们将被调整以匹配其尺寸。节点的功能依赖于此参数来创建用于下游任务的统一批次。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- kwargs
    - ‘kwargs’参数允许在批次中包含额外的图像。通过此参数提供的每个图像都以与‘image1’相同的方式进行处理，确保批次的一致性。‘kwargs’的灵活性使节点能够适应不同场景中的可变数量的图像，增强了其实用性。
    - Comfy dtype: COMBO[str, IMAGE]
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- image_batch
    - ‘image_batch’输出是已连接的图像批次，这些图像已被调整大小以保持批次内的一致性。这个输出很重要，因为它为后续的图像处理任务奠定了基础，确保批次准备好进行如神经网络输入或批量图像编辑等操作。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MakeImageBatch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image1': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, **kwargs):
        image1 = kwargs['image1']
        del kwargs['image1']
        images = [value for value in kwargs.values()]
        if len(images) == 0:
            return (image1,)
        else:
            for image2 in images:
                if image1.shape[1:] != image2.shape[1:]:
                    image2 = comfy.utils.common_upscale(image2.movedim(-1, 1), image1.shape[2], image1.shape[1], 'lanczos', 'center').movedim(1, -1)
                image1 = torch.cat((image1, image2), dim=0)
            return (image1,)
```