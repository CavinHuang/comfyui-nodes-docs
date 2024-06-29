# Documentation
- Class name: SeargeInput3
- Category: Searge/_deprecated_/UI/Inputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点作为各种输入参数的多路复用器，简化了将多样化配置集成到系统中的过程。它旨在处理必需和可选输入，确保必要的数据高效传递，不会有信息丢失。

# Input types
## Required
- base_ratio
    - 基础比例参数对于建立输入数据的基本缩放比例至关重要。它显著影响处理输出的初始尺寸。
    - Comfy dtype: FLOAT
    - Python dtype: float
- refiner_strength
    - 细化强度决定了应用于缩放数据的后处理步骤的强度。它影响输出的最终质量和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- refiner_intensity
    - 细化强度设置调整了放大过程中细节保留的水平。对于在性能和输出清晰度之间取得平衡至关重要。
    - Comfy dtype: ENUM
    - Python dtype: Enum
- precondition_steps
    - 预处理步骤的数量决定了初步处理的复杂性。它是优化放大过程的效率和效果的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 批处理大小影响同时处理的数据点数量。它是管理计算资源和加快执行速度的关键参数。
    - Comfy dtype: INT
    - Python dtype: int
- upscale_resolution_factor
    - 这个因素直接影响放大图像的最终分辨率。它在决定输出的视觉保真度和计算需求方面至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- save_upscaled_image
    - 保存放大图像的决定影响工作流的结果。它确保结果被保存以供进一步分析或使用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- inputs
    - 此参数允许包含额外的输入参数，增强了节点的多功能性和适应不同场景的能力。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]
- denoise
    - 去噪参数对于降噪过程至关重要，控制从放大图像中过滤掉的噪声水平。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- inputs
    - 输出是包含所有输入的全面参数集，为数据的进一步处理提供了结构化和有序的表示。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeInput3:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_ratio': ('FLOAT', {'default': 0.8, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'refiner_strength': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 1.0, 'step': 0.05}), 'refiner_intensity': (SeargeParameterProcessor.REFINER_INTENSITY, {'default': SeargeParameterProcessor.REFINER_INTENSITY[1]}), 'precondition_steps': ('INT', {'default': 0, 'min': 0, 'max': 10}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 4}), 'upscale_resolution_factor': ('FLOAT', {'default': 2.0, 'min': 0.25, 'max': 4.0, 'step': 0.25}), 'save_upscaled_image': (SeargeParameterProcessor.STATES, {'default': SeargeParameterProcessor.STATES[1]})}, 'optional': {'inputs': ('PARAMETER_INPUTS',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('PARAMETER_INPUTS',)
    RETURN_NAMES = ('inputs',)
    FUNCTION = 'mux'
    CATEGORY = 'Searge/_deprecated_/UI/Inputs'

    def mux(self, base_ratio, refiner_strength, refiner_intensity, precondition_steps, batch_size, upscale_resolution_factor, save_upscaled_image, inputs=None, denoise=None):
        if inputs is None:
            parameters = {}
        else:
            parameters = inputs
        parameters['denoise'] = denoise
        parameters['base_ratio'] = base_ratio
        parameters['refiner_strength'] = refiner_strength
        parameters['refiner_intensity'] = refiner_intensity
        parameters['precondition_steps'] = precondition_steps
        parameters['batch_size'] = batch_size
        parameters['upscale_resolution_factor'] = upscale_resolution_factor
        parameters['save_upscaled_image'] = save_upscaled_image
        return (parameters,)
```