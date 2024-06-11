# Load AnimateDiff Model 🎭🅐🅓②
## Documentation
- Class name: ADE_LoadAnimateDiffModel
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在加载AnimateDiff模型，便于在AnimateDiff框架内集成和应用运动模型以实现动画目的。它作为动画管道中的基础组件，使用户能够利用高级动画技术。

## Input types
### Required
- model_name
    - 指定要加载的运动模型的名称。这是一个关键输入，因为它决定了在AnimateDiff框架内将使用哪个运动模型进行动画。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

### Optional
- ad_settings
    - 可选参数，允许包括特定的动画设置，提供对动画过程的额外定制和控制。
    - Comfy dtype: AD_SETTINGS
    - Python dtype: AnimateDiffSettings

## Output types
- MOTION_MODEL
    - Comfy dtype: MOTION_MODEL_ADE
    - 输出已加载的运动模型，准备在动画管道中进一步处理和应用。
    - Python dtype: MotionModelPatcher

## Usage tips
- Infra type: GPU
<!-- - Common nodes:
    - [ADE_ApplyAnimateDiffModel](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_ApplyAnimateDiffModel.md) -->

## Source code
```python
class LoadAnimateDiffModelNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model_name": (get_available_motion_models(),),
            },
            "optional": {
                "ad_settings": ("AD_SETTINGS",),
            }
        }

    RETURN_TYPES = ("MOTION_MODEL_ADE",)
    RETURN_NAMES = ("MOTION_MODEL",)
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②"
    FUNCTION = "load_motion_model"

    def load_motion_model(self, model_name: str, ad_settings: AnimateDiffSettings=None):
        # load motion module and motion settings, if included
        motion_model = load_motion_module_gen2(model_name=model_name, motion_model_settings=ad_settings)
        return (motion_model,)