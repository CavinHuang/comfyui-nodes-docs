---
tags:
- AnimateDiff
- AnimateDiffContext
- Animation
---

# AnimateDiff Loader 🎭🅐🅓①
## Documentation
- Class name: `ADE_AnimateDiffLoaderGen1`
- Category: `Animate Diff 🎭🅐🅓/① Gen1 nodes ①`
- Output node: `False`

The ADE_AnimateDiffLoaderGen1 node is designed to load and initialize the first generation of AnimateDiff models, setting the stage for subsequent animation or image manipulation tasks. It encapsulates the complexities of model loading and configuration, providing a streamlined interface for the generation of dynamic content.
## Input types
### Required
- **`model`**
    - This input specifies the AnimateDiff model to be loaded, central to initializing the animation or image manipulation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`model_name`**
    - The model_name parameter allows for the selection of a specific AnimateDiff model by name, facilitating a more targeted initialization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`beta_schedule`**
    - The beta_schedule parameter determines the scheduling of beta values used in the diffusion process, impacting the quality and characteristics of the generated content.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`context_options`**
    - Optional settings that provide additional context or preferences for the model loading process, allowing for customized initialization.
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Python dtype: `str`
- **`motion_lora`**
    - Specifies the LoRA parameters for motion models, enabling fine-tuned control over the animation dynamics.
    - Comfy dtype: `MOTION_LORA`
    - Python dtype: `str`
- **`ad_settings`**
    - Animation and diffusion settings that customize the behavior of the AnimateDiff model during the loading process.
    - Comfy dtype: `AD_SETTINGS`
    - Python dtype: `str`
- **`ad_keyframes`**
    - Defines keyframes for animation, guiding the model in generating dynamic content over specified intervals.
    - Comfy dtype: `AD_KEYFRAMES`
    - Python dtype: `str`
- **`sample_settings`**
    - Settings that influence the sampling process, such as temperature and top-k filtering, to refine the generated output.
    - Comfy dtype: `SAMPLE_SETTINGS`
    - Python dtype: `str`
- **`scale_multival`**
    - Multipliers for scaling the effects in the generated content, allowing for varied intensities of certain features.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `str`
- **`effect_multival`**
    - Multipliers for adjusting the intensity of specific effects within the generated content, providing creative control over the output.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - This output is the loaded AnimateDiff model, ready for use in animation or image manipulation tasks.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)



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

```
