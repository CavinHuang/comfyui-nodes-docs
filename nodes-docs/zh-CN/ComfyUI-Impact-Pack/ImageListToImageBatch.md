# Documentation
- Class name: ImageListToImageBatch
- Category: ImpactPack/Operation
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

该节点旨在将图像列表高效地转换为单个图像批次。它通过在第一维度上连接图像来实现这一点，确保批次中的所有图像具有相同的形状。节点在准备图像数据以进行进一步处理（如基于批次的神经网络操作）中发挥着关键作用。

# Input types
## Required
- images
    - 'image' 参数是节点将处理的图像张量列表。它对节点的操作至关重要，因为它直接影响图像批次的创建。该参数确保所有图像都兼容，可以连接成单个批次。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Output types
- image_batch
    - 该节点的输出是一个表示图像批次的单个图像张量。这个批次是通过在第一维度上连接输入图像创建的，使其适合需要批量图像数据的下游任务。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ImageListToImageBatch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',)}}
    INPUT_IS_LIST = True
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Operation'

    def doit(self, images):
        if len(images) <= 1:
            return (images,)
        else:
            image1 = images[0]
            for image2 in images[1:]:
                if image1.shape[1:] != image2.shape[1:]:
                    image2 = comfy.utils.common_upscale(image2.movedim(-1, 1), image1.shape[2], image1.shape[1], 'lanczos', 'center').movedim(1, -1)
                image1 = torch.cat((image1, image2), dim=0)
            return (image1,)
```