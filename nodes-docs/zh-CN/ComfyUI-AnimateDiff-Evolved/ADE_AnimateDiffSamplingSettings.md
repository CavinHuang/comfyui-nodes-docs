# Documentation
- Class name: SampleSettingsNode
- Category: Animate Diff 🎭🅐🅓
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

SampleSettingsNode类的`create_settings`方法旨在为动画过程配置和生成采样设置。它封装了定义噪声生成行为、迭代选项和采样过程中其他可定制方面的参数。此方法在为动画工作流中的后续步骤准备基础方面发挥关键作用，确保正确建立设置以实现预期结果。

# Input types
## Required
- batch_offset
    - 参数`batch_offset`对于管理噪声生成的批量处理至关重要。它允许系统偏移批量索引，这对于确保不同批次之间具有独特的噪声模式可能是必不可少的。此参数显著影响采样过程的执行和结果。
    - Comfy dtype: INT
    - Python dtype: int
- noise_type
    - 参数`noise_type`确定采样过程中使用的噪声层类型。它是形成生成噪声特征的关键因素，进而影响动画的整体质量和风格。为了在最终输出中实现所需的噪声轮廓，此参数不可或缺。
    - Comfy dtype: NoiseLayerType.LIST
    - Python dtype: str
- seed_gen
    - 参数`seed_gen`决定噪声层的种子生成方法。它对于确保生成的噪声模式的一致性和可重复性很重要。此参数对于在不同运行中保持噪声生成过程的完整性至关重要。
    - Comfy dtype: SeedNoiseGeneration.LIST
    - Python dtype: str
- seed_offset
    - 参数`seed_offset`用于调整噪声生成的种子值，这可以改变生成的噪声模式。它在定制噪声特性中扮演重要角色，对于在动画中实现特定的视觉效果至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- noise_layers
    - 参数`noise_layers`允许在采样过程中指定要应用的自定义噪声层。它提供了高度的灵活性，可以根据特定的创意要求定制噪声特性。对于希望尝试不同噪声配置的用户来说，此参数特别有用。
    - Comfy dtype: NOISE_LAYERS
    - Python dtype: NoiseLayerGroup
- iteration_opts
    - 参数`iteration_opts`提供控制采样过程中迭代过程的选项。它可以用来微调采样程序，以优化速度、准确性或资源使用等因素。在动画中实现性能和质量之间的平衡至关重要。
    - Comfy dtype: ITERATION_OPTS
    - Python dtype: IterationOptions
- seed_override
    - 参数`seed_override`允许手动覆盖用于噪声生成的默认种子值。在需要特定噪声模式或复制先前运行的结果的场景中，这可能特别有用。该参数为噪声生成过程增加了额外的控制层。
    - Comfy dtype: INT
    - Python dtype: Union[int, None]
- adapt_denoise_steps
    - 参数`adapt_denoise_steps`是一个布尔标志，当设置为true时，允许系统在采样过程中自适应地调整去噪步骤。这可以导致更有效和高效的噪声减少，提高动画的整体质量。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- custom_cfg
    - 参数`custom_cfg`允许使用可应用于采样过程的自定义配置关键帧。这提供了一种引入特定创意调整和微调动画以满足独特项目要求的方法。对于寻求对动画设置有更大控制权的高级用户来说，此参数特别有益。
    - Comfy dtype: CUSTOM_CFG
    - Python dtype: CustomCFGKeyframeGroup
- sigma_schedule
    - 参数`sigma_schedule`定义了噪声生成过程中使用的sigma值的时间表。它对于控制噪声的方差至关重要，并且可以显著影响动画的视觉结果。此参数提供了一种在采样过程的不同阶段应用不同级别噪声减少的方法。
    - Comfy dtype: SIGMA_SCHEDULE
    - Python dtype: SigmaSchedule

# Output types
- settings
    - 输出`settings`提供了通过`create_settings`方法定制的采样设置。这些设置封装了在方法调用期间指定的所有参数和选项，并用于指导动画过程的后续步骤。
    - Comfy dtype: SAMPLE_SETTINGS
    - Python dtype: SampleSettings

# Usage tips
- Infra type: CPU

# Source code
```
class SampleSettingsNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'batch_offset': ('INT', {'default': 0, 'min': 0, 'max': BIGMAX}), 'noise_type': (NoiseLayerType.LIST,), 'seed_gen': (SeedNoiseGeneration.LIST,), 'seed_offset': ('INT', {'default': 0, 'min': BIGMIN, 'max': BIGMAX})}, 'optional': {'noise_layers': ('NOISE_LAYERS',), 'iteration_opts': ('ITERATION_OPTS',), 'seed_override': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615, 'forceInput': True}), 'adapt_denoise_steps': ('BOOLEAN', {'default': False}), 'custom_cfg': ('CUSTOM_CFG',), 'sigma_schedule': ('SIGMA_SCHEDULE',)}}
    RETURN_TYPES = ('SAMPLE_SETTINGS',)
    RETURN_NAMES = ('settings',)
    CATEGORY = 'Animate Diff 🎭🅐🅓'
    FUNCTION = 'create_settings'

    def create_settings(self, batch_offset: int, noise_type: str, seed_gen: str, seed_offset: int, noise_layers: NoiseLayerGroup=None, iteration_opts: IterationOptions=None, seed_override: int=None, adapt_denoise_steps=False, custom_cfg: CustomCFGKeyframeGroup=None, sigma_schedule: SigmaSchedule=None):
        sampling_settings = SampleSettings(batch_offset=batch_offset, noise_type=noise_type, seed_gen=seed_gen, seed_offset=seed_offset, noise_layers=noise_layers, iteration_opts=iteration_opts, seed_override=seed_override, adapt_denoise_steps=adapt_denoise_steps, custom_cfg=custom_cfg, sigma_schedule=sigma_schedule)
        return (sampling_settings,)
```