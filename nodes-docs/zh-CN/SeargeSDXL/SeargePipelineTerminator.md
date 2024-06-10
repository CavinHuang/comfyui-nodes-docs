# Documentation
- Class name: SeargePipelineTerminator
- Category: UI.CATEGORY_MAGIC
- Output node: True
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargePipelineTerminator节点旨在管理和终止正在进行的数据处理管道。它在确保数据流得到适当结束而不留下任何残留进程方面发挥着关键作用，从而维护系统的效率和完整性。

# Input types
## Optional
- data
    - ‘data’参数对于节点的操作至关重要，因为它提供了终止管道所需的输入数据流。它的存在确保了节点能够准确识别并结束相关的数据处理管道。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Output types
- result
    - 'result'输出表示管道终止过程的结果。它很重要，因为它提供了管道已成功终止的确认，确保系统可以继续进行，而不会有任何悬而未决的数据处理任务。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, bool]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargePipelineTerminator:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ()
    FUNCTION = 'trigger'
    OUTPUT_NODE = True
    CATEGORY = UI.CATEGORY_MAGIC

    def trigger(self, data=None):
        access = PipelineAccess(data)
        access.terminate_pipeline()
        return {}
```