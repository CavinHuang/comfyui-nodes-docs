# Documentation
- Class name: SeargeSamplerInputs
- Category: Searge/_deprecated_/Inputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点类封装了检索和配置采样器和调度器的过程，这些是采样过程中不可或缺的组成部分。它提供了一种结构化的方式来选择和使用不同的采样策略和调度方法，以控制输出的生成。该节点确保基于用户的选择使用适当的算法，从而促进高质量结果的生成。

# Input types
## Required
- sampler_name
    - sampler_name参数对于确定要使用的采样算法类型至关重要。它决定了生成输出的方法，这可能会显著影响结果的质量和多样性。通过选择特定的采样器，用户引导节点执行并塑造采样过程的整体结果。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- scheduler
    - scheduler参数在管理采样过程的流程和节奏方面起着关键作用。它调节样本产生的速率，确保生成过程在速度和效率上都得到优化。调度器的选择直接影响采样操作的性能和资源利用。
    - Comfy dtype: COMBO[str]
    - Python dtype: str

# Output types
- sampler_name
    - sampler_name输出代表了根据输入确定的选定采样算法。这个选择对采样过程至关重要，因为它决定了生成输出的方法，影响结果的整体质量和特性。
    - Comfy dtype: str
    - Python dtype: str
- scheduler
    - scheduler输出表示选定的调度方法，它将管理采样操作的速率和节奏。这个选择对于平衡计算效率和输出质量之间的权衡至关重要，确保采样过程既有效又注重资源。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeSamplerInputs:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'sampler_name': (comfy.samplers.KSampler.SAMPLERS, {'default': 'ddim'}), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS, {'default': 'ddim_uniform'})}}
    RETURN_TYPES = ('SAMPLER_NAME', 'SCHEDULER_NAME')
    RETURN_NAMES = ('sampler_name', 'scheduler')
    FUNCTION = 'get_value'
    CATEGORY = 'Searge/_deprecated_/Inputs'

    def get_value(self, sampler_name, scheduler):
        return (sampler_name, scheduler)
```