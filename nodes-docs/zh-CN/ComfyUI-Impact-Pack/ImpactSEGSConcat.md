# Documentation
- Class name: SEGSConcat
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSConcat节点旨在将多个分割（SEGS）合并为一个统一的分割。它高效地合并分割数据，确保生成的分割是连贯的，并且保持原始数据形状的完整性。

# Input types
## Required
- segs1
    - 'segs1'参数是要被连接的分割集合。它在定义节点的输入数据中起着关键作用，这些数据将被合并为单个分割输出。
    - Comfy dtype: SEGS
    - Python dtype: List[Tuple[Tuple[int, int], List[Any]]]

# Output types
- output
    - 'output'参数代表合并过程生成的连接分割。它很重要，因为它是节点的主要输出，包含了合并后的分割数据。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[Tuple[int, int], List[Any]]

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSConcat:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs1': ('SEGS',)}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, **kwargs):
        dim = None
        res = None
        for (k, v) in list(kwargs.items()):
            if v[0] == (0, 0) or len(v[1]) == 0:
                continue
            if dim is None:
                dim = v[0]
                res = v[1]
            elif v[0] == dim:
                res = res + v[1]
            else:
                print(f"ERROR: source shape of 'segs1'{dim} and '{k}'{v[0]} are different. '{k}' will be ignored")
        if dim is None:
            empty_segs = ((0, 0), [])
            return (empty_segs,)
        else:
            return ((dim, res),)
```