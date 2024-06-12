---
tags:
- Animation
- PoseEstimation
---

# AnimalPose Estimator (AP10K)
## Documentation
- Class name: `AnimalPosePreprocessor`
- Category: `ControlNet Preprocessors/Faces and Poses Estimators`
- Output node: `False`

The AnimalPosePreprocessor node is designed for detecting and analyzing animal poses within images. It utilizes advanced pose estimation techniques to identify and process animal figures, aiming to provide detailed pose information that can be used for further analysis or processing.
## Input types
### Required
- **`image`**
    - The input image to be processed for animal pose detection. This is the primary input for the pose estimation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`bbox_detector`**
    - Specifies the bounding box detector model used to identify the regions of interest within the image where animals are present. This step is crucial for narrowing down the areas for pose estimation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`pose_estimator`**
    - Defines the pose estimation model to be used for analyzing the detected animal figures within the image. This parameter determines the accuracy and effectiveness of the pose detection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - Sets the resolution for the pose detection process. Higher resolutions can lead to more detailed pose estimations but may require more computational resources.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns the processed image with detected animal poses highlighted, facilitating visual inspection and analysis of the pose estimation results.
    - Python dtype: `numpy.ndarray`
- **`pose_keypoint`**
    - Comfy dtype: `POSE_KEYPOINT`
    - Outputs the key points of detected animal poses, providing detailed information about the pose structure for further analysis or processing.
    - Python dtype: `Dict`
- **`ui`**
    - Provides a user interface component that displays the JSON representation of the detected animal poses, offering an accessible way to visualize and understand the pose data.
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
