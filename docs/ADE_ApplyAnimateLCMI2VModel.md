# Apply AnimateLCM-I2V Model 🎭🅐🅓②
## Documentation
- Class name: ADE_ApplyAnimateLCMI2VModel
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在应用AnimateLCM-I2V模型，通过I2V（图像到视频）功能使用潜在代码运动推理来动画化图像。它集成了运动模型和关键帧组，从静态图像生成动态动画视觉效果，并根据指定参数增强其运动和效果。

## Input types
### Required
- motion_model
    - 运动模型参数对于定义将应用于静态图像的运动特性和动态至关重要。它影响节点的执行，通过确定将引入的动画和运动效果类型来发挥作用。
    - Comfy dtype: MOTION_MODEL_ADE
    - Python dtype: MotionModelPatcher
- ref_latent
    - 该参数保存要动画化的图像的参考潜在表示。它对于在应用运动效果时保持图像的原始特性至关重要。
    - Comfy dtype: LATENT
    - Python dtype: dict
- ref_drift
    - 指定在应用运动时偏离原始图像特性的程度，允许动画输出的微妙或显著变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- apply_ref_when_disabled
    - 确定即使在禁用运动模型时是否应用参考特性（如漂移），以确保动画过程的连续性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- start_percent
    - 定义动画在运动模型时间线中的起始点，允许精确控制动画效果的开始时间。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 设置动画在运动模型时间线中的结束点，允许自定义动画的持续时间和结尾。
    - Comfy dtype: FLOAT
    - Python dtype: float

### Optional
- motion_lora
    - 一组运动特定的LoRA设置，可以应用于进一步自定义动画效果和动态。
    - Comfy dtype: MOTION_LORA
    - Python dtype: MotionLoraList
- scale_multival
    - 缩放效果的乘数，提供对动画元素大小和比例的额外控制。
    - Comfy dtype: MULTIVAL
    - Python dtype: Optional[List[float]]
- effect_multival
    - 各种效果的乘数，提供进一步自定义动画视觉外观和动态的能力。
    - Comfy dtype: MULTIVAL
    - Python dtype: Optional[List[float]]
- ad_keyframes
    - 指定一个关键帧组以进行高级动画控制，允许详细自定义随时间变化的运动和效果。
    - Comfy dtype: AD_KEYFRAMES
    - Python dtype: ADKeyframeGroup
- prev_m_models
    - 先前应用的运动模型组，使节点能够基于现有动画进行构建或修改，以增强或改变效果。
    - Comfy dtype: M_MODELS
    - Python dtype: MotionModelGroup

## Output types
- m_models
    - Comfy dtype: M_MODELS
    - 更新的运动模型列表，包括最新应用的带有其配置动画和效果的模型。
    - Python dtype: MotionModelGroup

## Usage tips
- Infra type: GPU
- Common nodes: unknown

## Source code
```python
class ApplyAnimateLCMI2VModel:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "motion_model": ("MOTION_MODEL_ADE",),
                "ref_latent": ("LATENT",),
                "ref_drift": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 10.0, "step": 0.001}),
                "apply_ref_when_disabled": ("BOOLEAN", {"default": False}),
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
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/AnimateLCM-I2V"
    FUNCTION = "apply_motion_model"

    def apply_motion_model(self, motion_model: MotionModelPatcher, ref_latent: dict, ref_drift: float=0.0, apply_ref_when_disabled=False, start_percent: float=0.0, end_percent: float=1.0,
                           motion_lora: MotionLoraList=None, ad_keyframes: ADKeyframeGroup=None,
                           scale_multival=None, effect_multival=None,
                           prev_m_models: MotionModelGroup=None,):
        new_m_models = ApplyAnimateDiffModelNode.apply_motion_model(self, motion_model, start_percent=start_percent, end_percent=end_percent,
                                                                    motion_lora=motion_lora, ad_keyframes=ad_keyframes,
                                                                    scale_multival=scale_multival, effect_multival=effect_multival, prev_m_models=prev_m_models)
        # most recent added model will always be first in list;
        curr_model = new_m_models[0].models[0]
        # confirm that model contains img_encoder
        if curr_model.model.img_encoder is None:
            raise Exception(f"Motion model '{curr_model.model.mm_info.mm_name}' does not contain an img_encoder; cannot be used with Apply AnimateLCM-I2V Model node.")
        curr_model.orig_img_latents = ref_latent["samples"]
        curr_model.orig_ref_drift = ref_drift
        curr_model.orig_apply_ref_when_disabled = apply_ref_when_disabled
        return new_m_models