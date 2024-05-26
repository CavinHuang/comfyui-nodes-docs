# Documentation
- Class name: MakeImageList
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

‘MakeImageList’节点旨在将图像数据聚合到一个列表中，以便批量处理图像。它通过确保图像以与下游操作兼容的方式组织，从而在图像相关任务的工作流程中发挥着至关重要的作用。

# Input types
## Required
- image1
    - ‘image1’参数至关重要，因为它代表了要包含在列表中的第一个图像。它的包含对于节点的正确运作是必需的，突出了它在节点整体操作中的重要性。
    - Comfy dtype: IMAGE
    - Python dtype: Union[str, torch.Tensor]

# Output types
- images
    - ‘images’输出是由节点编译的图像数据列表。它很重要，因为它作为后续图像处理任务的输入，是图像操作流程中的重要环节。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class MakeImageList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image1': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, **kwargs):
        images = []
        for (k, v) in kwargs.items():
            images.append(v)
        return (images,)
```