
# Documentation
- Class name: DWPreprocessor
- Category: ControlNet Preprocessors/Faces and Poses Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

DWPreprocessor节点专门用于DWPose姿态估计任务的数据预处理。它将输入数据转换为适合姿态估计的格式，通过优化输入数据的结构和格式来提高姿态估计模型的性能。

# Input types
## Required
- image
    - 用于姿态估计的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: np.ndarray
## Optional
- detect_hand
    - 启用或禁用姿态估计过程中的手部检测，影响姿态分析的全面性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- detect_body
    - 启用或禁用身体检测，决定姿态估计中是否包含身体关键点。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- detect_face
    - 控制姿态估计中是否包含面部检测，影响面部关键点的细节级别。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 输入图像调整大小的分辨率，影响姿态估计的细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- bbox_detector
    - 指定要使用的边界框检测器模型，影响姿态估计的初始检测阶段。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- pose_estimator
    - 确定使用的姿态估计模型，直接影响姿态关键点检测的准确性和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 姿态估计后的处理图像，可用于进一步分析或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: np.ndarray
- pose_keypoint
    - 检测到的姿态关键点，提供身体各部位的详细位置信息。
    - Comfy dtype: POSE_KEYPOINT
    - Python dtype: List[np.ndarray]


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)
    - [ControlNetApply](../../Comfy/Nodes/ControlNetApply.md)
    - [PreviewBridge](../../ComfyUI-Impact-Pack/Nodes/PreviewBridge.md)
    - [CR Multi-ControlNet Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Multi-ControlNet Stack.md)



## Source code
```python
class DWPose_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        input_types = create_node_input_types(
            detect_hand=(["enable", "disable"], {"default": "enable"}),
            detect_body=(["enable", "disable"], {"default": "enable"}),
            detect_face=(["enable", "disable"], {"default": "enable"})
        )
        input_types["optional"] = {
            **input_types["optional"],
            "bbox_detector": (
                ["yolox_l.torchscript.pt", "yolox_l.onnx", "yolo_nas_l_fp16.onnx", "yolo_nas_m_fp16.onnx", "yolo_nas_s_fp16.onnx"],
                {"default": "yolox_l.onnx"}
            ),
            "pose_estimator": (["dw-ll_ucoco_384_bs5.torchscript.pt", "dw-ll_ucoco_384.onnx", "dw-ll_ucoco.onnx"], {"default": "dw-ll_ucoco_384_bs5.torchscript.pt"})
        }
        return input_types

    RETURN_TYPES = ("IMAGE", "POSE_KEYPOINT")
    FUNCTION = "estimate_pose"

    CATEGORY = "ControlNet Preprocessors/Faces and Poses Estimators"

    def estimate_pose(self, image, detect_hand, detect_body, detect_face, resolution=512, bbox_detector="yolox_l.onnx", pose_estimator="dw-ll_ucoco_384.onnx", **kwargs):
        if bbox_detector == "yolox_l.onnx":
            yolo_repo = DWPOSE_MODEL_NAME
        elif "yolox" in bbox_detector:
            yolo_repo = "hr16/yolox-onnx"
        elif "yolo_nas" in bbox_detector:
            yolo_repo = "hr16/yolo-nas-fp16"
        else:
            raise NotImplementedError(f"Download mechanism for {bbox_detector}")

        if pose_estimator == "dw-ll_ucoco_384.onnx":
            pose_repo = DWPOSE_MODEL_NAME
        elif pose_estimator.endswith(".onnx"):
            pose_repo = "hr16/UnJIT-DWPose"
        elif pose_estimator.endswith(".torchscript.pt"):
            pose_repo = "hr16/DWPose-TorchScript-BatchSize5"
        else:
            raise NotImplementedError(f"Download mechanism for {pose_estimator}")

        model = DwposeDetector.from_pretrained(
            pose_repo,
            yolo_repo,
            det_filename=bbox_detector, pose_filename=pose_estimator,
            torchscript_device=model_management.get_torch_device()
        )
        detect_hand = detect_hand == "enable"
        detect_body = detect_body == "enable"
        detect_face = detect_face == "enable"
        self.openpose_dicts = []
        def func(image, **kwargs):
            pose_img, openpose_dict = model(image, **kwargs)
            self.openpose_dicts.append(openpose_dict)
            return pose_img

        out = common_annotator_call(func, image, include_hand=detect_hand, include_face=detect_face, include_body=detect_body, image_and_json=True, resolution=resolution)
        del model
        return {
            'ui': { "openpose_json": [json.dumps(self.openpose_dicts, indent=4)] },
            "result": (out, self.openpose_dicts)
        }

```
