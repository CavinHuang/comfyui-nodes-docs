# Documentation
- Class name: GetImageCount
- Category: Video Helper Suite 🎥🅥🅗🅢/image
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

GetImageCount节点旨在高效地确定给定数据集中存在的图像总数。它是视频处理工作流中的关键组件，提供了一种直接的方法来了解数据集的大小，而无需深入了解单个图像数据的复杂性。该节点的主要目标是提供一个简洁可靠的计数，这对于规划和管理计算资源至关重要。

# Input types
## Required
- images
    - 'image'参数是包含图像数据的输入数据集。它是节点操作的基本元素，因为它直接影响计数结果。节点处理此输入以确定图像的总数，这对于各种下游任务（如分析、索引和资源分配）至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- count
    - ‘count’输出提供了节点处理的图像总数。它是一个单一的整数值，表示数据集在图像数量方面的规模。这个输出对于需要知道数据集规模以进行进一步处理或对应用程序需求做出明智决策的用户来说非常重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class GetImageCount:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',)}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/image'
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('count',)
    FUNCTION = 'count_input'

    def count_input(self, images: Tensor):
        return (images.size(0),)
```