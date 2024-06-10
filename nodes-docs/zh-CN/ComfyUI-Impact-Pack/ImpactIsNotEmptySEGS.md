# Documentation
- Class name: ImpactNotEmptySEGS
- Category: ImpactPack/Logic
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactNotEmptySEGS节点的'doit'方法用于检查给定的段落列表是否为空，特别关注列表中的第二个元素。在需要进一步处理或在逻辑流程中做出决策时，数据在特定段落中的存在至关重要。

# Input types
## Required
- segs
    - 'segs'参数是一个包含数据段落的列表。检查其内容对于'doit'方法的操作至关重要，因为它决定了第二个段落是否非空，这对于节点的决策过程至关重要。
    - Comfy dtype: SEGS
    - Python dtype: List[Any]

# Output types
- result
    - 'result'输出表示'segs'列表中的第二个元素是否非空。它是一个布尔值，根据'doit'方法执行的条件检查，直接影响后续的逻辑或操作。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactNotEmptySEGS:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'segs': ('SEGS',)}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic'
    RETURN_TYPES = ('BOOLEAN',)

    def doit(self, segs):
        return (segs[1] != [],)
```