
# Documentation
- Class name: OpenposePreprocessor
- Category: ControlNet Preprocessors/Faces and Poses Estimators
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

OpenPose预处理器节点旨在从图像中估计人体姿势。它利用OpenPose模型来检测和标注人体、面部和手部的各种关键点，提供全面的姿势估计。

# Input types
## Required
- image
    - 用于姿势估计的输入图像。这是姿势检测算法主要操作的数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- detect_hand
    - 决定是否在姿势估计过程中检测手部关键点。启用此选项可进行详细的手部姿势分析。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- detect_body
    - 控制姿势估计中的身体关键点检测。启用此功能可以分析整体身体姿势和动作。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- detect_face
    - 指定是否应检测面部关键点，以便在姿势估计中进行详细的面部表情和方向分析。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resolution
    - 处理前将输入图像调整到的分辨率。更高的分辨率可能会提高检测准确性，但会增加计算负担。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 带有标注关键点的输出图像，直观地展示姿势估计结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- pose_keypoint
    - 包含身体、面部和手部检测到的关键点的字典，支持详细的姿势分析。
    - Comfy dtype: POSE_KEYPOINT
    - Python dtype: List[Dict[str, Any]]
- ui
    - 提供检测到的关键点的JSON表示，便于进一步分析或可视化姿势估计结果。


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
