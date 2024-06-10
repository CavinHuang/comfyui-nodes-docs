# Documentation
- Class name: isSDXL
- Category: EasyUse/Logic
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点根据输入与特定模型的兼容性进行分类，确保在流程中正确应用模型。

# Input types
## Optional
- optional_pipe
    - 该参数提供了包含条件阶段模型的流水线上下文，影响节点的决策过程。
    - Comfy dtype: COMBO[PIPE_LINE]
    - Python dtype: Dict[str, Any]
- optional_clip
    - 该参数为节点提供了一个替代输入，使其能够与clip模型一起工作，这对于某些操作至关重要。
    - Comfy dtype: CLIP
    - Python dtype: Union[SDXLClipModel, SDXLRefinerClipModel, SDXLClipG]

# Output types
- boolean
    - 输出表示操作的成功与否，True表示兼容，False表示不匹配。
    - Comfy dtype: BOOLEAN
    - Python dtype: Tuple[bool]

# Usage tips
- Infra type: CPU

# Source code
```
class isSDXL:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}, 'optional': {'optional_pipe': ('PIPE_LINE',), 'optional_clip': ('CLIP',)}}
    RETURN_TYPES = ('BOOLEAN',)
    RETURN_NAMES = ('boolean',)
    FUNCTION = 'execute'
    CATEGORY = 'EasyUse/Logic'

    def execute(self, optional_pipe=None, optional_clip=None):
        if optional_pipe is None and optional_clip is None:
            raise Exception(f'[ERROR] optional_pipe or optional_clip is missing')
        clip = optional_clip if optional_clip is not None else optional_pipe['clip']
        if isinstance(clip.cond_stage_model, (SDXLClipModel, SDXLRefinerClipModel, SDXLClipG)):
            return (True,)
        else:
            return (False,)
```