# Apply AnimateDiff Model 🎭🅐🅓②
## Documentation
- Class name: ADE_ApplyAnimateDiffModelSimple
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在应用运动模型以动画化图像或序列，提供一个简化的界面以集成运动效果。它抽象了动画过程中的复杂性，使用户能够轻松地将预定义的运动模型应用于其内容。

## Input types
### Required
- motion_model
    - 指定要应用的运动模型。它对于定义目标内容的动画行为和效果至关重要。
    - Comfy dtype: MOTION_MODEL_ADE
    - Python dtype: MotionModelPatcher

### Optional
- motion_lora
    - 可选参数，用于整合运动Lora调整，增强动画效果。
    - Comfy dtype: MOTION_LORA
    - Python dtype: MotionLoraList
- scale_multival
    - 可选参数，用于缩放效果，提供应用运动强度的灵活性。
    - Comfy dtype: MULTIVAL
    - Python dtype: Optional[MultiVal]
- effect_multival
    - 可选参数，用于效果调整，使运动的视觉影响自定义。
    - Comfy dtype: MULTIVAL
    - Python dtype: Optional[MultiVal]
- ad_keyframes
    - 可选参数，用于指定关键帧，允许更受控和精确的动画效果。
    - Comfy dtype: AD_KEYFRAMES
    - Python dtype: Optional[ADKeyframeGroup]

## Output types
- m_models
    - Comfy dtype: M_MODELS
    - 输出应用了指定运动效果、关键帧和调整后的运动模型。
    - Python dtype: MotionModelGroup

## Usage tips
- Infra type: GPU
- Common nodes: unknown

## Source code
```python
class ApplyAnimateDiffModelBasicNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "motion_model": ("MOTION_MODEL_ADE",),
            },
            "optional": {
                "motion_lora": ("MOTION_LORA",),
                "scale_multival": ("MULTIVAL",),
                "effect_multival": ("MULTIVAL",),
                "ad_keyframes": ("AD_KEYFRAMES",),
            }
        }
    
    RETURN_TYPES = ("M_MODELS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②"
    FUNCTION = "apply_motion_model"

    def apply_motion_model(self,
                           motion_model: MotionModelPatcher, motion_lora: MotionLoraList=None,
                           scale_multival=None, effect_multival=None, ad_keyframes=None):
        # just a subset of normal ApplyAnimateDiffModelNode inputs
        return ApplyAnimateDiffModelNode.apply_motion_model(self, motion_model, motion_lora=motion_lora,
                                                            scale_multival=scale_multival, effect_multival=effect_multival,
                                                            ad_keyframes=ad_keyframes)