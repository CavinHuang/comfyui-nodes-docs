# Documentation
- Class name: IpaConfigurationNode
- Category: Steerable-Motion
- Output node: False
- Repo Ref: https://github.com/banodoco/steerable-motion

IpaConfigurationNode类封装了一个节点的配置逻辑，该节点管理影响可控制运动模型行为的参数。它处理输入以根据用户偏好微调模型的性能，专注于控制与自然运动之间的平衡。

# Input types
## Required
- ipa_starts_at
    - “ipa_starts_at”参数规定了运动的起始点，这对定义动画的初始条件至关重要。它影响整体轨迹并确保运动从所需位置平稳开始。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_ends_at
    - “ipa_ends_at”参数指定了运动的结束点，这对确定动画的最终状态至关重要。它确保运动在预期位置结束，有助于动画序列的连贯性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_weight_type
    - “ipa_weight_type”参数影响沿运动路径的权重分布，影响动画的平滑度和视觉吸引力。它是实现运动不同阶段之间自然过渡的关键因素。
    - Comfy dtype: ENUM
    - Python dtype: str
- ipa_weight
    - “ipa_weight”参数调整权重设置对运动的整体影响，这对于微调动画的动态非常重要。它有助于实现不同运动元素之间期望的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ipa_embeds_scaling
    - “ipa_embeds_scaling”参数控制运动模型中使用的嵌入的缩放，这对于调整模型对用户输入的响应性至关重要。它在运动的精确性和适应性方面发挥着重要作用。
    - Comfy dtype: ENUM
    - Python dtype: str
- ipa_noise_strength
    - “ipa_noise_strength”参数决定了应用于运动的噪声强度，这可以为动画增加真实性和变化性。它是创建更具动态性和不可预测性的运动序列的重要方面。
    - Comfy dtype: FLOAT
    - Python dtype: float
- use_image_for_noise
    - “use_image_for_noise”参数启用使用图像作为噪声源，这可以向动画中引入更复杂和视觉上丰富的噪声模式。它增强了运动的多样性和审美质量。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- type_of_noise
    - “type_of_noise”参数定义了要应用的噪声类型，这显著影响动画的视觉特征和风格。它是实现期望的审美和风格成果的关键元素。
    - Comfy dtype: ENUM
    - Python dtype: str
- noise_blur
    - “noise_blur”参数调整应用噪声的模糊程度，影响动画中噪声模式的平滑度和连贯性。它在定义整体视觉质感和质量方面发挥作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- configuration
    - 输出'configuration'是一组经过处理和优化的参数，用于可控制运动模型。它封装了所有用户定义的设置，确保模型根据指定的偏好运行。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class IpaConfigurationNode:
    WEIGHT_TYPES = ['linear', 'ease in', 'ease out', 'ease in-out', 'reverse in-out', 'weak input', 'weak output', 'weak middle', 'strong middle']
    IPA_EMBEDS_SCALING_OPTIONS = ['V only', 'K+V', 'K+V w/ C penalty', 'K+mean(V) w/ C penalty']

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'ipa_starts_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'ipa_ends_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'ipa_weight_type': (cls.WEIGHT_TYPES,), 'ipa_weight': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 0.01}), 'ipa_embeds_scaling': (cls.IPA_EMBEDS_SCALING_OPTIONS,), 'ipa_noise_strength': ('FLOAT', {'default': 0.3, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'use_image_for_noise': ('BOOLEAN', {'default': False}), 'type_of_noise': (['fade', 'dissolve', 'gaussian', 'shuffle'],), 'noise_blur': ('INT', {'default': 0, 'min': 0, 'max': 32, 'step': 1})}, 'optional': {}}
    FUNCTION = 'process_inputs'
    RETURN_TYPES = ('ADVANCED_IPA_SETTINGS',)
    RETURN_NAMES = ('configuration',)
    CATEGORY = 'Steerable-Motion'

    @classmethod
    def process_inputs(cls, ipa_starts_at, ipa_ends_at, ipa_weight_type, ipa_weight, ipa_embeds_scaling, ipa_noise_strength, use_image_for_noise, type_of_noise, noise_blur):
        return ({'ipa_starts_at': ipa_starts_at, 'ipa_ends_at': ipa_ends_at, 'ipa_weight_type': ipa_weight_type, 'ipa_weight': ipa_weight, 'ipa_embeds_scaling': ipa_embeds_scaling, 'ipa_noise_strength': ipa_noise_strength, 'use_image_for_noise': use_image_for_noise, 'type_of_noise': type_of_noise, 'noise_blur': noise_blur},)
```