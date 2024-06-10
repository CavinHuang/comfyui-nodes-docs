---
tags:
- Animation
- PoseEstimation
---

# [Inference.Core] OpenPose Pose
## Documentation
- Class name: `Inference_Core_OpenposePreprocessor`
- Category: `ControlNet Preprocessors/Faces and Poses Estimators`
- Output node: `False`

The OpenPose Preprocessor node is designed for estimating human poses from images. It leverages the OpenPose model to detect and annotate various keypoints of the human body, face, and hands, providing a comprehensive pose estimation.
## Input types
### Required
- **`image`**
    - The input image for pose estimation, serving as the primary data source for analysis.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`detect_hand`**
    - Determines whether hand keypoints should be detected, enhancing the detail of the pose estimation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`detect_body`**
    - Controls the detection of body keypoints, forming the core of the pose estimation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`detect_face`**
    - Specifies if face keypoints should be identified, adding facial expressions to the pose analysis.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - Specifies the resolution for the pose estimation process, affecting the precision and scale of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns the pose image, visually representing the estimated poses.
    - Python dtype: `torch.Tensor`
- **`pose_keypoint`**
    - Comfy dtype: `POSE_KEYPOINT`
    - Delivers the pose keypoints data, encapsulating detailed information about the estimated poses.
    - Python dtype: `List[Dict]`
- **`ui`**
    - Provides a JSON representation of the detected poses, offering detailed insights into the pose estimation.
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class OpenPose_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            detect_hand = (["enable", "disable"], {"default": "enable"}),
            detect_body = (["enable", "disable"], {"default": "enable"}),
            detect_face = (["enable", "disable"], {"default": "enable"})
        )
        
    RETURN_TYPES = ("IMAGE", "POSE_KEYPOINT")
    FUNCTION = "estimate_pose"

    CATEGORY = "ControlNet Preprocessors/Faces and Poses Estimators"

    def estimate_pose(self, image, detect_hand, detect_body, detect_face, resolution=512, **kwargs):
        from controlnet_aux.open_pose import OpenposeDetector

        detect_hand = detect_hand == "enable"
        detect_body = detect_body == "enable"
        detect_face = detect_face == "enable"

        model = OpenposeDetector.from_pretrained().to(model_management.get_torch_device())        
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
