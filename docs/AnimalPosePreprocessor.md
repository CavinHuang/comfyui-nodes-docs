
# Documentation
- Class name: AnimalPosePreprocessor
- Category: ControlNet Preprocessors/Faces and Poses Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AnimalPosePreprocessor节点专门用于检测和分析图像中的动物姿态。它利用先进的姿态估计技术来识别和处理动物形象，旨在提供详细的姿态信息，以供进一步分析或处理。

# Input types
## Required
- image
    - 需要进行动物姿态检测的输入图像。这是姿态估计过程的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
## Optional
- bbox_detector
    - 指定用于识别图像中存在动物的感兴趣区域的边界框检测器模型。这一步对于缩小姿态估计的区域范围至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- pose_estimator
    - 定义用于分析图像中检测到的动物形象的姿态估计模型。这个参数决定了姿态检测的准确性和有效性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 设置姿态检测过程的分辨率。较高的分辨率可能导致更详细的姿态估计，但可能需要更多的计算资源。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 返回处理后的图像，其中突出显示了检测到的动物姿态，便于对姿态估计结果进行视觉检查和分析。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- pose_keypoint
    - 输出检测到的动物姿态的关键点，提供详细的姿态结构信息，以供进一步分析或处理。
    - Comfy dtype: POSE_KEYPOINT
    - Python dtype: Dict
- ui
    - 提供一个用户界面组件，显示检测到的动物姿态的JSON表示，为可视化和理解姿态数据提供了一种便捷的方式。


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
