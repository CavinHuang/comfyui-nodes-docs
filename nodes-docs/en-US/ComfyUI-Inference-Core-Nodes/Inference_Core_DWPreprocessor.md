---
tags:
- Animation
- PoseEstimation
---

# [Inference.Core] DWPose Estimator
## Documentation
- Class name: `Inference_Core_DWPreprocessor`
- Category: `ControlNet Preprocessors/Faces and Poses Estimators`
- Output node: `False`

The Inference_Core_DWPreprocessor node is designed for preprocessing input data specifically for the DWPose estimation model. It adapts input data to the required format and optimizes it for efficient pose estimation, ensuring compatibility and maximizing the performance of the DWPose model.
## Input types
### Required
- **`image`**
    - The 'image' parameter is the primary input for the pose estimation process, serving as the visual data that the model will analyze to estimate poses.
    - Comfy dtype: `IMAGE`
    - Python dtype: `np.ndarray`
### Optional
- **`detect_hand`**
    - The 'detect_hand' parameter controls whether hand detection is enabled or disabled, influencing the comprehensiveness of the pose estimation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`detect_body`**
    - The 'detect_body' parameter toggles the inclusion of body pose estimation, affecting the scope of the pose analysis performed by the model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`detect_face`**
    - The 'detect_face' parameter determines whether face detection is included in the pose estimation, impacting the detail level of the pose analysis.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`resolution`**
    - The 'resolution' parameter specifies the resolution of the output image, affecting the clarity and detail of the pose estimation results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bbox_detector`**
    - The 'bbox_detector' parameter specifies the model or method used for bounding box detection, crucial for identifying regions of interest within the image for pose estimation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`pose_estimator`**
    - The 'pose_estimator' parameter defines the specific pose estimation model or technique to be applied, directly influencing the accuracy and performance of the pose estimation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The 'image' output provides the visual representation of the pose estimation, including annotated poses on the input image.
    - Python dtype: `np.ndarray`
- **`pose_keypoint`**
    - Comfy dtype: `POSE_KEYPOINT`
    - The 'pose_keypoint' output delivers the estimated poses as a set of keypoints, offering detailed information about the detected poses.
    - Python dtype: `List[np.ndarray]`
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
