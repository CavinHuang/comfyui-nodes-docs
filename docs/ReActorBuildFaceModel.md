# Documentation
- Class name: BuildFaceModel
- Category: 🌌 ReActor
- Output node: True
- Repo Ref: https://github.com/Gourieff/comfyui-reactor-node.git

该节点旨在从一组输入图像中合成面部模型，利用先进的计算机视觉技术来检测、分析和融合面部特征。它旨在创建输入面部的合表示，可用于各种应用，如识别、认证或可视化。该节点强调整合图像处理和机器学习技术，以实现高级面部合成。

# Input types
## Required
- images
    - 'image'参数对于面部模型构建过程至关重要。它作为主要输入，提供面部检测和特征提取所需的视觉数据。图像的质量和数量直接影响合成面部模型的准确性和细节。
    - Comfy dtype: COMBO[string]
    - Python dtype: List[Image.Image]
- face_model_name
    - 'face_model_name'参数对于识别和组织输出的面部模型至关重要。它作为每个模型的唯一标识符，便于后续检索和管理合成的面部数据。
    - Comfy dtype: string
    - Python dtype: str
- compute_method
    - 'compute_method'参数决定了用于将多个面部特征融合到单个复合模型中的技术。它影响面部模型的最终表示，不同的方法可能导致不同程度的细节和准确性。
    - Comfy dtype: COMBO[string]
    - Python dtype: str
## Optional
- save_mode
    - 'save_mode'参数决定合成的面部模型是否保存到输出目录。它允许用户控制节点的输出，决定是否保留生成的模型以供将来使用，还是在处理后简单地丢弃它们。
    - Comfy dtype: COMBO[boolean]
    - Python dtype: bool

# Output types
- face_model_name
    - 输出'face_model_name'代表合成面部模型的唯一标识符。它是用户在后续流程或应用中引用和使用生成模型的关键信息。
    - Comfy dtype: string
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class BuildFaceModel:

    def __init__(self):
        self.output_dir = FACE_MODELS_PATH

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'images': ('IMAGE',), 'save_mode': ('BOOLEAN', {'default': True, 'label_off': 'OFF', 'label_on': 'ON'}), 'face_model_name': ('STRING', {'default': 'default'}), 'compute_method': (['Mean', 'Median', 'Mode'], {'default': 'Mean'})}}
    RETURN_TYPES = ()
    FUNCTION = 'blend_faces'
    OUTPUT_NODE = True
    CATEGORY = '🌌 ReActor'

    def build_face_model(self, image: Image.Image, det_size=(640, 640)):
        if image is None:
            error_msg = 'Please load an Image'
            logger.error(error_msg)
            return error_msg
        image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        face_model = analyze_faces(image, det_size)
        if len(face_model) == 0:
            det_size_half = half_det_size(det_size)
            face_model = analyze_faces(image, det_size_half)
        if face_model is not None and len(face_model) > 0:
            return face_model[0]
        else:
            no_face_msg = 'No face found, please try another image'
            logger.error(no_face_msg)
            return no_face_msg

    def blend_faces(self, images, save_mode, face_model_name, compute_method):
        if save_mode and images is not None:
            faces = []
            embeddings = []
            images_list: List[Image.Image] = batch_tensor_to_pil(images)
            apply_logging_patch(1)
            n = len(images_list)
            import logging
            logging.StreamHandler.terminator = ' '
            for (i, image) in enumerate(images_list):
                logger.status(f'Building Face Model {i + 1} of {n}...')
                face = self.build_face_model(image)
                print(f'{int((i + 1) / n * 100)}%')
                if isinstance(face, str):
                    continue
                faces.append(face)
                embeddings.append(face.embedding)
            logging.StreamHandler.terminator = '\n'
            if len(faces) > 0:
                compute_method_name = 'Mean' if compute_method == 0 else 'Median' if compute_method == 1 else 'Mode'
                logger.status(f'Blending with Compute Method {compute_method_name}...')
                blended_embedding = np.mean(embeddings, axis=0) if compute_method == 'Mean' else np.median(embeddings, axis=0) if compute_method == 'Median' else stats.mode(embeddings, axis=0)[0].astype(np.float32)
                blended_face = Face(bbox=faces[0].bbox, kps=faces[0].kps, det_score=faces[0].det_score, landmark_3d_68=faces[0].landmark_3d_68, pose=faces[0].pose, landmark_2d_106=faces[0].landmark_2d_106, embedding=blended_embedding, gender=faces[0].gender, age=faces[0].age)
                if blended_face is not None:
                    face_model_path = os.path.join(FACE_MODELS_PATH, face_model_name + '.safetensors')
                    save_face_model(blended_face, face_model_path)
                    logger.status('--Done!--')
                    return face_model_name
                else:
                    no_face_msg = 'Something went wrong, please try another set of images'
                    logger.error(no_face_msg)
                    return face_model_name
            logger.status('--Done!--')
        if images is None:
            logger.error('Please provide `images`')
        return face_model_name
```