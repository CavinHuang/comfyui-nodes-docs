# Documentation
- Class name: MediaPipe_FaceMesh_Preprocessor_Provider_for_SEGS
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点使用MediaPipe的FaceMesh模型来预处理图像，以便进行语义分割任务，通过检测面部并生成相应的掩码。它通过专注于面部特征来增强输入图像的分割，这对于需要详细面部分割的应用至关重要。

# Input types
## Required
- max_faces
    - 此参数确定模型应在输入图像中检测的最大面孔数。它对于控制面部检测的粒度至关重要，并影响性能和准确性之间的平衡。
    - Comfy dtype: INT
    - Python dtype: int
- min_confidence
    - 面部检测的最小置信度阈值。它过滤掉低于此置信度水平的检测，这对于确保生成的分割掩码的质量很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution_upscale_by
    - 此参数通过缩放因子整输入图像的分辨率。放大图像可以提高检测准确性，但可能会增加计算需求。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- SEGS_PREPROCESSOR
    - 输出是带有检测到的面部和分割掩码的预处理图像，作为下游语义分割任务的输入。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: object

# Usage tips
- Infra type: CPU

# Source code
```
class MediaPipe_FaceMesh_Preprocessor_Provider_for_SEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'max_faces': ('INT', {'default': 10, 'min': 1, 'max': 50, 'step': 1}), 'min_confidence': ('FLOAT', {'default': 0.5, 'min': 0.01, 'max': 1.0, 'step': 0.01}), 'resolution_upscale_by': ('FLOAT', {'default': 1.0, 'min': 0.5, 'max': 100, 'step': 0.1})}}
    RETURN_TYPES = ('SEGS_PREPROCESSOR',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/SEGS/ControlNet'

    def doit(self, max_faces, min_confidence, resolution_upscale_by):
        obj = MediaPipe_FaceMesh_Preprocessor_wrapper(max_faces, min_confidence, upscale_factor=resolution_upscale_by)
        return (obj,)
```