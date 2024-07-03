
# Documentation
- Class name: Inference_Core_OpenposePreprocessor
- Category: ControlNet Preprocessors/Faces and Poses Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

OpenPose预处理器节点旨在从图像中估计人体姿势。它利用OpenPose模型检测和标注人体、面部和手部的各种关键点，提供全面的姿势估计。

# Input types
## Required
- image
    - 用于姿势估计的输入图像，作为分析的主要数据源。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- detect_hand
    - 决定是否检测手部关键点，以增强姿势估计的细节。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- detect_body
    - 控制身体关键点的检测，构成姿势估计的核心。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- detect_face
    - 指定是否识别面部关键点，为姿势分析添加面部表情。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 指定姿势估计过程的分辨率，影响输出的精度和比例。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 返回姿势图像，直观地表示估计的姿势。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- pose_keypoint
    - 提供姿势关键点数据，封装了有关估计姿势的详细信息。
    - Comfy dtype: POSE_KEYPOINT
    - Python dtype: List[Dict]
- ui
    - 提供检测到的姿势的JSON表示，对姿势估计提供详细的见解。


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
