# Documentation
- Class name: ImageSelector
- Category: motionctrl
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-MotionCtrl.git

ImageSelector节点根据指定的索引筛选图像，确保只有所需的图像子集被进一步处理，提高了图像处理任务的效率和专注度。

# Input types
## Required
- images
    - images参数至关重要，它作为ImageSelector节点的主要输入，决定了将从中进行选择的数据集。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- selected_indexes
    - 该参数允许用户定义他们希望选择的图像的特定索引，直接影响通过节点进行后续操作的图像。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- selected_images
    - selected_images输出代表基于提供的索引过滤后的图像子集，现已准备好进行进一步的处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ImageSelector:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'selected_indexes': ('STRING', {'multiline': False, 'default': '1,2,3'})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'run'
    OUTPUT_NODE = False
    CATEGORY = 'motionctrl'

    def run(self, images: torch.Tensor, selected_indexes: str):
        shape = images.shape
        len_first_dim = shape[0]
        selected_index: list[int] = []
        total_indexes: list[int] = list(range(len_first_dim))
        for s in selected_indexes.strip().split(','):
            try:
                if ':' in s:
                    _li = s.strip().split(':', maxsplit=1)
                    _start = _li[0]
                    _end = _li[1]
                    if _start and _end:
                        selected_index.extend(total_indexes[int(_start):int(_end)])
                    elif _start:
                        selected_index.extend(total_indexes[int(_start):])
                    elif _end:
                        selected_index.extend(total_indexes[:int(_end)])
                else:
                    x: int = int(s.strip())
                    if x < len_first_dim:
                        selected_index.append(x)
            except:
                pass
        if selected_index:
            print(f'ImageSelector: selected: {len(selected_index)} images')
            return (images[selected_index, :, :, :],)
        print(f'ImageSelector: selected no images, passthrough')
        return (images,)
```