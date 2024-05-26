# Documentation
- Class name: SaveFaceModel
- Category: 🌌 ReActor
- Output node: True
- Repo Ref: https://github.com/Gourieff/comfyui-reactor-node.git

该节点旨在保存面部识别模型，封装了将图像数据转换为可用于进一步分析或识别的结构化格式的过程。它强调保留面部属性和特征以供将来使用，而不深入探讨底层算法或数据结构的具体细节。

# Input types
## Required
- save_mode
    - 此参数决定是否保存模型，作为整个保存过程的开关。它在确定节点的输出和系统随后采取的行动中起着关键作用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- face_model_name
    - 赋予面部模型的名称作为保存模型的标识符，允许在未来的操作中轻松检索和引用。它对于保持模型库存中的组织和清晰至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- select_face_index
    - 此索引从分析数据中选择一个特定的面部，指导节点专注于模型的特定面部特征。它在更广泛的数据集中针对特定数据起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- image
    - 输入图像提供了面部分析和模型创建所需的视觉数据。其质量和分辨率直接影响生成的面部模型的准确性和细节。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- face_model
    - 面部模型输入是一个可选参数，如果提供，允许节点绕过面部分析步骤并直接保存给定的模型。当有预先分析的模型可用时，这可以简化流程。
    - Comfy dtype: FACE_MODEL
    - Python dtype: insightface.Face

# Output types
- face_model_name
    - 输出反映了保存的面部模型的名称，表示保存过程的成功完成。它作为确认和参考，用于与保存的模型的未来交互。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SaveFaceModel:

    def __init__(self):
        self.output_dir = FACE_MODELS_PATH

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'save_mode': ('BOOLEAN', {'default': True, 'label_off': 'OFF', 'label_on': 'ON'}), 'face_model_name': ('STRING', {'default': 'default'}), 'select_face_index': ('INT', {'default': 0, 'min': 0})}, 'optional': {'image': ('IMAGE',), 'face_model': ('FACE_MODEL',)}}
    RETURN_TYPES = ()
    FUNCTION = 'save_model'
    OUTPUT_NODE = True
    CATEGORY = '🌌 ReActor'

    def save_model(self, save_mode, face_model_name, select_face_index, image=None, face_model=None, det_size=(640, 640)):
        if save_mode and image is not None:
            source = tensor_to_pil(image)
            source = cv2.cvtColor(np.array(source), cv2.COLOR_RGB2BGR)
            apply_logging_patch(1)
            logger.status('Building Face Model...')
            face_model_raw = analyze_faces(source, det_size)
            if len(face_model_raw) == 0:
                det_size_half = half_det_size(det_size)
                face_model_raw = analyze_faces(source, det_size_half)
            try:
                face_model = face_model_raw[select_face_index]
            except:
                logger.error('No face(s) found')
                return face_model_name
            logger.status('--Done!--')
        if save_mode and (face_model != 'none' or face_model is not None):
            face_model_path = os.path.join(self.output_dir, face_model_name + '.safetensors')
            save_face_model(face_model, face_model_path)
        if image is None and face_model is None:
            logger.error('Please provide `face_model` or `image`')
        return face_model_name
```