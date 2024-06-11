# AnimateDiff Loader 🎭🅐🅓①
## Documentation
- Class name: `ADE_AnimateDiffLoaderGen1`
- Category: `Animate Diff 🎭🅐🅓/① Gen1 nodes ①`
- Output node: `False`
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git


ADE_AnimateDiffLoaderGen1 节点旨在加载和初始化第一代 AnimateDiff 模型，为后续的动画或图像处理任务奠定基础。它封装了模型加载和配置的复杂性，提供了一个简化的界面来生成动态内容。
## Input types
### Required
- **`model`**
    - 此输入指定要加载的 AnimateDiff 模型，是初始化动画或图像处理过程的核心。
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`model_name`**
    - model_name 参数允许按名称选择特定的 AnimateDiff 模型，从而实现更有针对性的初始化。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`beta_schedule`**
    - beta_schedule 参数决定了扩散过程中的 beta 值调度，影响生成内容的质量和特性。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`context_options`**
    - 提供额外的上下文或首选项设置以进行模型加载，允许自定义初始化。
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Python dtype: `str`
- **`motion_lora`**
    - 指定运动模型的 LoRA 参数，允许对动画动态进行微调控制。
    - Comfy dtype: `MOTION_LORA`
    - Python dtype: `str`
- **`ad_settings`**
    - 自定义 AnimateDiff 模型在加载过程中的行为的动画和扩散设置。
    - Comfy dtype: `AD_SETTINGS`
    - Python dtype: `str`
- **`ad_keyframes`**
    - 定义动画的关键帧，指导模型在指定的时间间隔内生成动态内容。
    - Comfy dtype: `AD_KEYFRAMES`
    - Python dtype: `str`
- **`sample_settings`**
    - 影响采样过程的设置，例如温度和 top-k 筛选，以优化生成输出。
    - Comfy dtype: `SAMPLE_SETTINGS`
    - Python dtype: `str`
- **`scale_multival`**
    - 用于缩放生成内容中特定效果的强度的乘数。
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `str`
- **`effect_multival`**
    - 用于调整生成内容中特定效果强度的乘数，提供对输出的创意控制。
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - 这是加载的 AnimateDiff 模型，准备用于动画或图像处理任务。
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
<!-- - Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md) -->

## Source code
```python
class AnimateDiffLoaderGen1:
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
                "ad_keyframes": ("AD_KEYFRAMES",),
                "sample_settings": ("SAMPLE_SETTINGS",),
                "scale_multival": ("MULTIVAL",),
                "effect_multival": ("MULTIVAL",),
            }
        }

    RETURN_TYPES = ("MODEL",)
    CATEGORY = "Animate Diff 🎭🅐🅓/① Gen1 nodes ①"
    FUNCTION = "load_mm_and_inject_params"

    def load_mm_and_inject_params(self,
        model: ModelPatcher,
        model_name: str, beta_schedule: str,# apply_mm_groupnorm_hack: bool,
        context_options: ContextOptionsGroup=None, motion_lora: MotionLoraList=None, ad_settings: AnimateDiffSettings=None,
        sample_settings: SampleSettings=None, scale_multival=None, effect_multival=None, ad_keyframes: ADKeyframeGroup=None,
    ):
        # load motion module and motion settings, if included
        motion_model = load_motion_module_gen2(model_name=model_name, motion_model_settings=ad_settings)
        # confirm that it is compatible with SD model
        validate_model_compatibility_gen2(model=model, motion_model=motion_model)
        # apply motion model to loaded_mm
        if motion_lora is not None:
            for lora in motion_lora.loras:
                load_motion_lora_as_patches(motion_model, lora)
        motion_model.scale_multival = scale_multival
        motion_model.effect_multival = effect_multival
        motion_model.keyframes = ad_keyframes.clone() if ad_keyframes else ADKeyframeGroup()

        # create injection params
        params = InjectionParams(unlimited_area_hack=False, model_name=motion_model.model.mm_info.mm_name)
        # apply context options
        if context_options:
            params.set_context(context_options)

        # set motion_scale and motion_model_settings
        if not ad_settings:
            ad_settings = AnimateDiffSettings()
        ad_settings.attn_scale = 1.0
        params.set_motion_model_settings(ad_settings)

        # backwards compatibility to support old way of masking scale
        if params.motion_model_settings.mask_attn_scale is not None:
            motion_model.scale_multival = get_combined_multival(scale_multival, (params.motion_model_settings.mask_attn_scale * params.motion_model_settings.attn_scale))

        # need to use a ModelPatcher that supports injection of motion modules into unet
        model = ModelPatcherAndInjector.create_from(model, hooks_only=True)
        model.motion_models = MotionModelGroup(motion_model)
        model.sample_settings = sample_settings if sample_settings is not None else SampleSettings()
        model.motion_injection_params = params

        if model.sample_settings.custom_cfg is not None:
            logger.info("[Sample Settings] custom_cfg is set; will override any KSampler cfg values or patches.")

        if model.sample_settings.sigma_schedule is not None:
            logger.info("[Sample Settings] sigma_schedule is set; will override beta_schedule.")
            model.add_object_patch("model_sampling", model.sample_settings.sigma_schedule.clone().model_sampling)
        else:
            # save model sampling from BetaSchedule as object patch
            # if autoselect, get suggested beta_schedule from motion model
            if beta_schedule == BetaSchedules.AUTOSELECT and not model.motion_models.is_empty():
                beta_schedule = model.motion_models[0].model.get_best_beta_schedule(log=True)
            new_model_sampling = BetaSchedules.to_model_sampling(beta_schedule, model)
            if new_model_sampling is not None:
                model.add_object_patch("model_sampling", new_model_sampling)

        del motion_model
        return (model,)

