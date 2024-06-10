# Documentation
- Class name: ImpactRemoteBoolean
- Category: ImpactPack/Logic/_for_test
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

该节点作为远程执行的逻辑组件，能够在分布式系统中传输和评估布尔值。它旨在评估输入条件的真实性，并将结果传播到其他节点，在控制数据流和执行路径中起着关键作用。

# Input types
## Required
- node_id
    - node_id参数对于在系统中唯一标识节点至关重要。它确保正确的节点接收输入，并且结果与正确的实例准确关联。
    - Comfy dtype: INT
    - Python dtype: int
- widget_name
    - widget_name参数对于用户界面至关重要，因为它标记了布尔值的输入字段。该参数影响用户与系统的交互以及界面的清晰度。
    - Comfy dtype: STRING
    - Python dtype: str
- value
    - value参数是这个节点的核心元素，代表要评估的布尔条件。它是驱动节点功能和后续动作的主要输入。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactRemoteBoolean:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'node_id': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'widget_name': ('STRING', {'multiline': False}), 'value': ('BOOLEAN', {'default': True, 'label_on': 'True', 'label_off': 'False'})}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic/_for_test'
    RETURN_TYPES = ()
    OUTPUT_NODE = True

    def doit(self, **kwargs):
        return {}
```