---

tags:
- AnimateDiff
- AnimateDiffContext
- Animation

---

# AnimateDiff Loader [Legacy] 🎭🅐🅓①
## Documentation
- Class name: ADE_AnimateDiffLoaderWithContext
- Category: Animate Diff 🎭🅐🅓/① Gen1 nodes ①
- Output node: False

此节点旨在加载AnimateDiff模型及其特定上下文，有助于集成影响动画过程的额外信息或设置。它在传统AnimateDiff模型与更新的、上下文感知的功能之间架起桥梁，确保兼容性并增强对动画生成的控制。

## Input types
### Required
- model
    - 指定要加载的AnimateDiff模型，作为动画过程的核心组件。
    - Comfy dtype: MODEL
    - Python dtype: str
- model_name
    - 通过名称识别特定的AnimateDiff模型，允许在可用选项中进行精确选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- beta_schedule
    - 调整动画的beta进度，影响扩散过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

### Optional
- context_options
    - 提供上下文特定选项以修改AnimateDiff模型处理动画的方式，允许定制动画行为。
    - Comfy dtype: CONTEXT_OPTIONS
    - Python dtype: str
- motion_lora
    - 指定运动的LoRA参数，增强模型生成动态动画的能力。
    - Comfy dtype: MOTION_LORA
    - Python dtype: str
- ad_settings
    - 定义AnimateDiff的设置，调整动画过程以满足特定要求。
    - Comfy dtype: AD_SETTINGS
    - Python dtype: str
- sample_settings
    - 确定动画的采样设置，影响生成动画的质量和特征。
    - Comfy dtype: SAMPLE_SETTINGS
    - Python dtype: str
- motion_scale
    - 控制动画中的运动规模，允许更精细地调整运动强度。
    - Comfy dtype: FLOAT
    - Python dtype: str
- apply_v2_models_properly
    - 确保正确应用版本2模型，优化兼容性和性能。
    - Comfy dtype: BOOLEAN
    - Python dtype: str
- ad_keyframes
    - 指定动画的关键帧，引导AnimateDiff模型生成目标动画序列。
    - Comfy dtype: AD_KEYFRAMES
    - Python dtype: str

## Output types
- model
    - Comfy dtype: MODEL
    - 加载的AnimateDiff模型，准备好生成具有指定上下文和设置的动画。
    - Python dtype: str

## Usage tips
- Infra type: CPU
<!-- - Common nodes:
    - [KSampler](./KSampler.md)
    - [FreeU_V2](./FreeU_V2.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [LoraLoaderModelOnly](../../Comfy/Nodes/LoraLoaderModelOnly.md)
    - [LoraLoader](../../Comfy/Nodes/LoraLoader.md)
    - [ToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ToBasicPipe.md)
    - IPAdapterApply
    - DynamicThresholdingSimple
    - Reroute -->

## Source code
```python
class LegacyAnimateDiffLoaderWithContext:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "model_name": (get_available_motion_models(),),
                "beta_schedule": (BetaSchedules.ALIAS_LIST, {"default": BetaSchedules.AUTOSELECT}),
                #"apply_mm_groupnorm_hack": ("BOOLEAN", {"default": True}),
            },
            "optional": {
                "context_options": ("CONTEXT_OPTIONS",),
                "motion_lora": ("MOTION_LORA",),
                "ad_settings": ("AD_SETTINGS",),
                "sample_settings": ("SAMPLE_SETTINGS",),
                "motion_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001}),
                "apply_v2_models_properly": ("BOOLEAN", {"default": True}),
                "ad_keyframes": ("AD_KEYFRAMES",),
            }
        }
    
    RETURN_TYPES = ("MODEL",)
    CATEGORY = "Animate Diff 🎭🅐🅓/① Gen1 nodes ①"
    FUNCTION = "load_mm_and_inject_params"


    def load_mm_and_inject_params(self,
        model: ModelPatcher,
        model_name: str, beta_schedule: str,# apply_mm_groupnorm_hack: bool,
        context_options: ContextOptionsGroup=None, motion_lora: MotionLoraList=None, ad_settings: AnimateDiffSettings=None, motion_model_settings: AnimateDiffSettings=None,
        sample_settings: SampleSettings=None, motion_scale: float=1.0, apply_v2_models_properly: bool=False, ad_keyframes: ADKeyframeGroup=None,
    ):
        if ad_settings is not None:
            motion_model_settings = ad_settings
        # load motion module
        motion_model = load_motion_module_gen1(model_name, model, motion_lora=motion_lora, motion_model_settings=motion_model_settings)
        # set injection params
        params = InjectionParams(
                unlimited_area_hack=False,
                model_name=model_name,
                apply_v2_properly=apply_v2_models_properly,
        )
        if context_options:
            params.set_context(context_options)
        # set motion_scale and motion_model_settings
        if not motion_model_settings:
            motion_model_settings = AnimateDiffSettings()
        motion_model_settings.attn_scale = motion_scale
        params.set_motion_model_settings(motion_model_settings)

        if params.motion_model_settings.mask_attn_scale is not None:
            motion_model.scale_multival = params.motion_model_settings.mask_attn_scale * params.motion_model_settings.attn_scale
        else:
            motion_model.scale_multival = params.motion_model_settings.attn_scale

        motion_model.keyframes = ad_keyframes.clone() if ad_keyframes else ADKeyframeGroup()

        model = ModelPatcherAndInjector.create_from(model, hooks_only=True)
        model.motion_models = MotionModelGroup(motion_model)
        model.sample_settings = sample_settings if sample_settings is not None else SampleSettings()
        model.motion_injection_params = params

        # save model sampling from BetaSchedule as object patch
        # if autoselect, get suggested beta_schedule from motion model
        if beta_schedule == BetaSchedules.AUTOSELECT and not model.motion_models.is_empty():
            beta_schedule = model.motion_models[0].model.get_best_beta_schedule(log=True)
        new_model_sampling = BetaSchedules.to_model_sampling(beta_schedule, model)
        if new_model_sampling is not None:
            model.add_object_patch("model_sampling", new_model_sampling)

        del motion_model
        return (model,)