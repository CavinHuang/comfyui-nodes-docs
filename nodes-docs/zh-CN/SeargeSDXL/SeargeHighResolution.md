# Documentation
- Class name: SeargeHighResolution
- Category: UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点类旨在通过应用一系列高分辨率技术来提高图像分辨率，目的是在不丢失重要视觉信息的情况下改善输入数据的质量和细节。

# Input types
## Required
- hires_mode
    - 该参数决定了高分辨率增强的模式，对于确定用于改善图像质量的整体策略至关重要。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- hires_scale
    - 比例参数至关重要，因为它设置了放大的程度，直接影响输出的分辨率和细节水平。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- hires_denoise
    - 这控制去噪水平，对于减少噪声同时保留图像细节很重要，从而确保输出结果更清晰。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hires_softness
    - 软度调整影响图像的锐度，在增强细节和避免过度锐化产生的伪影之间取得平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hires_detail_boost
    - 细节增强参数提升图像的细微细节，有助于产生更生动和逼真的视觉结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hires_contrast_factor
    - 通过调整对比度因子，节点可以操纵图像的动态范围，改善整体视觉冲击和深度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hires_saturation_factor
    - 饱和度因子在调整图像的颜色强度方面至关重要，增强了生动性，使视觉输出更具吸引力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hires_latent_detailer
    - 潜在细节提取器参数负责提炼图像的潜在特征，这对于实现高保真和详细的结果至关重要。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- final_upscale_size
    - 该参数定义了最终放大的尺寸，这对于确定最终输出的分辨率和尺寸至关重要。
    - Comfy dtype: COMBO[str]
    - Python dtype: str

# Output types
- data
    - 输出数据流包含处理过的高分辨率图像，这是应用各种增强技术的结果。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeHighResolution:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'hires_mode': (UI.HIRES_MODES, {'default': UI.NONE}), 'hires_scale': (UI.HIRES_SCALE_FACTORS, {'default': UI.HIRES_SCALE_1_5}), 'hires_denoise': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'hires_softness': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'hires_detail_boost': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'hires_contrast_factor': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'hires_saturation_factor': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.05}), 'hires_latent_detailer': (UI.LATENT_DETAILERS, {'default': UI.NONE}), 'final_upscale_size': (UI.UPSCALE_FACTORS, {'default': UI.NONE})}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'get'
    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(hires_mode, hires_scale, hires_denoise, hires_softness, hires_detail_boost, hires_contrast_factor, hires_saturation_factor, hires_latent_detailer, final_upscale_size):
        return {UI.F_HIRES_MODE: hires_mode, UI.F_HIRES_SCALE: hires_scale, UI.F_HIRES_DENOISE: round(hires_denoise, 3), UI.F_HIRES_SOFTNESS: round(hires_softness, 3), UI.F_HIRES_DETAIL_BOOST: round(hires_detail_boost, 3), UI.F_HIRES_CONTRAST_FACTOR: round(hires_contrast_factor, 3), UI.F_HIRES_SATURATION_FACTOR: round(hires_saturation_factor, 3), UI.F_HIRES_LATENT_DETAILER: hires_latent_detailer, UI.F_FINAL_UPSCALE_SIZE: final_upscale_size}

    def get(self, hires_mode, hires_scale, hires_denoise, hires_softness, hires_detail_boost, hires_contrast_factor, hires_saturation_factor, hires_latent_detailer, final_upscale_size, data=None):
        if data is None:
            data = {}
        data[UI.S_HIGH_RESOLUTION] = self.create_dict(hires_mode, hires_scale, hires_denoise, hires_softness, hires_detail_boost, hires_contrast_factor, hires_saturation_factor, hires_latent_detailer, final_upscale_size)
        return (data,)
```