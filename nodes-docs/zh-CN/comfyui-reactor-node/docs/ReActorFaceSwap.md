# Documentation
- Class name: reactor
- Category: 🌌 ReActor
- Output node: False
- Repo Ref: https://github.com/Gourieff/comfyui-reactor-node.git

reactor类是一个全面的人脸操作工具包，旨在执行高级的人脸交换和恢复操作。它利用深度学习模型的力量来分析、恢复和交换图像中的人脸，同时提供性别检测和人脸可见性调整的选项。

# Input types
## Required
- enabled
    - 启用或禁用人脸处理流水线的执行。当设置为false时，输入的图像和人脸模型将不做修改直接返回。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- input_image
    - 包含要由reactor节点处理的人脸的源图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- swap_model
    - 指定在人脸交换过程中使用的人脸检测模型。
    - Comfy dtype: COMBO[retinaface_resnet50, retinaface_mobile0.25, YOLOv5l, YOLOv5n]
    - Python dtype: str
- face_restore_model
    - 指示用于提高检测到的人脸质量的人脸恢复模型。
    - Comfy dtype: COMBO[none, CodeFormer, other models...]
    - Python dtype: str
- face_restore_visibility
    - 一个浮点值，用于控制恢复后人脸的可见度，1表示完全可见，0.1表示几乎不可见。
    - Comfy dtype: FLOAT
    - Python dtype: float
- codeformer_weight
    - 在恢复人脸时对codeformer模型的输出应用权重因子，影响原始人脸特征与恢复后人脸特征之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- detect_gender_input
    - 选择要在输入人脸中检测的性别，这可以影响人脸交换操作期间人脸的选择和处理。
    - Comfy dtype: COMBO[no, female, male]
    - Python dtype: str
- input_faces_index
    - 一个字符串，表示要考虑处理的输入人脸的索引或多个索引，索引以逗号分隔。
    - Comfy dtype: STRING
    - Python dtype: str
- console_log_level
    - 设置节点执行期间生成的控制台日志的详细程度，0表示警告，1表示状态消息，2表示详细信息。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result_image
    - 经过人脸交换和恢复操作处理后的输出图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- face_model
    - 执行过程中使用的人脸模型，可以是默认模型或用户指定的模型。
    - Comfy dtype: FACE_MODEL
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class reactor:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'enabled': ('BOOLEAN', {'default': True, 'label_off': 'OFF', 'label_on': 'ON'}), 'input_image': ('IMAGE',), 'swap_model': (list(model_names().keys()),), 'facedetection': (['retinaface_resnet50', 'retinaface_mobile0.25', 'YOLOv5l', 'YOLOv5n'],), 'face_restore_model': (get_model_names(get_restorers),), 'face_restore_visibility': ('FLOAT', {'default': 1, 'min': 0.1, 'max': 1, 'step': 0.05}), 'codeformer_weight': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1, 'step': 0.05}), 'detect_gender_input': (['no', 'female', 'male'], {'default': 'no'}), 'detect_gender_source': (['no', 'female', 'male'], {'default': 'no'}), 'input_faces_index': ('STRING', {'default': '0'}), 'source_faces_index': ('STRING', {'default': '0'}), 'console_log_level': ([0, 1, 2], {'default': 1})}, 'optional': {'source_image': ('IMAGE',), 'face_model': ('FACE_MODEL',)}}
    RETURN_TYPES = ('IMAGE', 'FACE_MODEL')
    FUNCTION = 'execute'
    CATEGORY = '🌌 ReActor'

    def __init__(self):
        self.face_helper = None

    def restore_face(self, input_image, face_restore_model, face_restore_visibility, codeformer_weight, facedetection):
        result = input_image
        if face_restore_model != 'none' and (not model_management.processing_interrupted()):
            logger.status(f'Restoring with {face_restore_model}')
            model_path = folder_paths.get_full_path('facerestore_models', face_restore_model)
            device = model_management.get_torch_device()
            if 'codeformer' in face_restore_model.lower():
                codeformer_net = ARCH_REGISTRY.get('CodeFormer')(dim_embd=512, codebook_size=1024, n_head=8, n_layers=9, connect_list=['32', '64', '128', '256']).to(device)
                checkpoint = torch.load(model_path)['params_ema']
                codeformer_net.load_state_dict(checkpoint)
                facerestore_model = codeformer_net.eval()
            elif '.onnx' in face_restore_model:
                ort_session = set_ort_session(model_path, providers=providers)
                ort_session_inputs = {}
                facerestore_model = ort_session
            else:
                sd = comfy.utils.load_torch_file(model_path, safe_load=True)
                facerestore_model = model_loading.load_state_dict(sd).eval()
                facerestore_model.to(device)
            if self.face_helper is None:
                self.face_helper = FaceRestoreHelper(1, face_size=512, crop_ratio=(1, 1), det_model=facedetection, save_ext='png', use_parse=True, device=device)
            image_np = 255.0 * result.cpu().numpy()
            total_images = image_np.shape[0]
            out_images = np.ndarray(shape=image_np.shape)
            for i in range(total_images):
                if total_images > 1:
                    logger.status(f'Restoring {i + 1}')
                cur_image_np = image_np[i, :, :, ::-1]
                original_resolution = cur_image_np.shape[0:2]
                if facerestore_model is None or self.face_helper is None:
                    return result
                self.face_helper.clean_all()
                self.face_helper.read_image(cur_image_np)
                self.face_helper.get_face_landmarks_5(only_center_face=False, resize=640, eye_dist_threshold=5)
                self.face_helper.align_warp_face()
                restored_face = None
                for (idx, cropped_face) in enumerate(self.face_helper.cropped_faces):
                    if '.pth' in face_restore_model:
                        cropped_face_t = img2tensor(cropped_face / 255.0, bgr2rgb=True, float32=True)
                        normalize(cropped_face_t, (0.5, 0.5, 0.5), (0.5, 0.5, 0.5), inplace=True)
                        cropped_face_t = cropped_face_t.unsqueeze(0).to(device)
                    try:
                        with torch.no_grad():
                            if '.onnx' in face_restore_model:
                                for ort_session_input in ort_session.get_inputs():
                                    if ort_session_input.name == 'input':
                                        cropped_face_prep = prepare_cropped_face(cropped_face)
                                        ort_session_inputs[ort_session_input.name] = cropped_face_prep
                                    if ort_session_input.name == 'weight':
                                        weight = np.array([1], dtype=np.double)
                                        ort_session_inputs[ort_session_input.name] = weight
                                output = ort_session.run(None, ort_session_inputs)[0][0]
                                restored_face = normalize_cropped_face(output)
                            else:
                                output = facerestore_model(cropped_face_t, w=codeformer_weight)[0] if 'codeformer' in face_restore_model.lower() else facerestore_model(cropped_face_t)[0]
                                restored_face = tensor2img(output, rgb2bgr=True, min_max=(-1, 1))
                        del output
                        torch.cuda.empty_cache()
                    except Exception as error:
                        print(f'\tFailed inference: {error}', file=sys.stderr)
                        restored_face = tensor2img(cropped_face_t, rgb2bgr=True, min_max=(-1, 1))
                    if face_restore_visibility < 1:
                        restored_face = cropped_face * (1 - face_restore_visibility) + restored_face * face_restore_visibility
                    restored_face = restored_face.astype('uint8')
                    self.face_helper.add_restored_face(restored_face)
                self.face_helper.get_inverse_affine(None)
                restored_img = self.face_helper.paste_faces_to_input_image()
                restored_img = restored_img[:, :, ::-1]
                if original_resolution != restored_img.shape[0:2]:
                    restored_img = cv2.resize(restored_img, (0, 0), fx=original_resolution[1] / restored_img.shape[1], fy=original_resolution[0] / restored_img.shape[0], interpolation=cv2.INTER_LINEAR)
                self.face_helper.clean_all()
                out_images[i] = restored_img
            restored_img_np = np.array(out_images).astype(np.float32) / 255.0
            restored_img_tensor = torch.from_numpy(restored_img_np)
            result = restored_img_tensor
        return result

    def execute(self, enabled, input_image, swap_model, detect_gender_source, detect_gender_input, source_faces_index, input_faces_index, console_log_level, face_restore_model, face_restore_visibility, codeformer_weight, facedetection, source_image=None, face_model=None):
        apply_logging_patch(console_log_level)
        if not enabled:
            return (input_image, face_model)
        elif source_image is None and face_model is None:
            logger.error("Please provide 'source_image' or `face_model`")
            return (input_image, face_model)
        if face_model == 'none':
            face_model = None
        script = FaceSwapScript()
        pil_images = batch_tensor_to_pil(input_image)
        if source_image is not None:
            source = tensor_to_pil(source_image)
        else:
            source = None
        p = StableDiffusionProcessingImg2Img(pil_images)
        script.process(p=p, img=source, enable=True, source_faces_index=source_faces_index, faces_index=input_faces_index, model=swap_model, swap_in_source=True, swap_in_generated=True, gender_source=detect_gender_source, gender_target=detect_gender_input, face_model=face_model)
        result = batched_pil_to_tensor(p.init_images)
        if face_model is None:
            current_face_model = get_current_faces_model()
            face_model_to_provide = current_face_model[0] if current_face_model is not None and len(current_face_model) > 0 else face_model
        else:
            face_model_to_provide = face_model
        result = reactor.restore_face(self, result, face_restore_model, face_restore_visibility, codeformer_weight, facedetection)
        return (result, face_model_to_provide)
```