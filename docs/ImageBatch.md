# Documentation
- Class name: ImageBatch
- Category: image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageBatch节点的'batch'方法旨在高效地处理并组合两个图像输入到一个批次中。它通过执行上采样操作确保两个图像具有相同的尺寸（如果必要），然后沿批次维度将它们连接起来。这个节点在准备数据进行进一步的图像处理任务中起着关键作用，例如神经网络训练或批量图像操作。

# Input types
## Required
- image1
    - 'image1'参数代表批次中的第一个图像。它对节点的操作至关重要，因为它是将被处理和组合的两个图像之一。图像的尺寸和内容对节点的输出和后续处理步骤有显著影响。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image2
    - 'image2'参数表示将包含在批次中的第二个图像。它是节点功能所需的，并且与'image1'一起处理。如果'image2'的尺寸与'image1'不同，其尺寸将被调整以匹配'image1'，确保批次中的一致性，以进行一致的处理。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- batched_images
    - 'batched_images'输出是一个包含'image1'和'image2'组合图像的张量。它是节点操作的主要结果，代表了准备好用于下游任务（如模型推理或进一步图像分析）的图像批次。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageBatch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image1': ('IMAGE',), 'image2': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'batch'
    CATEGORY = 'image'

    def batch(self, image1, image2):
        if image1.shape[1:] != image2.shape[1:]:
            image2 = comfy.utils.common_upscale(image2.movedim(-1, 1), image1.shape[2], image1.shape[1], 'bilinear', 'center').movedim(1, -1)
        s = torch.cat((image1, image2), dim=0)
        return (s,)
```