---
tags:
- AnimateDiff
- AnimateDiffContext
- Animation
---

# AnimateDiff Loader [Legacy] 🎭🅐🅓①
## Documentation
- Class name: `ADE_AnimateDiffLoaderWithContext`
- Category: `Animate Diff 🎭🅐🅓/① Gen1 nodes ①`
- Output node: `False`

This node is designed to load the AnimateDiff model along with a specific context, facilitating the integration of additional information or settings that influence the animation process. It serves as a bridge between the legacy AnimateDiff model and newer, context-aware functionalities, ensuring compatibility and enhanced control over the animation generation.
## Input types
### Required
- **`model`**
    - Specifies the AnimateDiff model to be loaded, serving as the core component for the animation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`model_name`**
    - Identifies the specific AnimateDiff model by name, allowing for precise selection within the available options.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`beta_schedule`**
    - Adjusts the beta schedule for the animation, influencing the diffusion process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`context_options`**
    - Provides context-specific options that modify how the AnimateDiff model processes animations, allowing for customized animation behaviors.
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Python dtype: `str`
- **`motion_lora`**
    - Specifies the LoRA parameters for motion, enhancing the model's ability to generate dynamic animations.
    - Comfy dtype: `MOTION_LORA`
    - Python dtype: `str`
- **`ad_settings`**
    - Defines the settings for AnimateDiff, tailoring the animation process to specific requirements.
    - Comfy dtype: `AD_SETTINGS`
    - Python dtype: `str`
- **`sample_settings`**
    - Determines the sampling settings for the animation, affecting the quality and characteristics of the generated animation.
    - Comfy dtype: `SAMPLE_SETTINGS`
    - Python dtype: `str`
- **`motion_scale`**
    - Controls the scale of motion in the animation, allowing for finer adjustment of movement intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `str`
- **`apply_v2_models_properly`**
    - Ensures that version 2 models are applied correctly, optimizing compatibility and performance.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `str`
- **`ad_keyframes`**
    - Specifies keyframes for the animation, guiding the AnimateDiff model in generating targeted animation sequences.
    - Comfy dtype: `AD_KEYFRAMES`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The loaded AnimateDiff model, ready for animation generation with the specified context and settings.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [FreeU_V2](../../Comfy/Nodes/FreeU_V2.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [LoraLoaderModelOnly](../../Comfy/Nodes/LoraLoaderModelOnly.md)
    - [LoraLoader](../../Comfy/Nodes/LoraLoader.md)
    - [ToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ToBasicPipe.md)
    - IPAdapterApply
    - DynamicThresholdingSimple
    - Reroute



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

```
