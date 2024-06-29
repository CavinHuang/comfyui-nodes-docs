# Documentation
- Class name: RepeatImageBatch
- Category: image/batch
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

RepeatImageBatch节点的'repeat'方法旨在将单个图像复制到一个批次维度中，允许在数据集中重复该图像。此功能对于创建增强数据集或在需要重复一致图像进行批量处理的场景中至关重要。节点的功能直接，专注于复制输入图像而不改变其固有属性。

# Input types
## Required
- image
    - 'image'参数是节点将处理的输入图像。它对节点的操作至关重要，因为它是复制过程的对象。该参数对节点执行的影响是直接的，因为输出是基于此输入重复的图像批次。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- amount
    - 'amount'参数指定输入图像应如何在批次维度上重复多少次。它是一个可选参数，默认值为1，即如果不指定，则不进行重复。这个参数的重要性在于确定输出批次的大小，直接影响后续的数据处理步骤。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output_image
    - 'output_image'是'repeat'操作的结果，包含作为批次重复的图像。批次中的每个图像都是输入图像的副本，批次大小由'amount'参数决定。这个输出很重要，因为它构成了在批量处理上下文中进一步图像处理或分析的基础。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class RepeatImageBatch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'amount': ('INT', {'default': 1, 'min': 1, 'max': 4096})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'repeat'
    CATEGORY = 'image/batch'

    def repeat(self, image, amount):
        s = image.repeat((amount, 1, 1, 1))
        return (s,)
```