# Documentation
- Class name: SeargeUpscaleModels
- Category: UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点负责协调选择和配置图像增强的放大模型，重点是整合各种放大器以实现期望的输出质量。

# Input types
## Required
- detail_processor
    - 细节处理器对于提高图像质量至关重要，在整体放大过程中发挥关键作用。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- high_res_upscaler
    - 高分辨率放大器对于提高图像分辨率至关重要，对最终视觉效果有显著贡献。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- primary_upscaler
    - 主要放大器在初始缩放阶段非常关键，为进一步增强设定基础。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- secondary_upscaler
    - 次要放大器在主要缩放后进一步细化图像，改善细节和清晰度。
    - Comfy dtype: COMBO[str]
    - Python dtype: str

# Output types
- data
    - 输出数据封装了放大模型的配置，对于后续处理和最终图像输出至关重要。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeUpscaleModels:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'detail_processor': (UI.UPSCALERS_1x_WITH_NONE(),), 'high_res_upscaler': (UI.UPSCALERS_4x_WITH_NONE(),), 'primary_upscaler': (UI.UPSCALERS_4x_WITH_NONE(),), 'secondary_upscaler': (UI.UPSCALERS_4x_WITH_NONE(),)}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'get'
    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(detail_processor, high_res_upscaler, primary_upscaler, secondary_upscaler):
        return {UI.F_DETAIL_PROCESSOR: detail_processor, UI.F_HIGH_RES_UPSCALER: high_res_upscaler, UI.F_PRIMARY_UPSCALER: primary_upscaler, UI.F_SECONDARY_UPSCALER: secondary_upscaler}

    def get(self, detail_processor, high_res_upscaler, primary_upscaler, secondary_upscaler, data=None):
        if data is None:
            data = {}
        data[UI.S_UPSCALE_MODELS] = self.create_dict(detail_processor, high_res_upscaler, primary_upscaler, secondary_upscaler)
        return (data,)
```