# Documentation
- Class name: SeargeOperatingMode
- Category: UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点类封装了搜索和生成（SRG）工作流的操作设置，允许定制工作流模式和提示策略。

# Input types
## Required
- workflow_mode
    - 决定工作流的操作模式，这可以显著影响生成的输出类型和过程的整体效率。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- prompting_mode
    - 设置引导生成过程的提示模式，影响结果的创造性和相关性。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- batch_size
    - 指定在单个操作中处理的输入数量，这会影响系统的吞吐量和资源利用率。
    - Comfy dtype: int
    - Python dtype: int
## Optional
- data
    - 一个可选的数据流，可用于为工作流提供额外的上下文或信息。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Output types
- data
    - 包含应用了操作模式设置的更新后的数据流，这对于工作流中后续步骤至关重要。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeOperatingMode:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'workflow_mode': (UI.WORKFLOW_MODES, {'default': UI.WF_MODE_TEXT_TO_IMAGE}), 'prompting_mode': (UI.PROMPTING_MODES, {'default': UI.PROMPTING_DEFAULT}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4, 'step': 1})}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'get'
    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(workflow_mode, prompting_mode, batch_size):
        return {UI.F_WORKFLOW_MODE: workflow_mode, UI.F_PROMPTING_MODE: prompting_mode, UI.F_BATCH_SIZE: batch_size}

    def get(self, workflow_mode, prompting_mode, batch_size, data=None):
        if data is None:
            data = {}
        data[UI.S_OPERATING_MODE] = self.create_dict(workflow_mode, prompting_mode, batch_size)
        return (data,)
```