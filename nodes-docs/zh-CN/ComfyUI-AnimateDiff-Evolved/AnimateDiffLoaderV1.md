# 🚫AnimateDiff Loader [DEPRECATED] 🎭🅐🅓
## Documentation
- Class name: AnimateDiffLoaderV1
- Category: 
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点用于初始化和准备AnimateDiff模型，便于其进行动画生成任务。它抽象了加载模型的复杂性，确保其正确设置以供后续使用。

## Input types
### Required
- model
    - 该参数用于指定要加载的AnimateDiff模型，使节点能够正确初始化和准备模型以进行动画任务。
    - Comfy dtype: MODEL
    - Python dtype: str
- latents
    - 该参数允许指定初始化模型可能需要的潜在向量，提供一种自定义模型初始状态的方法。
    - Comfy dtype: LATENT
    - Python dtype: str
- model_name
    - 用于从可用选项中选择特定运动模型，该参数确保根据提供的名称加载正确版本的AnimateDiff模型。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- unlimited_area_hack
    - 一个布尔参数，启用时应用特定的黑客技术以绕过可动画区域的限制，为动画任务提供更多灵活性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- beta_schedule
    - 指定在模型操作期间使用的beta计划，影响AnimateDiff模型的行为和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Output types
- model
    - Comfy dtype: MODEL
    - 表示已加载的AnimateDiff模型，准备进行动画生成任务。
    - Python dtype: str
- latent
    - Comfy dtype: LATENT
    - 输出与已加载模型相关的潜在向量，可用于进一步的自定义或动画过程。
    - Python dtype: str

## Usage tips
- Infra type: CPU
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