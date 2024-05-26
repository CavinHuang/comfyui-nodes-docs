# Documentation
- Class name: SeargeConditioningParameters
- Category: UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点类封装了在搜索和救援场景中调整条件参数的逻辑，旨在根据不同的比例和得分来优化搜索策略。

# Input types
## Required
- base_conditioning_scale
    - 基础条件比例是一个基本参数，它影响搜索操作开始时的初始条件。
    - Comfy dtype: FLOAT
    - Python dtype: float
- refiner_conditioning_scale
    - 这个比例细化了搜索过程，允许随着操作的进行对策略进行更细致的调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- target_conditioning_scale
    - 目标条件比例对于将搜索工作集中在操作区域内的高优先级区域至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- positive_conditioning_scale
    - 该参数增强了搜索中积极强化的方面，将资源引导向成功潜力更高的区域。
    - Comfy dtype: FLOAT
    - Python dtype: float
- negative_conditioning_scale
    - 负面条件比例有助于避免效果较低的区域，确保资源不会在成功可能性较低的地区浪费。
    - Comfy dtype: FLOAT
    - Python dtype: float
- positive_aesthetic_score
    - 积极的审美评分通过评估搜索区域的视觉吸引力，有助于决策过程，可能导致更高效的操作。
    - Comfy dtype: FLOAT
    - Python dtype: float
- negative_aesthetic_score
    - 这个评分反映了搜索区域不太理想的一面，引导搜索远离可能阻碍操作进展的区域。
    - Comfy dtype: FLOAT
    - Python dtype: float
- precondition_mode
    - 预设模式设置了条件的运作框架，决定了如何在任务开始时应用搜索参数。
    - Comfy dtype: PRECONDITION_MODES
    - Python dtype: Enum
- precondition_strength
    - 预设强度影响初始条件应用的强度，影响整体搜索策略。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- data
    - 数据流提供了连续的信息流，可以用来实时动态调整搜索参数。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Output types
- data
    - 数据流已更新条件参数，成为搜索和救援操作持续决策的基础。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeConditioningParameters:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'base_conditioning_scale': ('FLOAT', {'default': 2.0, 'min': 0.5, 'max': 4.0, 'step': 0.25}), 'refiner_conditioning_scale': ('FLOAT', {'default': 2.0, 'min': 0.5, 'max': 4.0, 'step': 0.25}), 'target_conditioning_scale': ('FLOAT', {'default': 2.0, 'min': 0.5, 'max': 4.0, 'step': 0.25}), 'positive_conditioning_scale': ('FLOAT', {'default': 1.5, 'min': 0.25, 'max': 2.0, 'step': 0.25}), 'negative_conditioning_scale': ('FLOAT', {'default': 0.75, 'min': 0.25, 'max': 2.0, 'step': 0.25}), 'positive_aesthetic_score': ('FLOAT', {'default': 6.0, 'min': 0.5, 'max': 10.0, 'step': 0.5}), 'negative_aesthetic_score': ('FLOAT', {'default': 2.5, 'min': 0.5, 'max': 10.0, 'step': 0.5}), 'precondition_mode': (UI.PRECONDITION_MODES,), 'precondition_strength': ('FLOAT', {'default': 0.1, 'min': 0.0, 'max': 1.0, 'step': 0.05})}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'get'
    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(base_conditioning_scale, refiner_conditioning_scale, target_conditioning_scale, positive_conditioning_scale, negative_conditioning_scale, positive_aesthetic_score, negative_aesthetic_score, precondition_mode, precondition_strength):
        return {UI.F_BASE_CONDITIONING_SCALE: round(base_conditioning_scale, 3), UI.F_REFINER_CONDITIONING_SCALE: round(refiner_conditioning_scale, 3), UI.F_TARGET_CONDITIONING_SCALE: round(target_conditioning_scale, 3), UI.F_POSITIVE_CONDITIONING_SCALE: round(positive_conditioning_scale, 3), UI.F_NEGATIVE_CONDITIONING_SCALE: round(negative_conditioning_scale, 3), UI.F_POSITIVE_AESTHETIC_SCORE: round(positive_aesthetic_score, 3), UI.F_NEGATIVE_AESTHETIC_SCORE: round(negative_aesthetic_score, 3), UI.F_PRECONDITION_MODE: precondition_mode, UI.F_PRECONDITION_STRENGTH: round(precondition_strength, 3)}

    def get(self, base_conditioning_scale, refiner_conditioning_scale, target_conditioning_scale, positive_conditioning_scale, negative_conditioning_scale, positive_aesthetic_score, negative_aesthetic_score, precondition_mode, precondition_strength, data=None):
        if data is None:
            data = {}
        data[UI.S_CONDITIONING_PARAMETERS] = self.create_dict(base_conditioning_scale, refiner_conditioning_scale, target_conditioning_scale, positive_conditioning_scale, negative_conditioning_scale, positive_aesthetic_score, negative_aesthetic_score, precondition_mode, precondition_strength)
        return (data,)
```