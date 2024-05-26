# Documentation
- Class name: SEGSRangeFilterDetailerHookProvider
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

SEGSRangeFilterDetailerHookProvider节点旨在对分割过程应用过滤机制。它根据指定的范围过滤段，确保只有符合定义标准的段被考虑。该节点通过专注于用户定义参数的相关区域，增强了分割的精度。

# Input types
## Required
- target
    - 'target' 参数定义了分割过程的兴趣区域。它至关重要，因为它决定了哪些段将被过滤。节点根据提供的维度和坐标操作，使此参数成为过过程的核心。
    - Comfy dtype: COMBO[area(=w*h), width, height, x1, y1, x2, y2, length_percent]
    - Python dtype: Union[str, Tuple[int, int]]
- mode
    - 'mode' 参数决定是保留目标区域内还是区域外的段。这是一个二元选择，显著影响分割的结果，允许对过滤标准进行精确控制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- min_value
    - 'min_value' 参数设置了段值的最小阈值。它在过滤不符合最小标准值的段中起着关键作用，从而完善了分割结果。
    - Comfy dtype: INT
    - Python dtype: int
- max_value
    - 'max_value' 参数设定了段值的最大限制。它确保超过此限制的段从最终分割中排除，保持了过滤输出的完整性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- DETAILER_HOOK
    - 输出'DETAILER_HOOK'是一个钩子对象，它封装了过滤标准并应用于分割过程。它很重要，因为它代表了节点操作的结果，提供了一种将过滤逻辑集成到更广泛的分割工作流程中的方法。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: SEGSRangeFilterDetailerHook

# Usage tips
- Infra type: CPU

# Source code
```
class SEGSRangeFilterDetailerHookProvider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'target': (['area(=w*h)', 'width', 'height', 'x1', 'y1', 'x2', 'y2', 'length_percent'],), 'mode': ('BOOLEAN', {'default': True, 'label_on': 'inside', 'label_off': 'outside'}), 'min_value': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'max_value': ('INT', {'default': 67108864, 'min': 0, 'max': sys.maxsize, 'step': 1})}}
    RETURN_TYPES = ('DETAILER_HOOK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, target, mode, min_value, max_value):
        hook = hooks.SEGSRangeFilterDetailerHook(target, mode, min_value, max_value)
        return (hook,)
```