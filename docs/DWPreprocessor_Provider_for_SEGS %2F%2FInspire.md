# Documentation
- Class name: DWPreprocessor_Provider_for_SEGS
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

DWPreprocessor_Provider_for_SEGS 类旨在通过使用先进的姿态估计技术来促进图像的语义分割任务预处理。它与 ComfyUI 平台集成，通过检测和处理手、身体和面部等关键特征来增强分割的准确性。该节点通过为分割模型提供详细和精炼的输入，从而提高了输出分割的质量，为整体图像分析工作流程做出贡献。

# Input types
## Required
- detect_hand
    - 此参数控制预处理阶段是否启用手部检测功能。启用此功能可以通过识别和处理与手相关的特征显著提高分割的准确性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- detect_body
    - 此参数在预处理过程中启用或禁用身体检测。身体检测对于语义分割至关重要，因为它有助于识别图像的整体结构和布局，这对于准确的分割是必不可少的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- detect_face
    - 面部检测参数允许在预处理阶段识别和处理面部特征。对于面部特征是分割任务关键组成部分的应用来说，这特别有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- resolution_upscale_by
    - 此参数通过指定的缩放因子调整输入图像的分辨率。放大可以增强图像的细节和清晰度，从而可能带来更好的分割结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- SEGS_PREPROCESSOR
    - 该节点的输出是一个包含预处理后的图像数据的字典，现在已准备好进行语义分割。预处理包括手、身体和面部的检测，还可能涉及分辨率放大，所有这些都有助于提高分割的质量。
    - Comfy dtype: DICTIONARY
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class DWPreprocessor_Provider_for_SEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'detect_hand': ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'}), 'detect_body': ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'}), 'detect_face': ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'}), 'resolution_upscale_by': ('FLOAT', {'default': 1.0, 'min': 0.5, 'max': 100, 'step': 0.1})}}
    RETURN_TYPES = ('SEGS_PREPROCESSOR',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/SEGS/ControlNet'

    def doit(self, detect_hand, detect_body, detect_face, resolution_upscale_by):
        obj = DWPreprocessor_wrapper(detect_hand, detect_body, detect_face, upscale_factor=resolution_upscale_by, bbox_detector='yolox_l.onnx', pose_estimator='dw-ll_ucoco_384_bs5.torchscript.pt')
        return (obj,)
```