# Documentation
- Class name: SeargeOutput6
- Category: Searge/_deprecated_/UI/Outputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeOutput6节点旨在促进解复用过程，允许从给定输入中提取和组织各种参数。它在简化数据处理中发挥着关键作用，确保参数被有效分离并为后续处理阶段提供便利。

# Input types
## Required
- parameters
    - “parameters”输入是SeargeOutput6节点的核心，包含解复用操作所需的基本数据。它对节点的执行至关重要，因为它决定了后续步骤和结果。
    - Comfy dtype: Dict[str, Union[str, int, float, bool]]
    - Python dtype: Dict[str, Union[str, int, float, bool]]

# Output types
- parameters
    - “parameters”输出保留了结构化数据格式，为进一步使用提供了清晰且有组织的数据展示。
    - Comfy dtype: Dict[str, Union[str, int, float, bool]]
    - Python dtype: Dict[str, Union[str, int, float, bool]]
- hrf_steps
    - “hrf_steps”输出表示高分辨率修复过程中涉及的步骤数，这对于控制输出的细节水平很重要。
    - Comfy dtype: int
    - Python dtype: int
- hrf_denoise
    - “hrf_denoise”输出表示应用于高分辨率修复的去噪水平，影响最终结果的清晰度和质量。
    - Comfy dtype: float
    - Python dtype: float
- hrf_upscale_factor
    - “hrf_upscale_factor”输出代表上采样过程中使用的缩放因子，这对于确定上采样图像的分辨率至关重要。
    - Comfy dtype: float
    - Python dtype: float
- hrf_noise_offset
    - “hrf_noise_offset”输出表示噪声偏移水平，这是微调图像处理中噪声特性的关键参数。
    - Comfy dtype: int
    - Python dtype: int
- hrf_seed
    - “hrf_seed”输出是用于随机数生成的种子值，确保处理流程中的可重复性和一致性。
    - Comfy dtype: int
    - Python dtype: int
- hires_fix
    - “hires_fix”输出是一个布尔标志，指示是否已应用高分辨率修复过程以提高图像质量。
    - Comfy dtype: bool
    - Python dtype: bool
- hrf_smoothness
    - “hrf_smoothness”输出控制高分辨率修复的平滑度，在最终上采样图像的外观中起着关键作用。
    - Comfy dtype: float
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeOutput6:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'parameters': ('PARAMETERS',)}}
    RETURN_TYPES = ('PARAMETERS', 'INT', 'FLOAT', 'FLOAT', 'INT', 'INT', 'ENABLE_STATE', 'FLOAT')
    RETURN_NAMES = ('parameters', 'hrf_steps', 'hrf_denoise', 'hrf_upscale_factor', 'hrf_noise_offset', 'hrf_seed', 'hires_fix', 'hrf_smoothness')
    FUNCTION = 'demux'
    CATEGORY = 'Searge/_deprecated_/UI/Outputs'

    def demux(self, parameters):
        hrf_steps = parameters['hrf_steps']
        hrf_denoise = parameters['hrf_denoise']
        hrf_upscale_factor = parameters['hrf_upscale_factor']
        hrf_noise_offset = parameters['hrf_noise_offset']
        hrf_seed = parameters['hrf_seed']
        hires_fix = parameters['hires_fix']
        hrf_smoothness = parameters['hrf_smoothness']
        return (parameters, hrf_steps, hrf_denoise, hrf_upscale_factor, hrf_noise_offset, hrf_seed, hires_fix, hrf_smoothness)
```