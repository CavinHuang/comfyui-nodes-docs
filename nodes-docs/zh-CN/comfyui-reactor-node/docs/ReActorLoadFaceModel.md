# Documentation
- Class name: LoadFaceModel
- Category: 🌌 ReActor
- Output node: False
- Repo Ref: https://github.com/Gourieff/comfyui-reactor-node.git

该节点便于加载和准备面部识别模型，这对于后续的面部处理任务至关重要。它封装了模型检索的复杂性，并确保基于输入规格使用适当的模型，从而增强了系统的灵活性和适应性。

# Input types
## Required
- face_model
    - ‘face_model’参数至关重要，因为它决定了节点将加载哪个面部识别模型。它通过确定后续操作中将应用的特定特征和算法，影响整个处理流程。
    - Comfy dtype: COMBO[get_model_names(get_facemodels())]
    - Python dtype: Union[str, None]

# Output types
- FACE_MODEL
    - 输出代表加载的面部识别模型，这是进一步面部分析和处理任务的关键组成部分。它封装了模型学习到的特征，准备应用于下游操作。
    - Comfy dtype: Face
    - Python dtype: insightface.app.common.Face

# Usage tips
- Infra type: CPU

# Source code
```
class LoadFaceModel:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'face_model': (get_model_names(get_facemodels),)}}
    RETURN_TYPES = ('FACE_MODEL',)
    FUNCTION = 'load_model'
    CATEGORY = '🌌 ReActor'

    def load_model(self, face_model):
        self.face_model = face_model
        self.face_models_path = FACE_MODELS_PATH
        if self.face_model != 'none':
            face_model_path = os.path.join(self.face_models_path, self.face_model)
            out = load_face_model(face_model_path)
        else:
            out = None
        return (out,)
```