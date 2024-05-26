# Documentation
- Class name: ImageListSelect
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

ImageListSelect节点可以根据提供的索引从图像列表中选择特定的图像，使得能够对批量中的单个图像进行集中分析或处理。

# Input types
## Required
- images
    - images参数至关重要，它作为节点操作的输入数据集。它允许节点根据提供的索引识别和选择目标图像。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]
- index
    - index参数决定了从列表中选择哪一张图像。它在指导节点进行正确的选择以进行进一步处理方面至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- selected_image
    - selected_image代表节点的输出，即根据提供的索引从输入列表中选择的图像。它是节点操作的结果，并准备好进行后续处理。
    - Comfy dtype: IMAGE
    - Python dtype: Image

# Usage tips
- Infra type: CPU

# Source code
```
class ImageListSelect:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE', {}), 'index': ('INT', {'default': 0, 'min': 0, 'step': 1})}}
    INPUT_IS_LIST = True
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, images, index):
        index = index[0]
        if images is Tensor:
            return (images[index].unsqueeze(0),)
        else:
            return (images[index],)
```