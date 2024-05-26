# Documentation
- Class name: FromIPAdapterPipe
- Category: InspirePack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点负责协调各种组件的集成过程，如IP适配器、机器学习模型和面部识别系统，以简化给定管道中的数据管理和分析。

# Input types
## Required
- ipadapter_pipe
    - 该参数是必要的，因为它作为主要输入，包含了节点将处理和用于其操作的一系列互联元素。
    - Comfy dtype: IPADAPTER_PIPE
    - Python dtype: Tuple[IPADAPTER_PIPE]

# Output types
- ipadapter
    - 输出的关键组件，IP适配器促进系统内的通信，确保数据在不同模块之间有效传输。
    - Comfy dtype: IPADAPTER
    - Python dtype: IPADAPTER
- model
    - 模型输出代表了机器学习组件，这对于根据学习到的模式进行预测和数据处理至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip_vision
    - 该输出对于视觉数据解释非常重要，因为它利用视觉系统来分析和理解图像内容。
    - Comfy dtype: CLIP_VISION
    - Python dtype: CLIP_VISION
- insight_face
    - 洞察面部输出在面部识别任务中至关重要，提供了根据面部特征识别和验证个人身份的手段。
    - Comfy dtype: INSIGHTFACE
    - Python dtype: INSIGHTFACE

# Usage tips
- Infra type: CPU

# Source code
```
class FromIPAdapterPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ipadapter_pipe': ('IPADAPTER_PIPE',)}}
    RETURN_TYPES = ('IPADAPTER', 'MODEL', 'CLIP_VISION', 'INSIGHTFACE')
    RETURN_NAMES = ('ipadapter', 'model', 'clip_vision', 'insight_face')
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Util'

    def doit(self, ipadapter_pipe):
        (ipadapter, model, clip_vision, insightface, _) = ipadapter_pipe
        return (ipadapter, model, clip_vision, insightface)
```