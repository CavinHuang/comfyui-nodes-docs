# Documentation
- Class name: SparseIndexMethodNode
- Category: Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

该节点用于通过提供一系列唯一的索引来检索稀疏控制网络的方法。它确保索引是有效的整数，并用于引用更大数据集或结构中的特定元素。

# Input types
## Required
- indexes
    - “indexes”参数是一个由逗号分隔的整数字符串，用于唯一标识数据集中的元素。它对节点的操作至关重要，因为它直接影响到哪些元素被选中进行处理。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- method
    - 输出的'method'是SparseIndexMethod的一个实例，根据提供的索引定制。它代表了SparseIndexMethodNode的核心功能，使得在稀疏控制网络中选择和处理特定元素成为可能。
    - Comfy dtype: SPARSE_METHOD
    - Python dtype: SparseIndexMethod

# Usage tips
- Infra type: CPU

# Source code
```
class SparseIndexMethodNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'indexes': ('STRING', {'default': '0'})}}
    RETURN_TYPES = ('SPARSE_METHOD',)
    FUNCTION = 'get_method'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl'

    def get_method(self, indexes: str):
        idxs = []
        unique_idxs = set()
        str_idxs = [x.strip() for x in indexes.strip().split(',')]
        for str_idx in str_idxs:
            try:
                idx = int(str_idx)
                if idx in unique_idxs:
                    raise ValueError(f"'{idx}' is duplicated; indexes must be unique.")
                idxs.append(idx)
                unique_idxs.add(idx)
            except ValueError:
                raise ValueError(f"'{str_idx}' is not a valid integer index.")
        if len(idxs) == 0:
            raise ValueError(f'No indexes were listed in Sparse Index Method.')
        return (SparseIndexMethod(idxs),)
```