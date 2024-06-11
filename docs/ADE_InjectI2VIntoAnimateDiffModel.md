# 🧪Inject I2V into AnimateDiff Model 🎭🅐🅓②
## Documentation
- Class name: ADE_InjectI2VIntoAnimateDiffModel
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V/🧪experimental
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在将I2V（Image to Video）模型集成到AnimateDiff框架中，通过引入运动模型增强其功能。它作为桥梁，丰富AnimateDiff的动画过程，增加更多的运动动态，从而实现更复杂和细致的动画输出。

## Input types
### Required
- model_name
    - 指定要加载的运动模型的名称，在确定动画的运动动态方面起着至关重要的作用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- motion_model
    - 表示要注入到AnimateDiff模型中的运动模型对象，对于在动画过程中应用特定的运动动态至关重要。
    - Comfy dtype: MOTION_MODEL_ADE
    - Python dtype: MotionModelPatcher

### Optional
- ad_settings
    - AnimateDiff过程的可选设置，允许自定义动画的外观和行为。
    - Comfy dtype: AD_SETTINGS
    - Python dtype: AnimateDiffSettings

## Output types
- MOTION_MODEL
    - Comfy dtype: MOTION_MODEL_ADE
    - 注入了I2V功能的增强版AnimateDiff模型，准备好用于动画任务。
    - Python dtype: MotionModelPatcher

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class LoadAnimateDiffAndInjectI2VNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model_name": (get_available_motion_models(),),
                "motion_model": ("MOTION_MODEL_ADE",),
            },
            "optional": {
                "ad_settings": ("AD_SETTINGS",),
            }
        }
    
    RETURN_TYPES = ("MOTION_MODEL_ADE",)
    RETURN_NAMES = ("MOTION_MODEL",)

    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V/🧪experimental"
    FUNCTION = "load_motion_model"

    def load_motion_model(self, model_name: str, motion_model: MotionModelPatcher, ad_settings: AnimateDiffSettings=None):
        # make sure model w/ encoder actually has encoder
        if motion_model.model.img_encoder is None:
            raise Exception("Passed-in motion model was expected to have an img_encoder, but did not.")
        # load motion module and motion settings, if included
        loaded_motion_model = load_motion_module_gen2(model_name=model_name, motion_model_settings=ad_settings)
        inject_img_encoder_into_model(motion_model=loaded_motion_model, w_encoder=motion_model)
        return (loaded_motion_model,)