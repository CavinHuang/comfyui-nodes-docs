---
tags:
- AnimateDiff
- AnimateDiffContext
- Animation
---

# 🚫AnimateDiff Loader (Advanced) [DEPRECATED] 🎭🅐🅓
## Documentation
- Class name: `ADE_AnimateDiffLoaderV1Advanced`
- Category: ``
- Output node: `False`

This node facilitates the advanced loading of AnimateDiff models, specifically tailored for handling deprecated functionalities and legacy configurations. It abstractly supports the integration and utilization of older AnimateDiff models within current workflows, ensuring compatibility and access to historical model features.
## Input types
### Required
- **`model`**
    - Specifies the AnimateDiff model to be loaded, focusing on deprecated models for specific legacy applications.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`latents`**
    - Defines the latent configurations to be applied to the AnimateDiff model during loading, allowing for customization of the model's behavior.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`model_name`**
    - Identifies the specific name of the AnimateDiff model to be loaded, enabling precise selection of legacy models.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`unlimited_area_hack`**
    - A boolean flag that enables or disables the unlimited area hack, providing a workaround for specific loading scenarios.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`context_length`**
    - Specifies the length of the context to be used during model loading, affecting how the model processes input.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`context_stride`**
    - Determines the stride of the context, influencing the model's loading and processing efficiency.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`context_overlap`**
    - Defines the overlap between context segments during model loading, optimizing the model's understanding of sequential data.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`context_schedule`**
    - Selects the schedule for context application, allowing for flexible adaptation to various loading requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`closed_loop`**
    - A boolean parameter that indicates whether the model loading should operate in a closed loop, affecting the model's initialization process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`beta_schedule`**
    - Chooses the beta schedule to be used during model loading, impacting the model's adaptation and performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Outputs the loaded AnimateDiff model, ready for further processing or application.
    - Python dtype: `str`
- **`latent`**
    - Comfy dtype: `LATENT`
    - Provides the latent configurations applied during the model loading, reflecting the customization of the model's behavior.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnimateDiffLoaderAdvanced_Deprecated:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "latents": ("LATENT",),
                "model_name": (get_available_motion_models(),),
                "unlimited_area_hack": ("BOOLEAN", {"default": False},),
                "context_length": ("INT", {"default": 16, "min": 0, "max": 1000}),
                "context_stride": ("INT", {"default": 1, "min": 1, "max": 1000}),
                "context_overlap": ("INT", {"default": 4, "min": 0, "max": 1000}),
                "context_schedule": (ContextSchedules.LEGACY_UNIFORM_SCHEDULE_LIST,),
                "closed_loop": ("BOOLEAN", {"default": False},),
                "beta_schedule": (BetaSchedules.get_alias_list_with_first_element(BetaSchedules.SQRT_LINEAR),),
            },
        }

    RETURN_TYPES = ("MODEL", "LATENT")
    CATEGORY = ""
    FUNCTION = "load_mm_and_inject_params"

    def load_mm_and_inject_params(self,
            model: ModelPatcher,
            latents: Dict[str, torch.Tensor],
            model_name: str, unlimited_area_hack: bool,
            context_length: int, context_stride: int, context_overlap: int, context_schedule: str, closed_loop: bool,
            beta_schedule: str,
        ):
        # load motion module
        motion_model = load_motion_module_gen1(model_name, model)
        # get total frames
        init_frames_len = len(latents["samples"])  # deprecated - no longer used for anything lol
        # set injection params
        params = InjectionParams(
                unlimited_area_hack=unlimited_area_hack,
                apply_mm_groupnorm_hack=True,
                model_name=model_name,
                apply_v2_properly=False,
        )
        context_group = ContextOptionsGroup()
        context_group.add(
            ContextOptions(
                context_length=context_length,
                context_stride=context_stride,
                context_overlap=context_overlap,
                context_schedule=context_schedule,
                closed_loop=closed_loop,
                )
            )
        # set context settings
        params.set_context(context_options=context_group)
        # inject for use in sampling code
        model = ModelPatcherAndInjector.create_from(model, hooks_only=True)
        model.motion_models = MotionModelGroup(motion_model)
        model.motion_injection_params = params

        # save model sampling from BetaSchedule as object patch
        # if autoselect, get suggested beta_schedule from motion model
        if beta_schedule == BetaSchedules.AUTOSELECT and not model.motion_models.is_empty():
            beta_schedule = model.motion_models[0].model.get_best_beta_schedule(log=True)
        new_model_sampling = BetaSchedules.to_model_sampling(beta_schedule, model)
        if new_model_sampling is not None:
            model.add_object_patch("model_sampling", new_model_sampling)

        del motion_model
        return (model, latents)

```
