# Documentation
- Class name: ImageBatchToImageList
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImageBatchToImageList节点旨在将一批图像转换为单个图像的列表。它作为ImpactPack类别中的一个实用工具，促进了从批量处理到单个图像处理的转换，这对于某些需要逐个图像操作的下游任务至关重要。

# Input types
## Required
- image
    - 'image'参数是要处理的输入图像批次。它至关重要，因为它决定了将被转换为单个图像列表的内容。节点的功能直接依赖于输入图像的质量和格式。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- images
    - 'images'输出是由输入批次派生出的单个图像列表。列表中的每个图像对应原始批次中的一个元素，适用于需要单独图像操作或分析的应用程序。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class ImageBatchToImageList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, image):
        images = [image[i:i + 1, ...] for i in range(image.shape[0])]
        return (images,)
```