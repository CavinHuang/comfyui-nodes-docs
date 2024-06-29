# Documentation
- Class name: DuplicateImages
- Category: Video Helper Suite 🎥🅥🅗🅢/image
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

DuplicateImages节点旨在将给定的一组图片复制指定的次数。它用于增加图像数据，适用于机器学习等场景，其中更大的数据集可以改善模型训练。节点的功能非常直接：它接受一个图像数组和一个整数乘数，然后返回一个新的数组，其中包含重复给定次数的图像，以及图像的总数。

# Input types
## Required
- images
    - 'image'参数是DuplicateImages节点的关键输入，因为它代表了将要复制的图像集。节点处理这个输入以创建多个副本，这对于某些图像处理任务或数据增强策略至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- multiply_by
    - 'multiply_by'参数决定了'images'输入中的每个图像将被复制多少次。它是一个整数，直接影响输出数据集的大小，因此是节点在数据增强目的中操作的关键因素。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 'IMAGE'输出参数代表重复的图像数组。这是DuplicateImages节点操作的主要结果，包含了根据'multiply_by'参数重复的所有原始图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- count
    - 'count'输出参数提供了重复后的图像总数。这个整数值有助于跟踪数据集的大小，这对于进一步的处理或分析可能很重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class DuplicateImages:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'multiply_by': ('INT', {'default': 1, 'min': 1, 'max': BIGMAX, 'step': 1})}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/image'
    RETURN_TYPES = ('IMAGE', 'INT')
    RETURN_NAMES = ('IMAGE', 'count')
    FUNCTION = 'duplicate_input'

    def duplicate_input(self, images: Tensor, multiply_by: int):
        full_images = []
        for n in range(0, multiply_by):
            full_images.append(images)
        new_images = torch.cat(full_images, dim=0)
        return (new_images, new_images.size(0))
```