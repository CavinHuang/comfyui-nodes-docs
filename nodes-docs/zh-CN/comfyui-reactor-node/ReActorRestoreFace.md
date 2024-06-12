# Documentation
- Class name: RestoreFace
- Category: 🌌 ReActor
- Output node: False
- Repo Ref: https://github.com/Gourieff/comfyui-reactor-node.git

RestoreFace节点旨在使用先进的面部恢复模型来增强和修复图像中的面部特征。它通过利用深度学习技术来提高面部的视觉质量，这对于需要高质量面部图像的应用程序特别有用。

# Input types
## Required
- image
    - 图像参数对于面部恢复过程至关重要，它提供了面部修复的源材料。它直接影响恢复面部的质量和准确性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
- facedetection
    - facedetection参数指定用于在输入图像中识别面部的检测模型。它对于准确的面部定位至关重要，这是有效面部恢复的先决条件。
    - Comfy dtype: COMBO[retinaface_resnet50,retinaface_mobile0.25,YOLOv5l,YOLOv5n]
    - Python dtype: str
- model
    - 模型参数决定了要应用的面部恢复模型，规定了用于增强面部特征的特定算法和技术。
    - Comfy dtype: COMBO[get_model_names(get_restorers)]
    - Python dtype: str
- visibility
    - 可见性参数调整恢复面部的透明度水平，允许微调原始和恢复特征混合的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- codeformer_weight
    - codeformer_weight参数影响CodeFormer模型在恢复过程中的贡献，较高的值强调模型对最终结果的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output_image
    - 输出图像代表面部恢复的最终结果，其中输入图像的面部已得到增强和恢复到更高质量。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class RestoreFace:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'facedetection': (['retinaface_resnet50', 'retinaface_mobile0.25', 'YOLOv5l', 'YOLOv5n'],), 'model': (get_model_names(get_restorers),), 'visibility': ('FLOAT', {'default': 1, 'min': 0.0, 'max': 1, 'step': 0.05}), 'codeformer_weight': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1, 'step': 0.05})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'execute'
    CATEGORY = '🌌 ReActor'

    def __init__(self):
        self.face_helper = None

    def execute(self, image, model, visibility, codeformer_weight, facedetection):
        result = reactor.restore_face(self, image, model, visibility, codeformer_weight, facedetection)
        return (result,)
```