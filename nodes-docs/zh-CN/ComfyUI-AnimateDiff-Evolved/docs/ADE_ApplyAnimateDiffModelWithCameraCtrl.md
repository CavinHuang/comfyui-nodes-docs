# Apply AnimateDiff+CameraCtrl Model 🎭🅐🅓②
## Documentation
- Class name: ADE_ApplyAnimateDiffModelWithCameraCtrl
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点将AnimateDiff模型与摄像机控制相结合，集成运动模型调整和摄像机控制参数以生成动画序列。它利用摄像机控制姿势和其他动画参数来增强AnimateDiff模型的输出，提供更具动态性和可定制的动画体验。

## Input types
### Required
- motion_model
    - 要进行动画处理的运动模型，结合AnimateDiff模型的功能和摄像机控制特性以增强动画。
    - Comfy dtype: MOTION_MODEL_ADE
    - Python dtype: MotionModelPatcher
- cameractrl_poses
    - 摄像机控制姿势列表，每个姿势定义动画过程中的特定摄像机位置和方向。
    - Comfy dtype: CAMERACTRL_POSES
    - Python dtype: list[list[float]]
- start_percent
    - 动画的起始百分比，作为总动画长度的一部分，允许实现部分动画。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 动画的结束百分比，作为总动画长度的一部分，允许自定义动画的持续时间。
    - Comfy dtype: FLOAT
    - Python dtype: float

### Optional
- motion_lora
    - 可选参数，用于指定运动LoRA设置，以进一步自定义动画。
    - Comfy dtype: MOTION_LORA
    - Python dtype: MotionLoraList
- scale_multival
    - 可选参数，用于应用比例乘数，影响动画元素的整体大小。
    - Comfy dtype: MULTIVAL
    - Python dtype: dict
- effect_multival
    - 可选参数，用于应用效果乘数，允许在动画中添加其他视觉效果。
    - Comfy dtype: MULTIVAL
    - Python dtype: dict
- cameractrl_multival
    - 可选参数，用于应用多个摄像机控制值，增强动画中的动态摄像机运动。
    - Comfy dtype: MULTIVAL
    - Python dtype: dict
- ad_keyframes
    - 可选参数，用于定义动画中的关键帧，允许对动画序列进行精确控制。
    - Comfy dtype: AD_KEYFRAMES
    - Python dtype: ADKeyframeGroup
- prev_m_models
    - 可选参数，用于整合先前生成的运动模型，促进顺序或分层动画。
    - Comfy dtype: M_MODELS
    - Python dtype: MotionModelGroup

## Output types
- m_models
    - Comfy dtype: M_MODELS
    - 应用AnimateDiff模型和摄像机控制后生成的运动模型，包括任何指定的动画和效果。
    - Python dtype: MotionModelGroup

## Usage tips
- Infra type: GPU
- Common nodes: unknown

## Source code
```python
class ApplyAnimateDiffWithCameraCtrl:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "motion_model": ("MOTION_MODEL_ADE",),
                "cameractrl_poses": ("CAMERACTRL_POSES",),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
            },
            "optional": {
                "motion_lora": ("MOTION_LORA",),
                "scale_multival": ("MULTIVAL",),
                "effect_multival": ("MULTIVAL",),
                "cameractrl_multival": ("MULTIVAL",),
                "ad_keyframes": ("AD_KEYFRAMES",),
                "prev_m_models": ("M_MODELS",),
            }
        }
    
    RETURN_TYPES = ("M_MODELS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl"
    FUNCTION = "apply_motion_model"

    def apply_motion_model(self, motion_model: MotionModelPatcher, cameractrl_poses: list[list[float]], start_percent: float=0.0, end_percent: float=1.0,
                           motion_lora: MotionLoraList=None, ad_keyframes: ADKeyframeGroup=None,
                           scale_multival=None, effect_multival=None, cameractrl_multival=None,
                           prev_m_models: MotionModelGroup=None,):
        new_m_models = ApplyAnimateDiffModelNode.apply_motion_model(self, motion_model, start_percent=start_percent, end_percent=end_percent,
                                                                    motion_lora=motion_lora, ad_keyframes=ad_keyframes,
                                                                    scale_multival=scale_multival, effect_multival=effect_multival, prev_m_models=prev_m_models)
        # most recent added model will always be first in list;
        curr_model = new_m_models[0].models[0]
        # confirm that model contains camera_encoder
        if curr_model.model.camera_encoder is None:
            raise Exception(f"Motion model '{curr_model.model.mm_info.mm_name}' does not contain a camera_encoder; cannot be used with Apply AnimateDiff-CameraCtrl Model node.")
        camera_entries = [CameraEntry(entry) for entry in cameractrl_poses]
        curr_model.orig_camera_entries = camera_entries
        curr_model.cameractrl_multival = cameractrl_multival
        return new_m_models