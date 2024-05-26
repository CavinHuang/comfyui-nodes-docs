# Documentation
- Class name: KfKeyframedConditionWithText
- Category: RootCategory
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点将文本信息集成到基于关键帧的框架中，根据文本输入实现对关键帧条件的动态调整和细化。

# Input types
## Required
- clip
    - 输入的剪辑是必需的，因为它作为关键帧条件的基础。根据文本输入对其进行操作，以创建定制的视觉表示。
    - Comfy dtype: CLIP
    - Python dtype: kf.Clip
- text
    - 文本参数对节点至关重要，因为它提供了关键帧条件的内容和上下文。它用于生成影响最终视觉输出的标记。
    - Comfy dtype: STRING
    - Python dtype: str
- time
    - 时间参数非常重要，因为它决定了关键帧在序列中的时间位置。它影响关键帧动画的整体节奏和结构。
    - Comfy dtype: FLOAT
    - Python dtype: float
- interpolation_method
    - 插值方法很重要，因为它决定了关键帧之间的过渡风格。它影响动画的平滑度和视觉连续性。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- schedule
    - 当使用计划参数时，它允许随时间自动调整关键帧。它可以简化创建复杂动画的过程。
    - Comfy dtype: SCHEDULE
    - Python dtype: dict

# Output types
- keyframed_condition
    - 输出提供了关键帧条件的结构化表示，这对动画的视觉叙事至关重要。它封装了文本输入和时间放置的联合效应。
    - Comfy dtype: KEYFRAMED_CONDITION
    - Python dtype: dict
- conditioning
    - 此输出包含文本输入的编码表示，并用于影响关键帧条件。它是节点操作中的一个关键中间步骤。
    - Comfy dtype: CONDITIONING
    - Python dtype: list
- schedule
    - 计划输出是自动化关键帧调整的结构化计划。它对于创建随时间适应的动态和响应性动画非常重要。
    - Comfy dtype: SCHEDULE
    - Python dtype: tuple

# Usage tips
- Infra type: GPU

# Source code
```
class KfKeyframedConditionWithText(KfKeyframedCondition):
    """
    Attaches a condition to a keyframe
    """
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CONDITION', 'CONDITIONING', 'SCHEDULE')

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip': ('CLIP',), 'text': ('STRING', {'multiline': True, 'default': ''}), 'time': ('FLOAT', {'default': 0, 'step': 1}), 'interpolation_method': (list(kf.interpolation.EASINGS.keys()), {'default': 'linear'})}, 'optional': {'schedule': ('SCHEDULE', {})}}

    def main(self, clip, text, time, interpolation_method, schedule=None):
        tokens = clip.tokenize(text)
        (cond, pooled) = clip.encode_from_tokens(tokens, return_pooled=True)
        conditioning = [[cond, {'pooled_output': pooled}]]
        keyframed_condition = super().main(conditioning, time, interpolation_method)[0]
        keyframed_condition['kf_cond_t'].label = text
        schedule = set_keyframed_condition(keyframed_condition, schedule)
        return (keyframed_condition, conditioning, schedule)
```