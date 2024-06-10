# Documentation
- Class name: SeargeOutput3
- Category: Searge/_deprecated_/UI/Outputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点类封装了将一组参数分解为各个独立组件的逻辑，便于在系统内进行进一步的处理和分析。

# Input types
## Required
- parameters
    - 该参数作为关键输入，包含一个包含各种设置的字典，这些设置决定了节点的行为和输出。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Output types
- parameters
    - 原始的参数集被传递，保持了输入数据的完整性。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]
- denoise
    - 该输出代表了一个去噪设置，这对于图像质量提升过程至关重要。
    - Comfy dtype: Float
    - Python dtype: float
- base_ratio
    - 基础比例输出用于控制图像缩放的基础方面，确保比例和一致性。
    - Comfy dtype: Float
    - Python dtype: float
- refiner_strength
    - 细化强度是一个输出，影响图像细节的微调过程，旨在优化清晰度和锐度。
    - Comfy dtype: Float
    - Python dtype: float
- noise_offset
    - 噪声偏移输出对于调整图像中的噪声水平至关重要，有助于提高整体视觉质量。
    - Comfy dtype: Float
    - Python dtype: float
- precondition_steps
    - 该输出定义了要执行的预处理步骤的数量，这是图像处理流水线准备阶段的重要组成部分。
    - Comfy dtype: Int
    - Python dtype: int
- batch_size
    - 批处理大小输出决定了同时处理的图像数量，影响系统的效率和吞吐量。
    - Comfy dtype: Int
    - Python dtype: int
- upscale_resolution_factor
    - 该输出负责定义应用于图像分辨率的缩放因子，这是实现期望输出尺寸的关键因素。
    - Comfy dtype: Float
    - Python dtype: float
- save_upscaled_image
    - 保存放大图像输出是一个标志，用于确定是否应保存处理后的图像，影响数据持久性。
    - Comfy dtype: Bool
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeOutput3:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'parameters': ('PARAMETERS',)}}
    RETURN_TYPES = ('PARAMETERS', 'FLOAT', 'FLOAT', 'FLOAT', 'INT', 'INT', 'INT', 'FLOAT', 'ENABLE_STATE')
    RETURN_NAMES = ('parameters', 'denoise', 'base_ratio', 'refiner_strength', 'noise_offset', 'precondition_steps', 'batch_size', 'upscale_resolution_factor', 'save_upscaled_image')
    FUNCTION = 'demux'
    CATEGORY = 'Searge/_deprecated_/UI/Outputs'

    def demux(self, parameters):
        denoise = parameters['denoise']
        base_ratio = parameters['base_ratio']
        refiner_strength = parameters['refiner_strength']
        noise_offset = parameters['noise_offset']
        precondition_steps = parameters['precondition_steps']
        batch_size = parameters['batch_size']
        upscale_resolution_factor = parameters['upscale_resolution_factor']
        save_upscaled_image = parameters['save_upscaled_image']
        return (parameters, denoise, base_ratio, refiner_strength, noise_offset, precondition_steps, batch_size, upscale_resolution_factor, save_upscaled_image)
```