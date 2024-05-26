# Documentation
- Class name: KfConditioningAddx10
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点累积处理条件输入，通过聚合提供的输入来增强整体的条件数据。

# Input types
## Required
- cond_0
    - 初始条件数据，对节点的操作至关重要。它为后续聚合设置了基线。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
## Optional
- cond_1
    - 一个可选的条件输入，它对输出的累积效应有所贡献。它与基础条件数据合并。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- cond_2
    - 另一个额外的可选条件输入，进一步有助于节点操作的累积处理。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- cond_3
    - 另一个可选的条件输入，被整合到累积输出中，增强了节点的整体功能。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- cond_4
    - 这个可选的条件输入是累积数据流的一部分，影响节点的最终输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- cond_5
    - 这个条件输入进一步细化了累积数据，在节点的综合处理中发挥作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- cond_6
    - 一个可选输入，有助于节点的累积数据处理，影响输出的质量。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- cond_7
    - 这个可选条件输入被整合到累积数据中，进一步增强了节点的处理能力。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- cond_8
    - 这个条件输入有助于最终累积输出，影响节点的整体效果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- cond_9
    - 一个额外的可选条件输入，是累积数据的一部分，影响节点的最终输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]

# Output types
- cond_t_out
    - 条件输入的累积结果，代表聚合和处理后的数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[Any, Dict[str, Any]]

# Usage tips
- Infra type: CPU

# Source code
```
class KfConditioningAddx10:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('CONDITIONING',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'cond_0': ('CONDITIONING', {'forceInput': True})}, 'optional': {'cond_1': ('CONDITIONING', {'forceInput': True, 'default': 0}), 'cond_2': ('CONDITIONING', {'forceInput': True, 'default': 0}), 'cond_3': ('CONDITIONING', {'forceInput': True, 'default': 0}), 'cond_4': ('CONDITIONING', {'forceInput': True, 'default': 0}), 'cond_5': ('CONDITIONING', {'forceInput': True, 'default': 0}), 'cond_6': ('CONDITIONING', {'forceInput': True, 'default': 0}), 'cond_7': ('CONDITIONING', {'forceInput': True, 'default': 0}), 'cond_8': ('CONDITIONING', {'forceInput': True, 'default': 0}), 'cond_9': ('CONDITIONING', {'forceInput': True, 'default': 0})}}

    def main(self, cond_0, **kwargs):
        ((cond_t_out, cond_d_out),) = deepcopy(cond_0)
        for ((cond_t, cond_d),) in kwargs.values():
            (cond_t, cond_d) = (deepcopy(cond_t), deepcopy(cond_d))
            cond_t_out = cond_t_out + cond_t
            cond_d_out['pooled_output'] = cond_d_out['pooled_output'] + cond_d['pooled_output']
        return [((cond_t_out, cond_d_out),)]
```