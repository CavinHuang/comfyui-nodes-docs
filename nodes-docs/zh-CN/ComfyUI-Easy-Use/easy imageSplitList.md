# Documentation
- Class name: imageSplitList
- Category: EasyUse/Image
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点根据特定标准将图像列表分割成多个子集，提高了工作流中图像数据的组织和处理能力。

# Input types
## Required
- images
    - 图像参数是必需的，因为它作为节点操作的主要输入，决定了后续的分割过程和输出结果的结构。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]

# Output types
- images
    - 输出代表重新组织的图像子集，对于工作流中进一步的分析或处理至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: Tuple[List[PIL.Image.Image], List[PIL.Image.Image], List[PIL.Image.Image]]

# Usage tips
- Infra type: CPU

# Source code
```
class imageSplitList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE', 'IMAGE', 'IMAGE')
    RETURN_NAMES = ('images', 'images', 'images')
    FUNCTION = 'doit'
    CATEGORY = 'EasyUse/Image'

    def doit(self, images):
        length = len(images)
        new_images = ([], [], [])
        if length % 3 == 0:
            for (index, img) in enumerate(images):
                if index % 3 == 0:
                    new_images[0].append(img)
                elif (index + 1) % 3 == 0:
                    new_images[2].append(img)
                else:
                    new_images[1].append(img)
        elif length % 2 == 0:
            for (index, img) in enumerate(images):
                if index % 2 == 0:
                    new_images[0].append(img)
                else:
                    new_images[1].append(img)
        return new_images
```