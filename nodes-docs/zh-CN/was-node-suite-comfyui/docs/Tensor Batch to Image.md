# Documentation
- Class name: WAS_Tensor_Batch_to_Image
- Category: WAS Suite/Latent/Transform
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法`tensor_batch_to_image`旨在将一批张量图像转换为单一的图像表示。它是图像处理流程中的关键步骤，允许将批量数据转换为可以更容易使用或显示的格式。

# Input types
## Required
- images_batch
    - 参数`images_batch`非常关键，因为它包含了要转换为单一图像的一批张量图像。它在节点的操作中起着核心作用，决定了转换过程的源数据。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
## Optional
- batch_image_number
    - 参数`batch_image_number`决定从一批图像中选择哪个图像进行转换。其值通过指定批次中所需图像的索引来影响节点的执行。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出`image`是转换过程的结果，代表从一批图像中选择的图像。它很重要，因为它是节点功能的直接输出，包含了转换后的数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Tensor_Batch_to_Image:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images_batch': ('IMAGE',), 'batch_image_number': ('INT', {'default': 0, 'min': 0, 'max': 64, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'tensor_batch_to_image'
    CATEGORY = 'WAS Suite/Latent/Transform'

    def tensor_batch_to_image(self, images_batch=[], batch_image_number=0):
        count = 0
        for _ in images_batch:
            if batch_image_number == count:
                return (images_batch[batch_image_number].unsqueeze(0),)
            count = count + 1
        cstr(f'Batch number `{batch_image_number}` is not defined, returning last image').error.print()
        return (images_batch[-1].unsqueeze(0),)
```