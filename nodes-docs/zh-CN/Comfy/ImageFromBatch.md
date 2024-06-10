# Documentation
- Class name: ImageFromBatch
- Category: image/batch
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageFromBatch 节点旨在从一批图像中提取一系列图像。它在图像处理工作流程中充当关键组件，使用户能够高效地隔离和操作特定的图像数据段。该节点的功能在处理大量图像数据时至关重要，可以对特定的图像子集进行集中分析和处理。

# Input types
## Required
- image
    - 'image' 参数是节点的主要输入，代表要处理的图像批次。它至关重要，因为它构成了节点内所有后续操作的基础。节点的性能以及提取的图像质量严重依赖于输入图像批次的完整性和格式。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- batch_index
    - 'batch_index' 参数指定了在图像批次中开始提取的起始索引。它在确定将被处理的图像子集方面起着重要作用，允许精确控制选择哪些图像进行进一步分析。
    - Comfy dtype: INT
    - Python dtype: int
- length
    - 'length' 参数指示从指定的 'batch_index' 开始，从批次中提取的连续图像的数量。它很重要，因为它决定了节点将输出的图像序列的大小，影响后续图像处理任务的范围。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image_sequence
    - 'image_sequence' 输出是基于指定索引和长度从输入批次中提取的图像集合。它代表了节点的主要输出，对于需要一组专注的图像进行分析或操作的下游任务具有重要意义。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageFromBatch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'batch_index': ('INT', {'default': 0, 'min': 0, 'max': 4095}), 'length': ('INT', {'default': 1, 'min': 1, 'max': 4096})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'frombatch'
    CATEGORY = 'image/batch'

    def frombatch(self, image, batch_index, length):
        s_in = image
        batch_index = min(s_in.shape[0] - 1, batch_index)
        length = min(s_in.shape[0] - batch_index, length)
        s = s_in[batch_index:batch_index + length].clone()
        return (s,)
```