# Documentation
- Class name: CR_MakeBatchFromImageList
- Category: Comfyroll/List/Utils
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_MakeBatchFromImageList节点旨在接收一系列图像，并将它们高效地合并成一个批次张量。这一过程简化了图像数据的处理，使得图像处理工作流程更加高效。该节点的功能在优化从单个图像文件到适合批量操作的格式的转换中起着关键作用，从而提高了图像处理流程的整体性能和效率。

# Input types
## Required
- image_list
    - image_list参数是节点的关键输入，代表需要批处理的图像数据集合。此参数通过确定输出批次张量的内容和结构，直接影响节点的操作。image_list对于节点执行其创建图像批次以进行进一步处理的预期功能至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Output types
- image_batch
    - image_batch输出是节点生成的代表图像批次的连接张量。它是节点操作的直接结果，对于需要批量数据的后续图像处理任务具有重要意义。此输出使得图像处理流程能够以必要的批量格式无缝继续。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- show_help
    - show_help输出提供了一个指向文档的URL链接，以供进一步帮助。它作为用户可能需要额外指导的有用资源，以了解如何使用节点或理解其功能。这个输出对于新用户或当解决与节点操作相关的问题时特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_MakeBatchFromImageList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image_list': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE', 'STRING')
    RETURN_NAMES = ('image_batch', 'show_help')
    INPUT_IS_LIST = True
    FUNCTION = 'make_batch'
    CATEGORY = icons.get('Comfyroll/List/Utils')

    def make_batch(self, image_list):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-binary-to-list'
        if len(image_list) <= 1:
            return (image_list,)
        batched_images = torch.cat(image_list, dim=0)
        return (batched_images, show_help)
```