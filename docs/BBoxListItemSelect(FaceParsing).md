# Documentation
- Class name: BBoxListItemSelect
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

该节点能够根据提供的索引值从列表中选取特定的边界框，同时确保选择过程不会超出列表界限。它旨在简化在较大数据集中访问单个边界框数据的过程。

# Input types
## Required
- bbox_list
    - 该参数是一个边界框列表，作为根据索引选取所需边界框的数据集。它对节点的运行至关重要，因为它定义了可能选择的范围。
    - Comfy dtype: BBOX_LIST
    - Python dtype: List[Dict[str, Union[int, float]]]
- index
    - 该参数决定了从列表中选择边界框的位置。它非常重要，因为它直接影响最终从边界框列表中检索的项目。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- BBOX
    - 输出是一个单一的边界框，代表根据提供的索引从输入列表中选择的项目。它是节点操作的结果，对进一步处理具有重要价值。
    - Comfy dtype: BBOX
    - Python dtype: Dict[str, Union[int, float]]

# Usage tips
- Infra type: CPU

# Source code
```
class BBoxListItemSelect:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'bbox_list': ('BBOX_LIST', {}), 'index': ('INT', {'default': 0, 'min': 0, 'step': 1})}}
    RETURN_TYPES = ('BBOX',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, bbox_list: list, index: int):
        item = bbox_list[index if index < len(bbox_list) - 1 else len(bbox_list) - 1]
        return (item,)
```