# AnimateDiff Unload 🎭🅐🅓
## Documentation
- Class name: ADE_AnimateDiffUnload
- Category: Animate Diff 🎭🅐🅓/extras
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在从内存中卸载或释放与AnimateDiff模型相关的资源，确保有效的资源管理并为后续任务释放内存。

## Input types
### Required
- model
    - 指定要卸载的AnimateDiff模型，允许释放其资源。
    - Comfy dtype: MODEL
    - Python dtype: AnimateDiffModel

## Output types
- model
    - Comfy dtype: MODEL
    - 确认指定的AnimateDiff模型已成功卸载，确保其资源已释放。
    - Python dtype: NoneType

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class AnimateDiffUnload:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"model": ("MODEL",)}}

    RETURN_TYPES = ("MODEL",)
    CATEGORY = "Animate Diff 🎭🅐🅓/extras"
    FUNCTION = "unload_motion_modules"

    def unload_motion_modules(self, model: ModelPatcher):
        # return model clone with ejected params
        #model = eject_params_from_model(model)
        model = get_vanilla_model_patcher(model)
        return (model.clone(),)