# Documentation
- Class name: SeargeAdvancedParameters
- Category: UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点类封装了用于细化图像细节、管理动态配置以及调整对比度和饱和度等视觉元素的高级参数。它旨在提供对图像增强过程的细粒度控制，而不直接涉及底层模型操作。

# Input types
## Required
- dynamic_cfg_method
    - 此参数规定了用于动态配置图像增强过程的方法。它对于根据不同的输入要求调整节点的行为和实现期望的输出质量至关重要。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- dynamic_cfg_factor
    - 这个因素影响了应用于图像增强的动态配置的程度。它在微调计算效率和输出细节之间的平衡方面非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- refiner_detail_boost
    - 此参数控制精炼过程中应用的细节增强水平。它对于提高最终输出的清晰度和清晰度至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast_factor
    - 这个因素调整图像的对比度，对于创造视觉冲击力和增强输出的整体美感非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- saturation_factor
    - 此参数管理图像的饱和度水平，影响颜色的生动性和视觉体验的丰富性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- latent_detailer
    - 此参数选择一个潜在的细节增强器来进一步增强图像的微妙细节。它在实现更细致和真实的视觉结果方面起着关键作用。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
## Optional
- data
    - 此参数用于传入将由节点处理的数据。它对于节点正确运行和产生预期结果非常重要。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Any

# Output types
- data
    - 输出包含应用了高级参数的处理后数据，准备在图像增强流程中进一步使用。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeAdvancedParameters:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'dynamic_cfg_method': (UI.DYNAMIC_CFG_METHODS, {'default': UI.NONE}), 'dynamic_cfg_factor': ('FLOAT', {'default': 0.0, 'min': -1.0, 'max': 1.0, 'step': 0.05}), 'refiner_detail_boost': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'contrast_factor': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'saturation_factor': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'latent_detailer': (UI.LATENT_DETAILERS, {'default': UI.NONE})}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'get'
    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(dynamic_cfg_method, dynamic_cfg_factor, refiner_detail_boost, contrast_factor, saturation_factor, latent_detailer):
        return {UI.F_DYNAMIC_CFG_METHOD: dynamic_cfg_method, UI.F_DYNAMIC_CFG_FACTOR: round(dynamic_cfg_factor, 3), UI.F_REFINER_DETAIL_BOOST: round(refiner_detail_boost, 3), UI.F_CONTRAST_FACTOR: round(contrast_factor, 3), UI.F_SATURATION_FACTOR: round(saturation_factor, 3), UI.F_LATENT_DETAILER: latent_detailer}

    def get(self, dynamic_cfg_method, dynamic_cfg_factor, refiner_detail_boost, contrast_factor, saturation_factor, latent_detailer, data=None):
        if data is None:
            data = {}
        data[UI.S_ADVANCED_PARAMETERS] = self.create_dict(dynamic_cfg_method, dynamic_cfg_factor, refiner_detail_boost, contrast_factor, saturation_factor, latent_detailer)
        return (data,)
```