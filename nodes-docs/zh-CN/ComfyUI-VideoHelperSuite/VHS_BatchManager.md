# Documentation
- Class name: BatchManager
- Category: Video Helper Suite 🎥🅥🅗🅢
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

BatchManager节点旨在高效管理和组织视频处理任务的帧批次。它通过将大量数据划分为可管理的批次来抽象处理复杂性，确保处理流水线保持高效和流畅。

# Input types
## Required
- frames_per_batch
    - 参数'frames_per_batch'决定每个批次中要处理的帧数。它对于控制工作量和内存使用至关重要，直接影响视频处理系统的性能和效率。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- prompt
    - 提供的'prompt'参数包含批处理可能需要的额外指令或上下文。它可以影响BatchManager节点如何解释和处理输入数据。
    - Comfy dtype: PROMPT
    - Python dtype: str
- unique_id
    - 参数'unique_id'用于在系统中标识特定批次，确保可以准确跟踪和管理处理过程。它在维护批次处理工作流程的完整性和组织性中起着至关重要的作用。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- meta_batch
    - 'meta_batch'输出提供了已处理批次的结构化表示。它封装了结果和元数据，是进一步分析或下游处理任务的关键点。
    - Comfy dtype: VHS_BatchManager
    - Python dtype: BatchManager

# Usage tips
- Infra type: CPU

# Source code
```
class BatchManager:

    def __init__(self, frames_per_batch=-1):
        self.frames_per_batch = frames_per_batch
        self.inputs = {}
        self.outputs = {}
        self.unique_id = None
        self.has_closed_inputs = False

    def reset(self):
        self.close_inputs()
        for key in self.outputs:
            if getattr(self.outputs[key][-1], 'gi_suspended', False):
                try:
                    self.outputs[key][-1].send(None)
                except StopIteration:
                    pass
        self.__init__(self.frames_per_batch)

    def has_open_inputs(self):
        return len(self.inputs) > 0

    def close_inputs(self):
        for key in self.inputs:
            if getattr(self.inputs[key][-1], 'gi_suspended', False):
                try:
                    self.inputs[key][-1].send(1)
                except StopIteration:
                    pass
        self.inputs = {}

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'frames_per_batch': ('INT', {'default': 16, 'min': 1, 'max': 128, 'step': 1})}, 'hidden': {'prompt': 'PROMPT', 'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('VHS_BatchManager',)
    RETURN_NAMES = ('meta_batch',)
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢'
    FUNCTION = 'update_batch'

    def update_batch(self, frames_per_batch, prompt=None, unique_id=None):
        if unique_id is not None and prompt is not None:
            requeue = prompt[unique_id]['inputs'].get('requeue', 0)
        else:
            requeue = 0
        if requeue == 0:
            self.reset()
            self.frames_per_batch = frames_per_batch
            self.unique_id = unique_id
        return (self,)
```