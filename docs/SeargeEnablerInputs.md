# Documentation
- Class name: SeargeEnablerInputs
- Category: Searge/_deprecated_/Inputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点类旨在检索和管理系统状态，在已弃用的框架内作为状态相关操作的接口。它抽象地封装了状态获取过程，强调节点在维护和提供对系统当前状态的访问方面的作用。

# Input types
## Required
- state
    - ‘state’参数对于节点的操作至关重要，因为它代表了系统当前的状态。它是决定节点行为和生成输出的基本元素。
    - Comfy dtype: COMBO[SeargeParameterProcessor.STATES]
    - Python dtype: str

# Output types
- state
    - 输出‘state’反映了输入提供系统当前状态，标志着节点的主要功能在于状态管理和检索。
    - Comfy dtype: COMBO[SeargeParameterProcessor.STATES]
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeEnablerInputs:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'state': (SeargeParameterProcessor.STATES, {'default': SeargeParameterProcessor.STATES[1]})}}
    RETURN_TYPES = ('ENABLE_STATE',)
    RETURN_NAMES = ('state',)
    FUNCTION = 'get_value'
    CATEGORY = 'Searge/_deprecated_/Inputs'

    def get_value(self, state):
        return (state,)
```