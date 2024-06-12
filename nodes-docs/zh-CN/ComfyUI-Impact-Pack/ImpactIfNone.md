# Documentation
- Class name: ImpactIfNone
- Category: ImpactPack/Logic
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactIfNone节点旨在评估输入的存在性。它返回输入本身以及一个布尔值，指示输入是否已提供。此节点在工作流程中充当条件检查，确保只有在有所需数据时才继续操作。

# Input types
## Optional
- signal
    - ‘signal’参数是一个可选输入，可以是任何类型。它用于表示节点将评估其存在的数据。该参数的重要性在于其作为节点条件逻辑的主题的作用。
    - Comfy dtype: any_typ
    - Python dtype: Any
- any_input
    - ‘any_input’参数是另一个可选输入，也是任何类型。它作为节点的通用输入，可以用来触发节点的操作或为‘signal’参数提供额外的上下文。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Output types
- signal_opt
    - ‘signal_opt’输出是节点评估过的原始输入。它代表了根据节点逻辑确定为存在或不存在的数据。
    - Comfy dtype: any_typ
    - Python dtype: Any
- bool
    - ‘bool’输出是一个布尔值，指示是否提供了‘any_input’参数。它作为下游操作的一个明确指示，以决定是否根据输入数据的可用性进行操作。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactIfNone:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'signal': (any_typ,), 'any_input': (any_typ,)}}
    RETURN_TYPES = (any_typ, 'BOOLEAN')
    RETURN_NAMES = ('signal_opt', 'bool')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic'

    def doit(self, signal=None, any_input=None):
        if any_input is None:
            return (signal, False)
        else:
            return (signal, True)
```