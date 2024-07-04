
# Documentation
- Class name: Inference_Core_MediaPipe-FaceMeshPreprocessor
- Category: ControlNet Preprocessors/Faces and Poses Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

这个节点旨在利用MediaPipe的Face Mesh技术预处理图像以进行面部网格检测任务。它会动态安装依赖项、根据输入参数配置MediaPipe Face Mesh设置，并处理图像以检测面部特征点，同时可配置精度和面部数量限制。

# Input types
## Required
- image
    - 需要进行面部网格检测处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- max_faces
    - 指定在一张图像中检测的最大面部数量，允许控制面部检测范围和性能。
    - Comfy dtype: INT
    - Python dtype: int
- min_confidence
    - 确定检测面部的最小置信度阈值，使得可以微调检测灵敏度，以平衡准确性和检测率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - 输入图像在处理前调整到的分辨率，影响面部网格检测的精确度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 处理后的图像，包含检测到的面部网格，可用于进一步分析或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Media_Pipe_Face_Mesh_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            max_faces=("INT", {"default": 10, "min": 1, "max": 50, "step": 1}), #Which image has more than 50 detectable faces?
            min_confidence=("FLOAT", {"default": 0.5, "min": 0.01, "max": 1.0, "step": 0.01})
        )
        
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "detect"

    CATEGORY = "ControlNet Preprocessors/Faces and Poses Estimators"

    def detect(self, image, max_faces, min_confidence, resolution=512):
        #Ref: https://github.com/Fannovel16/comfy_controlnet_preprocessors/issues/70#issuecomment-1677967369
        install_deps()
        from controlnet_aux.mediapipe_face import MediapipeFaceDetector
        return (common_annotator_call(MediapipeFaceDetector(), image, max_faces=max_faces, min_confidence=min_confidence, resolution=resolution), )

```
