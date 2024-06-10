---
tags:
- AnimateDiff
- Animation
---

# Use Evolved Sampling 🎭🅐🅓②
## Documentation
- Class name: `ADE_UseEvolvedSampling`
- Category: `Animate Diff 🎭🅐🅓/② Gen2 nodes ②`
- Output node: `False`

The ADE_UseEvolvedSampling node integrates advanced sampling techniques into the animation diffusion process, leveraging evolved model sampling configurations to enhance the quality and efficiency of generated animations. It adapts the sampling process based on model configurations and dynamic conditions, aiming to optimize the animation output with respect to visual fidelity and computational performance.
## Input types
### Required
- **`model`**
    - Specifies the model to be used in the animation diffusion process, affecting the overall quality and characteristics of the generated animations.
    - Comfy dtype: `MODEL`
    - Python dtype: `Model`
- **`beta_schedule`**
    - Determines the beta schedule to be applied during the sampling process, influencing the smoothness and quality of the animation transitions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `BetaSchedules.ALIAS_LIST`
### Optional
- **`m_models`**
    - Optional. Provides additional models for consideration in the animation process, potentially enhancing the diversity and richness of the output.
    - Comfy dtype: `M_MODELS`
    - Python dtype: `list`
- **`context_options`**
    - Optional. Defines context-specific options that can modify the behavior of the sampling process, tailoring it to specific requirements or preferences.
    - Comfy dtype: `CONTEXT_OPTIONS`
    - Python dtype: `dict`
- **`sample_settings`**
    - Optional. Specifies settings related to the sampling process, such as resolution and temporal adjustments, directly impacting the animation's visual quality.
    - Comfy dtype: `SAMPLE_SETTINGS`
    - Python dtype: `dict`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The enhanced model instance, equipped with evolved sampling configurations for improved animation diffusion.
    - Python dtype: `Model`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [ToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ToBasicPipe.md)
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)
    - [LCMScheduler](../../ComfyUI-sampler-lcm-alternative/Nodes/LCMScheduler.md)



## Source code
```python
class UseEvolvedSamplingNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "beta_schedule": (BetaSchedules.ALIAS_LIST, {"default": BetaSchedules.AUTOSELECT}),
            },
            "optional": {
                "m_models": ("M_MODELS",),
                "context_options": ("CONTEXT_OPTIONS",),
                "sample_settings": ("SAMPLE_SETTINGS",),
                #"beta_schedule_override": ("BETA_SCHEDULE",),
            }
        }
    
    RETURN_TYPES = ("MODEL",)
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②"
    FUNCTION = "use_evolved_sampling"

    def use_evolved_sampling(self, model: ModelPatcher, beta_schedule: str, m_models: MotionModelGroup=None, context_options: ContextOptionsGroup=None,
                             sample_settings: SampleSettings=None, beta_schedule_override=None):
        if m_models is not None:
            m_models = m_models.clone()
            # for each motion model, confirm that it is compatible with SD model
            for motion_model in m_models.models:
                validate_model_compatibility_gen2(model=model, motion_model=motion_model)
            # create injection params
            model_name_list = [motion_model.model.mm_info.mm_name for motion_model in m_models.models]
            model_names = ",".join(model_name_list)
            # TODO: check if any apply_v2_properly is set to False
            params = InjectionParams(unlimited_area_hack=False, model_name=model_names)
        else:
            params = InjectionParams()
        # apply context options
        if context_options:
            params.set_context(context_options)
        # need to use a ModelPatcher that supports injection of motion modules into unet
        model = ModelPatcherAndInjector.create_from(model, hooks_only=True)
        model.motion_models = m_models
        model.sample_settings = sample_settings if sample_settings is not None else SampleSettings()
        model.motion_injection_params = params

        if model.sample_settings.custom_cfg is not None:
            logger.info("[Sample Settings] custom_cfg is set; will override any KSampler cfg values or patches.")

        if model.sample_settings.sigma_schedule is not None:
            logger.info("[Sample Settings] sigma_schedule is set; will override beta_schedule.")
            model.add_object_patch("model_sampling", model.sample_settings.sigma_schedule.clone().model_sampling)
        else:
            # save model_sampling from BetaSchedule as object patch
            # if autoselect, get suggested beta_schedule from motion model
            if beta_schedule == BetaSchedules.AUTOSELECT:
                if model.motion_models is None or model.motion_models.is_empty():
                    beta_schedule = BetaSchedules.USE_EXISTING
                else:
                    beta_schedule = model.motion_models[0].model.get_best_beta_schedule(log=True)
            new_model_sampling = BetaSchedules.to_model_sampling(beta_schedule, model)
            if new_model_sampling is not None:
                model.add_object_patch("model_sampling", new_model_sampling)
        
        del m_models
        return (model,)

```
