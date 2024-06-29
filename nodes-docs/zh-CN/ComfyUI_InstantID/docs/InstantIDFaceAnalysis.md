# Documentation
- Class name: InstantIDFaceAnalysis
- Category: InstantID
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_InstantID.git

InstantIDFaceAnalysis是一个用于执行高级面部分析的节点，它利用预训练的模型来识别和分析面部特征和属性，适用于需要精确面部识别和人口统计分析的应用场景。

# Input types
## Required
- provider
    - provider参数对于面部分析节点的执行环境至关重要。它决定了将用于面部分析任务的计算后端，影响节点的性能和效率。
    - Comfy dtype: COMBO['CPU', 'CUDA', 'ROCM']
    - Python dtype: str

# Output types
- FACEANALYSIS
    - InstantIDFaceAnalysis节点的输出是详细的面部分析结果，包含了从输入的面部数据中得出的洞察。这个输出非常重要，因为它为进一步的分析或决策过程提供了基础。
    - Comfy dtype: Tuple[FaceAnalysis]
    - Python dtype: Tuple[FaceAnalysis]

# Usage tips
- Infra type: CPU

# Source code
```
class InstantIDFaceAnalysis:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'provider': (['CPU', 'CUDA', 'ROCM'],)}}
    RETURN_TYPES = ('FACEANALYSIS',)
    FUNCTION = 'load_insight_face'
    CATEGORY = 'InstantID'

    def load_insight_face(self, provider):
        model = FaceAnalysis(name='antelopev2', root=INSIGHTFACE_DIR, providers=[provider + 'ExecutionProvider'])
        model.prepare(ctx_id=0, det_size=(640, 640))
        return (model,)
```