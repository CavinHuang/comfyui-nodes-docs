---
tags:
- Animation
- PoseEstimation
---

# OpenPose Pose
## Documentation
- Class name: `OpenposePreprocessor`
- Category: `ControlNet Preprocessors/Faces and Poses Estimators`
- Output node: `False`

The OpenPose Preprocessor node is designed for estimating human poses from images. It leverages the OpenPose model to detect and annotate various keypoints on the human body, face, and hands, providing a comprehensive pose estimation.
## Input types
### Required
- **`image`**
    - The input image for pose estimation. This is the primary data on which the pose detection algorithms operate.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`detect_hand`**
    - Determines whether hand keypoints should be detected in the pose estimation process. Enabling this option allows for detailed hand pose analysis.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`detect_body`**
    - Controls the detection of body keypoints in the pose estimation. Enabling this feature enables the analysis of overall body posture and movements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`detect_face`**
    - Specifies whether facial keypoints should be detected, enabling detailed facial expressions and orientation analysis in the pose estimation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - The resolution to which the input image is resized before processing. Higher resolutions may improve detection accuracy at the cost of increased computational load.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with annotated keypoints, visually representing the pose estimation.
    - Python dtype: `torch.Tensor`
- **`pose_keypoint`**
    - Comfy dtype: `POSE_KEYPOINT`
    - A dictionary containing the detected keypoints for body, face, and hands, enabling detailed pose analysis.
    - Python dtype: `List[Dict[str, Any]]`
- **`ui`**
    - Provides a JSON representation of the detected keypoints, facilitating further analysis or visualization of the pose estimation results.
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [CR Multi-ControlNet Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Multi-ControlNet Stack.md)
    - [ControlNetApply](../../Comfy/Nodes/ControlNetApply.md)
    - [ImageScaleToTotalPixels](../../Comfy/Nodes/ImageScaleToTotalPixels.md)
    - Reroute
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)
    - MagicAnimate



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
