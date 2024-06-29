# Apply AnimateDiff Model (Adv.) 🎭🅐🅓②
## Documentation
- Class name: ADE_ApplyAnimateDiffModel
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

ADE_ApplyAnimateDiffModel节点旨在应用高级AnimateDiff模型配置以生成图像中的运动。它利用一套全面的参数来微调动画过程，适应各种运动效果和风格。

## Input types
### Required
- motion_model
    - 指定用于动画的运动模型。它对于定义动画的行为和特性至关重要。
    - Comfy dtype: MOTION_MODEL_ADE
    - Python dtype: MotionModelPatcher
- start_percent
    - 定义动画效果的起始百分比，标记运动应用的开始。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 指定动画效果的结束百分比，确定运动停止的点。
    - Comfy dtype: FLOAT
    - Python dtype: float

### Optional
- motion_lora
    - 可选参数，允许使用LoRA（低秩适应）技术调整运动，增强动画质量。
    - Comfy dtype: MOTION_LORA
    - Python dtype: MotionLoraList
- scale_multival
    - 可选参数，影响动画效果的规模，允许微调动画的强度。
    - Comfy dtype: MULTIVAL
    - Python dtype: float
- effect_multival
    - 可选参数，调整动画的整体效果，允许自定义视觉结果。
    - Comfy dtype: MULTIVAL
    - Python dtype: float
- ad_keyframes
    - 可选参数，指定动画的关键帧，允许精确控制运动的时间和序列。
    - Comfy dtype: AD_KEYFRAMES
    - Python dtype: ADKeyframeGroup
- prev_m_models
    - 可选参数，包括要在当前动画过程中考虑的先前运动模型，允许累积效果。
    - Comfy dtype: M_MODELS
    - Python dtype: M_MODELS

## Output types
- m_models
    - Comfy dtype: M_MODELS
    - 输出动画过程中使用的运动模型，包含所有调整和配置。
    - Python dtype: M_MODELS

## Usage tips
- Infra type: GPU
<!-- - Common nodes:
    - [ADE_UseEvolvedSampling](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_UseEvolvedSampling.md) -->

## Source code
```python
class ApplyAnimateDiffModelNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "motion_model": ("MOTION_MODEL_ADE",),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
            },
            "optional": {
                "motion_lora": ("MOTION_LORA",),
                "scale_multival": ("MULTIVAL",),
                "effect_multival": ("MULTIVAL",),
                "ad_keyframes": ("AD_KEYFRAMES",),
                "prev_m_models": ("M_MODELS",),
            }
        }

    RETURN_TYPES = ("M_MODELS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②"
    FUNCTION = "apply_motion_model"

    def apply_motion_model(self, motion_model: MotionModelPatcher, start_percent: float=0.0, end_percent: float=1.0,
                           motion_lora: MotionLoraList=None, ad_keyframes: ADKeyframeGroup=None,
                           scale_multival=None, effect_multival=None,
                           prev_m_models: MotionModelGroup=None,):
        # set up motion models list
        if prev_m_models is None:
            prev_m_models = MotionModelGroup()
        prev_m_models = prev_m_models.clone()
        motion_model = motion_model.clone()
        # check if internal motion model already present in previous model - create new if so
        for prev_model in prev_m_models.models:
            if motion_model.model is prev_model.model:
                # need to create new internal model based on same state_dict
                motion_model = create_fresh_motion_module(motion_model)
        # apply motion model to loaded_mm
        if motion_lora is not None:
            for lora in motion_lora.loras:
                load_motion_lora_as_patches(motion_model, lora)
        motion_model.scale_multival = scale_multival
        motion_model.effect_multival = effect_multival
        motion_model.keyframes = ad_keyframes.clone() if ad_keyframes else ADKeyframeGroup()
        motion_model.timestep_percent_range = (start_percent, end_percent)
        # add to beginning, so that after injection, it will be the earliest of prev_m_models to be run
        prev_m_models.add_to_start(mm=motion_model)
        return (prev_m_models,)