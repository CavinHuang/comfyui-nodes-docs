---
tags:
- Animation
- PoseEstimation
---

# [Inference.Core] AnimalPose Estimator (AP10K)
## Documentation
- Class name: `Inference_Core_AnimalPosePreprocessor`
- Category: `ControlNet Preprocessors/Faces and Poses Estimators`
- Output node: `False`

This node is designed to preprocess images for animal pose estimation, utilizing different model formats (TorchScript, ONNX) to detect and analyze animal poses within images. It supports dynamic selection of detection classes and handles both detection and pose estimation processes, adapting to the model's input requirements and optimizing for performance.
## Input types
### Required
- **`image`**
    - The original image to be processed for animal pose estimation. It serves as the primary input for model inference, crucial for both detection and pose estimation phases.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`bbox_detector`**
    - The detection model used to identify animal bounding boxes in the image. This model can be either a TorchScript or ONNX model, depending on the implementation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Union[torch.jit.ScriptModule, onnx.ModelProto]`
- **`pose_estimator`**
    - The pose estimation model used to analyze the detected animal poses within the bounding boxes. This model also varies in format, supporting both TorchScript and ONNX.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Union[torch.jit.ScriptModule, onnx.ModelProto]`
- **`resolution`**
    - The resolution to which the input image is resized before processing. This affects the detection and pose estimation accuracy and performance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The image annotated with detected animal poses, highlighting the key points and poses of animals detected within the original image.
    - Python dtype: `numpy.ndarray`
- **`pose_keypoint`**
    - Comfy dtype: `POSE_KEYPOINT`
    - A structured representation of detected animal poses, including keypoints and their scores, formatted for further processing or visualization.
    - Python dtype: `List[Dict[str, Any]]`
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
