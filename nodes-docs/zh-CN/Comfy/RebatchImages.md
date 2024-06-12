# Documentation
- Class name: ImageRebatch
- Category: image/batch
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageRebatch节点旨在高效地将图像数据重新组织成批次。它接收一组图像和一个指定的批次大小，然后处理这些图像以创建更小的批次，这些批次可用于并行处理或基于批次的机器学习任务。该节点在优化图像数据的处理中发挥着关键作用，允许更高效的训练和推理工作流程。

# Input types
## Required
- images
    - ‘images’参数是节点将处理的图像数据集合。它是节点操作的基本，作批处理的原材料。节点的功能直接依赖于输入图像的质量和格式，这将影响批处理的效率和结果。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- batch_size
    - ‘batch_size’参数决定了每个输出批次将包含的图像数量。它是一个关键参数，决定了批处理过程的粒度，直接影响节点的性能以及后续的处理或训练步骤。适当选择批次大小对于平衡内存使用和计算效率很重要。
    - Comfy dtype: INT
    - Python dtype: Tuple[int]

# Output types
- output_list
    - 'output_list'是由节点生成的图像批次列表。每个批次是按照指定的批次大小准备的图像张量。此输出很重要，因为它代表了节点的主要交付物，可以进一步处理或输入到机器学习流程中的后续节点或模型。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class ImageRebatch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4096})}}
    RETURN_TYPES = ('IMAGE',)
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'rebatch'
    CATEGORY = 'image/batch'

    def rebatch(self, images, batch_size):
        batch_size = batch_size[0]
        output_list = []
        all_images = []
        for img in images:
            for i in range(img.shape[0]):
                all_images.append(img[i:i + 1])
        for i in range(0, len(all_images), batch_size):
            output_list.append(torch.cat(all_images[i:i + batch_size], dim=0))
        return (output_list,)
```