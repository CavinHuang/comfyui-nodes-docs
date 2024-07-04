
# Documentation
- Class name: MediaPipe-FaceMeshPreprocessor
- Category: ControlNet Preprocessors/Faces and Poses Estimators
- Output node: False

MediaPipe Face Mesh Preprocessor节点使用MediaPipe库对图像中的面部特征进行检测和处理。它专注于识别面部及其关键特征点，具有可配置的精度和性能设置，适用于需要面部分析的应用场景。

# Input types
## Required
- image
    - 需要进行面部检测和特征点标注的输入图像。这个参数对于节点执行面部分析任务至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray or PIL.Image.Image
## Optional
- max_faces
    - 指定在一张图像中要检测的最大面部数量。这个参数允许控制检测过程，确保算法专注于可管理数量的面部进行进一步处理。
    - Comfy dtype: INT
    - Python dtype: int
- min_confidence
    - 决定将一个面部视为已检测到的最小置信度水平。这个阈值有助于过滤掉不太可能准确的检测结果，确保只处理被正确识别的高概率面部。
    - Comfy dtype: FLOAT
    - Python dtype: float
- resolution
    - 处理输入图像的分辨率。这个参数可能会影响面部网格预处理器的检测精度和性能。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一张标注了检测到的面部特征点的图像。这包括面部特征如眼睛、眉毛、鼻子和嘴巴的关键点和轮廓，能够实现详细的面部分析。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `CPU`
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
