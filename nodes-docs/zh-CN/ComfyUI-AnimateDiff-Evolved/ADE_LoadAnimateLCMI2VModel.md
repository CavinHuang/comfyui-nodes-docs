# Load AnimateLCM-I2V Model 🎭🅐🅓②
## Documentation
- Class name: ADE_LoadAnimateLCMI2VModel
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

ADE_LoadAnimateLCMI2VModel节点旨在加载和准备用于动画过程的AnimateLCM-I2V运动模型。它确保所选的运动模型与AnimateLCM-I2V格式兼容并具有图像编码器，从而促进将运动模型集成到动画工作流程中。

## Input types
### Required
- model_name
    - 指定要加载的运动模型的名称，确保该模型可用且与AnimateLCM-I2V格式兼容。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

### Optional
- ad_settings
    - Animate Diff过程的可选设置，可以应用于运动模型，允许自定义动画。
    - Comfy dtype: AD_SETTINGS
    - Python dtype: AnimateDiffSettings or None

## Output types
- MOTION_MODEL
    - Comfy dtype: MOTION_MODEL_ADE
    - 已加载的运动模型，准备用于动画过程。
    - Python dtype: MotionModelPatcher
- encoder_only
    - Comfy dtype: MOTION_MODEL_ADE
    - 仅包含编码器的运动模型版本，适用于特定的动画任务。
    - Python dtype: MotionModelPatcher

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class LoadAnimateLCMI2VModelNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model_name": (get_available_motion_models(),),
            },
            "optional": {
                "ad_settings": ("AD_SETTINGS",),
            }
        }
    
    RETURN_TYPES = ("MOTION_MODEL_ADE", "MOTION_MODEL_ADE")
    RETURN_NAMES = ("MOTION_MODEL", "encoder_only")
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V"
    FUNCTION = "load_motion_model"

    def load_motion_model(self, model_name: str, ad_settings: AnimateDiffSettings=None):
        # load motion module and motion settings, if included
        motion_model = load_motion_module_gen2(model_name=model_name, motion_model_settings=ad_settings)
        # make sure model is an AnimateLCM-I2V model
        if motion_model.model.mm_info.mm_format != AnimateDiffFormat.ANIMATELCM:
            raise Exception(f"Motion model '{motion_model.model.mm_info.mm_name}' is not an AnimateLCM-I2V model; selected model is not AnimateLCM, and does not contain an img_encoder.")
        if motion_model.model.img_encoder is None:
            raise Exception(f"Motion model '{motion_model.model.mm_info.mm_name}' is not an AnimateLCM-I2V model; selected model IS AnimateLCM, but does NOT contain an img_encoder.")
        # create encoder-only motion model
        encoder_only_motion_model = create_fresh_encoder_only_model(motion_model=motion_model)
        return (motion_model, encoder_only_motion_model)