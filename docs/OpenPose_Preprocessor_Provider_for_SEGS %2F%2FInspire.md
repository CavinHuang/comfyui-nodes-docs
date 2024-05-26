# Documentation
- Class name: OpenPose_Preprocessor_Provider_for_SEGS
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

OpenPose_Preprocessor_Provider_for_SEGS 类旨在通过使用 OpenPose 技术来检测和分析人体姿态，从而促进图像的语义分割预处理。它可以在图像中识别手、身体和面部，这对于需要理解场景中人体姿势和交互的应用至关重要。

# Input types
## Required
- detect_hand
    - 此参数控制节点是否尝试在输入图像中检测手部。启用此功能可以为需要理解手部位置和交互的应用程序提供有价值的数据。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- detect_body
    - 此参数启用或禁用图像中人体检测。对于需要理解场景中个体的整体结构和姿态的应用程序，身体检测是必不可少的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- detect_face
    - 通过切换此参数，可以指示节点检测面部特征。这种能力对于需要分析面部表情和交互的应用程序至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- resolution_upscale_by
    - 此参数调整输入图像的分辨率，可以提高姿态检测的准确性。提高分辨率可以提供更详细的信息，这对于复杂的场景或高分辨率的分割任务是有益的。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- SEGS_PREPROCESSOR
    - 该节点的输出是一个包含人类姿态注释的预处理图像，可用作语义分割任务的基础。这些注释对于准确识别和分类场景中的不同元素至关重要。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class OpenPose_Preprocessor_Provider_for_SEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'detect_hand': ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'}), 'detect_body': ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'}), 'detect_face': ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'}), 'resolution_upscale_by': ('FLOAT', {'default': 1.0, 'min': 0.5, 'max': 100, 'step': 0.1})}}
    RETURN_TYPES = ('SEGS_PREPROCESSOR',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/SEGS/ControlNet'

    def doit(self, detect_hand, detect_body, detect_face, resolution_upscale_by):
        obj = OpenPose_Preprocessor_wrapper(detect_hand, detect_body, detect_face, upscale_factor=resolution_upscale_by)
        return (obj,)
```