# Documentation
- Class name: EmptySEGS
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

EmptySEGS节点的'doit'方法旨在生成一个空的分割结构。它的目的是在没有实际分割数据可用时提供基线或占位符。当输入数据不需要详细分割时，此节点至关重要，它确保了工作流程的完整性，同时避免了不必要的复杂性引入。

# Input types
## Optional
- input_data
    - 尽管'input_data'参数不是必需的，但如果需要，它可以用来向EmptySEGS节点传递额外的上下文或数据。它的作用可能是增强节点的功能或与其他可能需要输入数据以进行操作的系统进行集成。
    - Comfy dtype: Any
    - Python dtype: Any

# Output types
- SEGS
    - 输出参数'SEGS'代表了EmptySEGS节点操作的结果。它提供了一个空元组，其中第一个元素是表示分割维度的形状，第二个元素是一个通常包含分割数据但在这种情况下为空的列表。这种输出格式允许与期望分割结果的系统无缝集成，即使没有执行实际的分割。
    - Comfy dtype: Tuple[int, List[Any]]
    - Python dtype: Tuple[int, List[Any]]

# Usage tips
- Infra type: CPU

# Source code
```
class EmptySEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}}
    RETURN_TYPES = ('SEGS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self):
        shape = (0, 0)
        return ((shape, []),)
```