# Documentation
- Class name: ImageSplitNode
- Category: util
- Output node: False
- Repo Ref: https://github.com/esheep/esheep_custom_nodes.git

该节点旨在将一批图像分割成更小的子集，通过分解大型图像数据集为可管理的小块来促进处理。它通过允许并行处理来增强工作流程，并可以提高计算任务的效率。在分割过程中，节点保持图像的完整性。

# Input types
## Required
- images
    - 输入参数'images'是一组图像数据，节点将对其进行处理。它对节点的操作至关重要，因为它作为图像分割功能的主要输入。图像的质量和格式显著影响后续的处理和输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- split_images
    - 节点的输出由多个图像子集组成，它们是图像分割过程的结果。这些子集已准备好进行进一步处理，并可用于各种下游任务，如特征提取或模型训练。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class ImageSplitNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',)}}
    MAX_SIZE = 6
    RETURN_TYPES = ['IMAGE'] * 6
    FUNCTION = 'main'
    CATEGORY = 'util'

    def main(self, images):
        items = torch.chunk(images, self.MAX_SIZE)
        padding_size = self.MAX_SIZE - len(items)
        if padding_size > 0:
            items = items + tuple([create_empty_image()] * padding_size)
        return items
```