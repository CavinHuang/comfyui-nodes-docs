# Documentation
- Class name: SeargeInput6
- Category: Searge/_deprecated_/UI/Inputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点作为配置和组合与高分辨率图像处理相关的各种参数的接口。它旨在通过允许用户一次输入和调整多个参数来简化设置高分辨率修复任务的过程。节点的主要功能是促进图像处理任务的准备和管理，确保正确应用和组织必要的设置。

# Input types
## Required
- hires_fix
    - 该参数对于定义高分辨率修复过程的状态至关重要。它规定了图像处理开始的初始条件，显著影响任务的结果。
    - Comfy dtype: SeargeParameterProcessor.STATES
    - Python dtype: SeargeParameterProcessor.STATES
- hrf_steps
    - 高分辨率修复步骤的数量对于控制图像细化的迭代过程至关重要。它影响最终输出的细节层次和整体质量。
    - Comfy dtype: INT
    - Python dtype: int
- hrf_denoise
    - 去噪参数在减少图像噪声和伪影方面起着关键作用，从而提高处理图像的清晰度和视觉吸引力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hrf_upscale_factor
    - 放大因子决定了图像将被放大的程度，直接影响最终图像的分辨率和细节量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hrf_intensity
    - 强度参数影响图像处理效果的强度，例如锐化和对比度增强，这对于实现期望的视觉结果至关重要。
    - Comfy dtype: SeargeParameterProcessor.REFINER_INTENSITY
    - Python dtype: SeargeParameterProcessor.REFINER_INTENSITY
- hrf_seed_offset
    - 种子偏移量对于确保图像处理结果的随机性和多样性很重要，特别是在处理多个图像或批次时非常有用。
    - Comfy dtype: SeargeParameterProcessor.HRF_SEED_OFFSET
    - Python dtype: SeargeParameterProcessor.HRF_SEED_OFFSET
- hrf_smoothness
    - 平滑度参数有助于控制处理图像的锐度和纹理，有助于最终产品的总体美观和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- inputs
    - 该参数允许包含额外的输入，可用于进一步定制高分辨率图像处理工作流程。
    - Comfy dtype: PARAMETER_INPUTS
    - Python dtype: dict

# Output types
- inputs
    - 输出是通过节点配置的一组有序参数。这些参数对于高分辨率图像处理流水线中的后续步骤至关重要。
    - Comfy dtype: PARAMETER_INPUTS
    - Python dtype: dict

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeInput6:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'hires_fix': (SeargeParameterProcessor.STATES, {'default': SeargeParameterProcessor.STATES[1]}), 'hrf_steps': ('INT', {'default': 0, 'min': 0, 'max': 100}), 'hrf_denoise': ('FLOAT', {'default': 0.1, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'hrf_upscale_factor': ('FLOAT', {'default': 1.5, 'min': 0.25, 'max': 4.0, 'step': 0.25}), 'hrf_intensity': (SeargeParameterProcessor.REFINER_INTENSITY, {'default': SeargeParameterProcessor.REFINER_INTENSITY[1]}), 'hrf_seed_offset': (SeargeParameterProcessor.HRF_SEED_OFFSET, {'default': SeargeParameterProcessor.HRF_SEED_OFFSET[1]}), 'hrf_smoothness': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.05})}, 'optional': {'inputs': ('PARAMETER_INPUTS',)}}
    RETURN_TYPES = ('PARAMETER_INPUTS',)
    RETURN_NAMES = ('inputs',)
    FUNCTION = 'mux'
    CATEGORY = 'Searge/_deprecated_/UI/Inputs'

    def mux(self, hires_fix, hrf_steps, hrf_denoise, hrf_upscale_factor, hrf_intensity, hrf_seed_offset, hrf_smoothness, inputs=None):
        if inputs is None:
            parameters = {}
        else:
            parameters = inputs
        parameters['hires_fix'] = hires_fix
        parameters['hrf_steps'] = hrf_steps
        parameters['hrf_denoise'] = hrf_denoise
        parameters['hrf_upscale_factor'] = hrf_upscale_factor
        parameters['hrf_intensity'] = hrf_intensity
        parameters['hrf_seed_offset'] = hrf_seed_offset
        parameters['hrf_smoothness'] = hrf_smoothness
        return (parameters,)
```