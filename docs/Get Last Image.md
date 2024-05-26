# Documentation
- Class name: GetLastImage
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

该节点旨在从一批图像中提取最后一张图像，确保输出是序列中的最终视觉表示。

# Input types
## Required
- images
    - 输入参数'images'对于节点的操作至关重要，因为它提供了节点处理的图像数据批次，以选择最后一张图像。
    - Comfy dtype: COMBO[torch.Tensor]
    - Python dtype: torch.Tensor

# Output types
- images
    - 输出是输入批次中的最后一张图像，这很重要，因为它代表了节点提取的最终视觉数据。
    - Comfy dtype: COMBO[torch.Tensor]
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class GetLastImage:

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
        selected_indexes = f'{len_first_dim - 1}'
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