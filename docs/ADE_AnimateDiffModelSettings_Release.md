# 🚫[DEPR] Motion Model Settings 🎭🅐🅓①
## Documentation
- Class name: ADE_AnimateDiffModelSettings_Release
- Category: 
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在配置AnimateDiff过程中的运动模型设置，重点是高级注意力强度调整。它旨在为用户提供微调通过AnimateDiff框架应用的动画效果的能力。

## Input types
### Required
- min_motion_scale
    - 指定运动的最小尺度，影响动画效果的细微程度或强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_motion_scale
    - 定义运动的最大尺度，影响可以应用于动画的运动强度范围。
    - Comfy dtype: FLOAT
    - Python dtype: float

### Optional
- mask_motion_scale
    - 一个遮罩张量，允许对输入的不同区域进行精细控制的运动缩放。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

## Output types
- ad_settings
    - Comfy dtype: AD_SETTINGS
    - 输出是AnimateDiff模型的配置集，包含对运动尺度和潜在其他参数的调整。
    - Python dtype: AnimateDiffSettings

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class AnimateDiffModelSettings:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "min_motion_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001}),
                "max_motion_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001}),
            },
            "optional": {
                "mask_motion_scale": ("MASK",),
            }
        }
    
    RETURN_TYPES = ("AD_SETTINGS",)
    CATEGORY = ""  #"Animate Diff 🎭🅐🅓/① Gen1 nodes ①/motion settings"
    FUNCTION = "get_motion_model_settings"

    def get_motion_model_settings(self, mask_motion_scale: torch.Tensor=None, min_motion_scale: float=1.0, max_motion_scale: float=1.0):
        motion_model_settings = AnimateDiffSettings(
            mask_attn_scale=mask_motion_scale,
            mask_attn_scale_min=min_motion_scale,
            mask_attn_scale_max=max_motion_scale,
            )

        return (motion_model_settings,)