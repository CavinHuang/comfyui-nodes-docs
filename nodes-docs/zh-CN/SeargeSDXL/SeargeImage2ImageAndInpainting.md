# Documentation
- Class name: SeargeImage2ImageAndInpainting
- Category: UI_INPUTS
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeImage2ImageAndInpainting 节点旨在促进图像到图像的转换和修复任务。它接受定义降噪级别和修复掩模特征的参数，并输出适合在图像处理工作流中进一步处理的结构化数据流。

# Input types
## Required
- denoise
    - ‘denoise’参数控制应用于图像的降噪级别。它对于通过减少不需要的噪声同时保留重要细节来增强图像质量至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- inpaint_mask_blur
    - ‘inpaint_mask_blur’参数决定了修复掩模的模糊半径，这对于图像中修复区域的平滑度非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- inpaint_mask_mode
    - ‘inpaint_mask_mode’参数选择修复掩模的操作模式，影响修复过程如何应用于图像。
    - Comfy dtype: UI.MASK_MODES
    - Python dtype: str
- data
    - ‘data’参数是可选输入，允许用户为节点提供现有的数据流进行处理，增强了节点应用的灵活性。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: dict

# Output types
- data
    - ‘data’输出是一个结构化的数据流，封装了图像到图像转换和修复过程的结果，准备用于下游任务。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: dict

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeImage2ImageAndInpainting:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'denoise': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'inpaint_mask_blur': ('INT', {'default': 16, 'min': 0, 'max': 24, 'step': 4}), 'inpaint_mask_mode': (UI.MASK_MODES,)}, 'optional': {'data': ('SRG_DATA_STREAM',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'get'
    CATEGORY = UI.CATEGORY_UI_INPUTS

    @staticmethod
    def create_dict(denoise, inpaint_mask_blur, inpaint_mask_mode):
        return {UI.F_DENOISE: round(denoise, 3), UI.F_INPAINT_MASK_BLUR: inpaint_mask_blur, UI.F_INPAINT_MASK_MODE: inpaint_mask_mode}

    def get(self, denoise, inpaint_mask_blur, inpaint_mask_mode, data=None):
        if data is None:
            data = {}
        data[UI.S_IMG2IMG_INPAINTING] = self.create_dict(denoise, inpaint_mask_blur, inpaint_mask_mode)
        return (data,)
```