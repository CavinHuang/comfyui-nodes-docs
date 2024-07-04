
# Documentation
- Class name: Inference_Core_AnimalPosePreprocessor
- Category: ControlNet Preprocessors/Faces and Poses Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在对图像进行预处理，以便进行动物姿势估计。它利用不同的模型格式（TorchScript、ONNX）来检测和分析图像中的动物姿势。该节点支持动态选择检测类别，并同时处理检测和姿势估计过程，能够适应模型的输入要求并优化性能。

# Input types
## Required
- image
    - 需要进行动物姿势估计处理的原始图像。它是模型推理的主要输入，对检测和姿势估计阶段都至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
## Optional
- bbox_detector
    - 用于识别图像中动物边界框的检测模型。该模型可以是TorchScript或ONNX模型，具体取决于实现方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Union[torch.jit.ScriptModule, onnx.ModelProto]
- pose_estimator
    - 用于分析边界框内检测到的动物姿势的姿势估计模型。该模型的格式也有所不同，支持TorchScript和ONNX。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Union[torch.jit.ScriptModule, onnx.ModelProto]
- resolution
    - 处理前将输入图像调整到的分辨率。这会影响检测和姿势估计的准确性和性能。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 标注了检测到的动物姿势的图像，突出显示原始图像中检测到的动物的关键点和姿势。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- pose_keypoint
    - 检测到的动物姿势的结构化表示，包括关键点及其得分，格式化以便进一步处理或可视化。
    - Comfy dtype: POSE_KEYPOINT
    - Python dtype: List[Dict[str, Any]]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AnimalPose_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            bbox_detector = (
                ["yolox_l.torchscript.pt", "yolox_l.onnx", "yolo_nas_l_fp16.onnx", "yolo_nas_m_fp16.onnx", "yolo_nas_s_fp16.onnx"],
                {"default": "yolox_l.torchscript.pt"}
            ),
            pose_estimator = (["rtmpose-m_ap10k_256_bs5.torchscript.pt", "rtmpose-m_ap10k_256.onnx"], {"default": "rtmpose-m_ap10k_256_bs5.torchscript.pt"})
        )

    RETURN_TYPES = ("IMAGE", "POSE_KEYPOINT")
    FUNCTION = "estimate_pose"

    CATEGORY = "ControlNet Preprocessors/Faces and Poses Estimators"

    def estimate_pose(self, image, resolution=512, bbox_detector="yolox_l.onnx", pose_estimator="rtmpose-m_ap10k_256.onnx", **kwargs):
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

        model = AnimalposeDetector.from_pretrained(
            pose_repo,
            yolo_repo,
            det_filename=bbox_detector, pose_filename=pose_estimator,
            torchscript_device=model_management.get_torch_device()
        )

        self.openpose_dicts = []
        def func(image, **kwargs):
            pose_img, openpose_dict = model(image, **kwargs)
            self.openpose_dicts.append(openpose_dict)
            return pose_img

        out = common_annotator_call(func, image, image_and_json=True, resolution=resolution)
        del model
        return {
            'ui': { "openpose_json": [json.dumps(self.openpose_dicts, indent=4)] },
            "result": (out, self.openpose_dicts)
        }

```
