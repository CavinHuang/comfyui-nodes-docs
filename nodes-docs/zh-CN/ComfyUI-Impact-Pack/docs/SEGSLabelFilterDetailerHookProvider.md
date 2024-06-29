# Documentation
- Class name: SEGSLabelFilterDetailerHookProvider
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSLabelFilterDetailerHookProvider 节点旨在系统内过滤分割标签。它在确保只有所需类型的段被处理中发挥关键作用，从而提高后续分析和操作的精确度和相关性。

# Input types
## Required
- preset
    - 预设参数决定了节点操作的初始设置或配置。它至关重要，因为它决定了节点处理的起点，影响着最终结果。
    - Comfy dtype: STRING
    - Python dtype: str
- labels
    - 标签参数是节点被指示允许的段类型的列表。它是一个关键输入，因为它直接影响哪些段通过了过滤过程。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- DETAILER_HOOK
    - 节点的输出是一个已使用指定标签配置的钩子对象。这个钩子对象很重要，因为它被用来将过滤标准应用于分割过程。
    - Comfy dtype: OBJECT
    - Python dtype: SEGSLabelFilterDetailerHook

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSLabelFilterDetailerHookProvider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'segs': ('SEGS',), 'preset': (['all'] + defs.detection_labels,), 'labels': ('STRING', {'multiline': True, 'placeholder': 'List the types of segments to be allowed, separated by commas'})}}
    RETURN_TYPES = ('DETAILER_HOOK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, preset, labels):
        hook = hooks.SEGSLabelFilterDetailerHook(labels)
        return (hook,)
```