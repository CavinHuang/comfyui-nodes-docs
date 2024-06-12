# Load AnimateDiff+CameraCtrl Model 🎭🅐🅓②
## Documentation
- Class name: ADE_LoadAnimateDiffModelWithCameraCtrl
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在加载具有集成摄像机控制功能的AnimateDiff模型，使得可以直接在AnimateDiff框架内应用摄像机运动和调整。它有助于将动态摄像机控制参数整合到AnimateDiff模型中，从而增强动画过程并实现更复杂的视觉效果。

## Input types
### Required
- model_name
    - 指定要加载的运动模型的名称。它对于识别将添加摄像机控制功能的特定AnimateDiff模型至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- camera_ctrl
    - 定义要注入到AnimateDiff模型中的摄像机控制参数。此输入对于定制动画中的摄像机运动和效果至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

### Optional
- ad_settings
    - AnimateDiff模型的可选设置，允许进一步定制动画过程。
    - Comfy dtype: AD_SETTINGS
    - Python dtype: dict

## Output types
- MOTION_MODEL
    - Comfy dtype: MOTION_MODEL_ADE
    - 集成了摄像机控制功能的修改后的AnimateDiff模型，准备用于动画任务。
    - Python dtype: MotionModel

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class LoadAnimateDiffModelWithCameraCtrl:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model_name": (get_available_motion_models(),),
                "camera_ctrl": (get_available_motion_models(),),
            },
            "optional": {
                "ad_settings": ("AD_SETTINGS",),
            }
        }

    RETURN_TYPES = ("MOTION_MODEL_ADE",)
    RETURN_NAMES = ("MOTION_MODEL",)
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl"
    FUNCTION = "load_camera_ctrl"

    def load_camera_ctrl(self, model_name: str, camera_ctrl: str, ad_settings: AnimateDiffSettings=None):
        loaded_motion_model = load_motion_module_gen2(model_name=model_name, motion_model_settings=ad_settings)
        inject_camera_encoder_into_model(motion_model=loaded_motion_model, camera_ctrl_name=camera_ctrl)
        return (loaded_motion_model,)