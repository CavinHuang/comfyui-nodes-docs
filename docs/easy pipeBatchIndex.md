# Documentation
- Class name: pipeBatchIndex
- Category: EasyUse/Pipe
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

pipeBatchIndex节点便于在流水线中操作批次数据，能够选择和处理特定的批次索引。它通过允许有针对性的数据处理，对于优化批量处理任务至关重要，从而增强了工作流程。

# Input types
## Required
- pipe
    - ‘pipe’参数代表正在处理的数据流水线。它包含进行批次操作所需的样本和其他相关信息，是实现目标数据处理不可或缺的。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- batch_index
    - ‘batch_index’参数指定了流水线中要处理的批次索引。它很重要，因为它指导节点定位到正确的批次进行处理。
    - Comfy dtype: INT
    - Python dtype: int
- length
    - ‘length’参数决定了要从批次中处理的元素数量。它影响了操作的范围，对于管理被操作数据的规模至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- my_unique_id
    - ‘my_unique_id’参数是一个可选的标识符，可用于跟踪节点执行的特定实例。它有助于在复杂工作流中区分节点的不同运行。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- pipe
    - ‘pipe’输出是修改后的数据流水线，现在包含了处理过的样本批次。它是关键的输出，因为它携带了批次操作的结果，并将其输入到流水线的后续阶段。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class pipeBatchIndex:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',), 'batch_index': ('INT', {'default': 0, 'min': 0, 'max': 63}), 'length': ('INT', {'default': 1, 'min': 1, 'max': 64})}, 'hidden': {'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('pipe',)
    FUNCTION = 'doit'
    CATEGORY = 'EasyUse/Pipe'

    def doit(self, pipe, batch_index, length, my_unique_id=None):
        samples = pipe['samples']
        (new_samples,) = LatentFromBatch().frombatch(samples, batch_index, length)
        new_pipe = {**pipe, 'samples': new_samples}
        del pipe
        return (new_pipe,)
```