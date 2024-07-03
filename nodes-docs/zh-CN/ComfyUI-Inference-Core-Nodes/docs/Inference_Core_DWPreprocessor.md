
# Documentation
- Class name: Inference_Core_DWPreprocessor
- Category: ControlNet Preprocessors/Faces and Poses Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Inference_Core_DWPreprocessor节点专门用于为DWPose估计模型预处理输入数据。它将输入数据调整为所需格式并进行优化，以实现高效的姿态估计，确保与DWPose模型的兼容性并最大化其性能。

# Input types
## Required
- image
    - 'image'参数是姿态估计过程的主要输入，作为模型将分析以估计姿态的视觉数据。
    - Comfy dtype: IMAGE
    - Python dtype: np.ndarray

## Optional
- detect_hand
    - 'detect_hand'参数控制是否启用手部检测，影响姿态估计的全面性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- detect_body
    - 'detect_body'参数切换是否包含身体姿态估计，影响模型执行的姿态分析范围。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- detect_face
    - 'detect_face'参数决定是否在姿态估计中包含面部检测，影响姿态分析的细节水平。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- resolution
    - 'resolution'参数指定输出图像的分辨率，影响姿态估计结果的清晰度和细节。
    - Comfy dtype: INT
    - Python dtype: int
- bbox_detector
    - 'bbox_detector'参数指定用于边界框检测的模型或方法，对于在图像中识别姿态估计的感兴趣区域至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- pose_estimator
    - 'pose_estimator'参数定义要应用的特定姿态估计模型或技术，直接影响姿态估计的准确性和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 'image'输出提供姿态估计的视觉表示，包括在输入图像上标注的姿态。
    - Comfy dtype: IMAGE
    - Python dtype: np.ndarray
- pose_keypoint
    - 'pose_keypoint'输出以关键点集的形式提供估计的姿态，提供关于检测到的姿态的详细信息。
    - Comfy dtype: POSE_KEYPOINT
    - Python dtype: List[np.ndarray]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


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
