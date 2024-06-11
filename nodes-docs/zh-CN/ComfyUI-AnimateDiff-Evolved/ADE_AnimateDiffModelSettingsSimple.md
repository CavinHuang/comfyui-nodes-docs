# 🚫[DEPR] Motion Model Settings (Simple) 🎭🅐🅓①
## Documentation
- Class name: ADE_AnimateDiffModelSettingsSimple
- Category: 
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在为AnimateDiff框架中的简单场景配置运动模型设置。它允许调整运动比例参数并应用可选的遮罩，以微调动画过程。

## Input types
### Required
- motion_pe_stretch
    - 定义运动模型中位置编码的拉伸因子，影响应用的运动的规模和强度。
    - Comfy dtype: INT
    - Python dtype: int

### Optional
- mask_motion_scale
    - 可选的遮罩张量，用于选择性地缩放不同区域，增强对运动效果的控制。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- min_motion_scale
    - 设置运动的最小比例，提供运动强度的基线。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_motion_scale
    - 确定运动的最大比例，限制运动效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Output types
- ad_settings
    - Comfy dtype: AD_SETTINGS
    - 输出配置好的运动模型设置，包含对运动比例和可选遮罩的调整。
    - Python dtype: AnimateDiffSettings

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class AnimateDiffModelSettingsSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "motion_pe_stretch": ("INT", {"default": 0, "min": 0, "step": 1}),
            },
            "optional": {
                "mask_motion_scale": ("MASK",),
                "min_motion_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001}),
                "max_motion_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "step": 0.001}),
            }
        }
    
    RETURN_TYPES = ("AD_SETTINGS",)
    CATEGORY = ""  #"Animate Diff 🎭🅐🅓/① Gen1 nodes ①/motion settings/experimental"
    FUNCTION = "get_motion_model_settings"

    def get_motion_model_settings(self, motion_pe_stretch: int,
                                  mask_motion_scale: torch.Tensor=None, min_motion_scale: float=1.0, max_motion_scale: float=1.0):
        adjust_pe = AdjustGroup(AdjustPE(motion_pe_stretch=motion_pe_stretch))
        motion_model_settings = AnimateDiffSettings(
            adjust_pe=adjust_pe,
            mask_attn_scale=mask_motion_scale,
            mask_attn_scale_min=min_motion_scale,
            mask_attn_scale_max=max_motion_scale,
            )

        return (motion_model_settings,)