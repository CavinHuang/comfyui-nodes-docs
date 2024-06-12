---
tags:
- AnimateDiff
- AnimateDiffContext
- Animation
---

# 🚫AnimateDiff Loader [DEPRECATED] 🎭🅐🅓
## Documentation
- Class name: `AnimateDiffLoaderV1`
- Category: ``
- Output node: `False`

This node is designed for the initialization and preparation of the AnimateDiff model, facilitating its readiness for animation generation tasks. It abstracts the complexities involved in loading the model, ensuring it is set up correctly for subsequent use.
## Input types
### Required
- **`model`**
    - This parameter is used to specify the AnimateDiff model to be loaded, enabling the node to correctly initialize and prepare the model for animation tasks.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`latents`**
    - This parameter allows for the specification of latent vectors that may be required for initializing the model, providing a way to customize the model's starting state.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`model_name`**
    - Used to select a specific motion model from available options, this parameter ensures the correct version of the AnimateDiff model is loaded based on the provided name.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`unlimited_area_hack`**
    - A boolean parameter that, when enabled, applies a specific hack to bypass limitations on the area that can be animated, offering more flexibility in animation tasks.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`beta_schedule`**
    - Specifies the beta schedule to be used during the model's operation, influencing the behavior and performance of the AnimateDiff model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - This output represents the loaded AnimateDiff model, ready for animation generation tasks.
    - Python dtype: `str`
- **`latent`**
    - Comfy dtype: `LATENT`
    - Outputs the latent vectors associated with the loaded model, which can be used for further customization or animation processes.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnimateDiffLoader_Deprecated:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "latents": ("LATENT",),
                "model_name": (get_available_motion_models(),),
                "unlimited_area_hack": ("BOOLEAN", {"default": False},),
                "beta_schedule": (BetaSchedules.get_alias_list_with_first_element(BetaSchedules.SQRT_LINEAR),),
            },
        }

    RETURN_TYPES = ("MODEL", "LATENT")
    CATEGORY = ""
    FUNCTION = "load_mm_and_inject_params"

    def load_mm_and_inject_params(
        self,
        model: ModelPatcher,
        latents: Dict[str, torch.Tensor],
        model_name: str, unlimited_area_hack: bool, beta_schedule: str,
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
