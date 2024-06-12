# Documentation
- Class name: FaceAnalysisModels
- Category: FaceAnalysis
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_FaceAnalysis.git

方法 `load_models` 旨在初始化并加载面部分析任务所需的模型。它对于设置具有适当模型和提供者的运行环境至关重要，确保可以有效地执行后续的面部分析操作。

# Input types
## Required
- library
    - 参数 `library` 指定要使用的面部分析库。它对于确定将加载哪些模型和算法进行面部检测和识别任务至关重要。
    - Comfy dtype: "str"
    - Python dtype: str
- provider
    - 参数 `provider` 指定用于执行模型的后端。它很重要，因为它影响模型的性能和与系统硬件的兼容性。
    - Comfy dtype: COMBO["CPU", "CUDA", "DirectML", "OpenVINO", "ROCM", "CoreML"]
    - Python dtype: str

# Output types
- out
    - 参数 `out` 包含了加载的模型和相关信息。它很重要，因为它为后续的面部分析操作提供了必要的工具。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Union[FaceAnalysis, dlib.face_detector, dlib.shape_predictor, dlib.face_recognition_model_v1]]

# Usage tips
- Infra type: GPU

# Source code
```
class FaceAnalysisModels:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'library': (INSTALLED_LIBRARIES,), 'provider': (['CPU', 'CUDA', 'DirectML', 'OpenVINO', 'ROCM', 'CoreML'],)}}
    RETURN_TYPES = ('ANALYSIS_MODELS',)
    FUNCTION = 'load_models'
    CATEGORY = 'FaceAnalysis'

    def load_models(self, library, provider):
        out = {}
        if library == 'insightface':
            out = {'library': library, 'detector': FaceAnalysis(name='buffalo_l', root=INSIGHTFACE_DIR, providers=[provider + 'ExecutionProvider'])}
            out['detector'].prepare(ctx_id=0, det_size=(640, 640))
        else:
            out = {'library': library, 'detector': dlib.get_frontal_face_detector(), 'shape_predict': dlib.shape_predictor(os.path.join(DLIB_DIR, 'shape_predictor_68_face_landmarks.dat')), 'face_recog': dlib.face_recognition_model_v1(os.path.join(DLIB_DIR, 'dlib_face_recognition_resnet_model_v1.dat'))}
        return (out,)
```