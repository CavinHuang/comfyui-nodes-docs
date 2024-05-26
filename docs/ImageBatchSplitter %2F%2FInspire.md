# Documentation
- Class name: ImageBatchSplitter
- Category: InspirePack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

ImageBatchSplitter节点旨在通过根据用户定义的计数将图像批次拆分成更小的子集来高效管理和操作图像批次。它确保批处理大小与指定的计数对齐，即使图像的总数不能被分割计数完美整除。该节点在准备数据以进行进一步处理（需要统一的批处理大小）时发挥着至关重要的作用，并有助于机器学习或图像处理工作流中的整体数据管道管理。

# Input types
## Required
- images
    - 'image'参数是ImageBatchSplitter节点的主要输入，代表需要处理的图像数据集合。该参数直接影响节点的操作和输出质量，因为节点根据'split_count'将这些图像操作和组织成子集。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image]
## Optional
- split_count
    - ‘split_count’参数对于ImageBatchSplitter节点的功能至关重要。它决定了输入图像被划分为多少个期望的子集。该参数影响了输出的粒度，并且对于确保处理后的数据满足下游机器学习模型或图像处理任务的要求至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - ImageBatchSplitter节点的输出是一个包含处理后的图像的元组，根据'split_count'参数组织成子集。这个输出对于后续需要统一批处理大小的操作至关重要，促进了数据在流程中的顺畅流动。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class ImageBatchSplitter:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'split_count': ('INT', {'default': 4, 'min': 0, 'max': 50, 'step': 1})}}
    RETURN_TYPES = ByPassTypeTuple(('IMAGE',))
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Util'

    def doit(self, images, split_count):
        cnt = min(split_count, len(images))
        res = [image.unsqueeze(0) for image in images[:cnt]]
        if split_count >= len(images):
            lack_cnt = split_count - cnt + 1
            empty_image = empty_pil_tensor()
            for x in range(0, lack_cnt):
                res.append(empty_image)
        elif cnt < len(images):
            remained_cnt = len(images) - cnt
            remained_image = images[-remained_cnt:]
            res.append(remained_image)
        return tuple(res)
```