# 🚫AnimateDiff Loader (Advanced) [DEPRECATED] 🎭🅐🅓
## Documentation
- Class name: ADE_AnimateDiffLoaderV1Advanced
- Category: 
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在高级加载AnimateDiff模型，特别适用于处理弃用功能和遗留配置。它抽象地支持旧版AnimateDiff模型在当前工作流中的集成和利用，确保兼容性和对历史模型功能的访问。

# Input types
## Required
- model
    - 指定要加载的AnimateDiff模型，重点关注特定遗留应用的弃用模型。
    - Comfy dtype: MODEL
    - Python dtype: str
- latents
    - 定义在加载AnimateDiff模型期间应用的潜在配置，允许自定义模型的行为。
    - Comfy dtype: LATENT
    - Python dtype: str
- model_name
    - 确定要加载的特定AnimateDiff模型的名称，使得能够精确选择遗留模型。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- unlimited_area_hack
    - 一个布尔标志，用于启用或禁用无限区域黑客，提供特定加载场景的解决方法。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- context_length
    - 指定在模型加载期间使用的上下文长度，影响模型处理输入的方式。
    - Comfy dtype: INT
    - Python dtype: int
- context_stride
    - 确定上下文的步幅，影响模型的加载和处理效率。
    - Comfy dtype: INT
    - Python dtype: int
- context_overlap
    - 定义在模型加载期间上下文段之间的重叠，优化模型对序列数据的理解。
    - Comfy dtype: INT
    - Python dtype: int
- context_schedule
    - 选择上下文应用的计划，允许灵活适应各种加载需求。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- closed_loop
    - 一个布尔参数，指示模型加载是否应在闭环中操作，影响模型的初始化过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- beta_schedule
    - 选择在模型加载期间使用的beta计划，影响模型的适应性和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- model
    - 输出加载的AnimateDiff模型，准备进一步处理或应用。
    - Comfy dtype: MODEL
    - Python dtype: str
- latent
    - 提供在模型加载期间应用的潜在配置，反映模型行为的定制化。
    - Comfy dtype: LATENT
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
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

