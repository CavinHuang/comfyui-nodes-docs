# Documentation
- Class name: SelectEveryNthImage
- Category: Video Helper Suite 🎥🅥🅗🅢/image
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

SelectEveryNthImage 节点的 `select_images` 方法旨在从较大的图像集合中高效地选择并检索子集。它通过选择用户指定的每第 n 个图像来操作，允许创建一个保持原始顺序的精简序列。这种功能特别适用于需要一个代表性图像的减少集，而无需处理整个数据集的应用场景。

# Input types
## Required
- images
    - “images”参数是节点将处理的图像数据集合。它是节点操作的基本，因为它代表了要从中选择图像的输入数据集。节点的执行和结果输出严重依赖于此参数的内容和结构。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- select_every_nth
    - “select_every_nth”参数决定了从输入集合中选择图像的频率。它是节点操作中的一个关键决定因素，因为它直接影响着输出中返回的图像数量。该参数确保了选择过程是系统性的和可预测的，基于指定的间隔。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - “IMAGE”输出由输入集合中选定的图像子集组成。这个输出非常重要，因为它代表了节点操作的直接结果，为用户提供了基于指定选择标准的精选图像序列。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- count
    - “count”输出提供了从输入集合中选择的图像总数。这个信息对用户来说很有价值，因为它有助于理解选择过程的范围，并在原始数据集的背景下评估输出。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SelectEveryNthImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'select_every_nth': ('INT', {'default': 1, 'min': 1, 'max': BIGMAX, 'step': 1})}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢/image'
    RETURN_TYPES = ('IMAGE', 'INT')
    RETURN_NAMES = ('IMAGE', 'count')
    FUNCTION = 'select_images'

    def select_images(self, images: Tensor, select_every_nth: int):
        sub_images = images[0::select_every_nth]
        return (sub_images, sub_images.size(0))
```