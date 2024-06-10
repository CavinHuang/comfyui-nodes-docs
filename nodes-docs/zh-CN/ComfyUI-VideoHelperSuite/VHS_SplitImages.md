# Documentation
- Class name: SplitImages
- Category: Video Helper Suite 🎥🅥🅗🅢/image
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

SplitImages节点旨在将一系列图像根据指定的索引分割成两个不同的组。它在图像处理工作流程中扮演着关键角色，其中数据的分割对于后续操作至关重要，如分析、排序或对不同子集进行特殊处理。

# Input types
## Required
- images
    - 'image'参数是节点将处理的图像数据集合。它是节点操作的基础，因为它决定了将要被分割的内容。该参数对节点执行的影响是直接的，因为节点的全部逻辑都围绕着对这一输入进行分割。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- split_index
    - 'split_index'参数定义了输入图像被分成两个组的位置。它对于确定每个组的大小至关重要，因此影响节点操作的结果。除非另有指定，否则默认值确保了平衡的分割。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE_A
    - 'IMAGE_A'输出包含了分割操作结果中的第一组图像。它代表了原始图像集合的一部分，对于进一步的处理或分析具有重要意义。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- A_count
    - 'A_count'输出提供了第一组图像的数量，这是由分割操作确定的。这个计数对于跟踪图像的分布或需要知道组大小的下游处理很重要。
    - Comfy dtype: INT
    - Python dtype: int
- IMAGE_B
    - 'IMAGE_B'输出保存了分割后的第二组图像。它是'IMAGE_A'的对应部分，对于可能涉及对两组进行不同处理或评估的后续步骤同样重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- B_count
    - 'B_count'输出表明了分割后进入第二组的图像数量。这个信息对于理解数据集的划分很有价值，可以为进一步的分析或处理步骤提供信息。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SplitImages:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'split_index': ('INT', {'default': 0, 'step': 1, 'min': BIGMIN, 'max': BIGMAX})}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/image'
    RETURN_TYPES = ('IMAGE', 'INT', 'IMAGE', 'INT')
    RETURN_NAMES = ('IMAGE_A', 'A_count', 'IMAGE_B', 'B_count')
    FUNCTION = 'split_images'

    def split_images(self, images: Tensor, split_index: int):
        group_a = images[:split_index]
        group_b = images[split_index:]
        return (group_a, group_a.size(0), group_b, group_b.size(0))
```