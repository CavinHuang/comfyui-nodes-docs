# Documentation
- Class name: GetFirstImage
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

该节点旨在从一批图像中提取特定的子集，专注于选择过程并确保所需图像被隔离以供进一步处理。

# Input types
## Required
- images
    - 图像参数至关重要，因为它是节点操作的主要输入。预期它是一个包含一批图像的张量，节点将根据定义的标准从这些图像中选择特定的图像。
    - Comfy dtype: COMBO[torch.Tensor]
    - Python dtype: torch.Tensor

# Output types
- images
    - 该节点的输出是根据指定标准选择的输入图像的精炼子集。这个子集旨在进行进一步的分析或处理。
    - Comfy dtype: COMBO[torch.Tensor]
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class GetFirstImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'run'
    OUTPUT_NODE = False
    CATEGORY = 'DragNUWA'

    def run(self, images: torch.Tensor):
        shape = images.shape
        len_first_dim = shape[0]
        selected_indexes = f'0'
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
        return (images[selected_index, :, :, :],)
```