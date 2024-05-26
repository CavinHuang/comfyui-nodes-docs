# Documentation
- Class name: AssembleSEGS
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

AssembleSEGS节点旨在将分割头和元素组合成一个连贯的结构。它在聚合分割数据的过程中扮演着关键角色，确保头和元素被正确地组装成一个完整的分割集。

# Input types
## Required
- seg_header
    - ‘seg_header’参数对于定义分割过程的元数据至关重要。它决定了分割元素在最终输出中的解释和结构方式。
    - Comfy dtype: SEGS_HEADER
    - Python dtype: List[str]
- seg_elt
    - ‘seg_elt’参数是必需的，因为它包含了需要被分割的实际数据元素。它通过确定最终分割将包含的内容，影响节点的执行。
    - Comfy dtype: SEG_ELT
    - Python dtype: List[Any]

# Output types
- output
    - AssembleSEGS节点的输出是一个结构化的分割集，是将分割头和元素结合的结果。它很重要，因为它代表了分割数据的最终形式，准备进行进一步的处理或分析。
    - Comfy dtype: SEGS
    - Python dtype: Tuple[List[str], List[Any]]

# Usage tips
- Infra type: CPU

# Source code
```
class AssembleSEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'seg_header': ('SEGS_HEADER',), 'seg_elt': ('SEG_ELT',)}}
    INPUT_IS_LIST = True
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, seg_header, seg_elt):
        return ((seg_header[0], seg_elt),)
```