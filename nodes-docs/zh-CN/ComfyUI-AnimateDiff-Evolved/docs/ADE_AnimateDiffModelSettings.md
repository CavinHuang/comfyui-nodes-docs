# 🚫[DEPR] Motion Model Settings (Advanced) 🎭🅐🅓①
## Documentation
- Class name: ADE_AnimateDiffModelSettings
- Category: 
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在配置AnimateDiff过程中的运动模型设置，允许用户微调运动比例参数以实现所需的动画效果。

## Input types
### Required
- pe_strength
    - 决定位置编码调整的强度，影响动画的空间动态。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_strength
    - 控制注意力调整的强度，影响动画元素的焦点和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- other_strength
    - 调整其他模型参数的强度，提供动画效果的额外定制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- motion_pe_stretch
    - 指定位置编码的拉伸程度，改变运动的时间尺度。
    - Comfy dtype: INT
    - Python dtype: int
- cap_initial_pe_length
    - 限制初始位置编码长度，设定运动的起始尺度。
    - Comfy dtype: INT
    - Python dtype: int
- interpolate_pe_to_length
    - 定义位置编码插值的目标长度，影响动画的平滑度和流畅性。
    - Comfy dtype: INT
    - Python dtype: int
- initial_pe_idx_offset
    - 设置初始位置编码索引偏移，调整动画的起始点。
    - Comfy dtype: INT
    - Python dtype: int
- final_pe_idx_offset
    - 决定最终位置编码索引偏移，影响动画的终点。
    - Comfy dtype: INT
    - Python dtype: int

### Optional
- mask_motion_scale
    - 选择性地应用遮罩以缩放图像不同部分的运动，增强动画的真实性和复杂性。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- min_motion_scale
    - 设置运动的最小尺度，确保动画不会低于此阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_motion_scale
    - 定义运动的最大尺度，限制动画效果的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Output types
- ad_settings
    - Comfy dtype: AD_SETTINGS
    - 输出配置好的运动模型设置，包含对运动比例参数的调整。
    - Python dtype: AnimateDiffSettings

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class AnimateDiffModelSettingsAdvanced:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pe_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "attn_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "other_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "motion_pe_stretch": ("INT", {"default": 0, "min": 0, "step": 1}),
                "cap_initial_pe_length": ("INT", {"default": 0, "min": 0, "step": 1}),
                "interpolate_pe_to_length": ("INT", {"default": 0, "min": 0, "step": 1}),
                "initial_pe_idx_offset": ("INT", {"default": 0, "min": 0, "step": 1}),
                "final_pe_idx_offset": ("INT", {"default": 0, "min": 0, "step": 1}),
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

    def get_motion_model_settings(self, pe_strength: float, attn_strength: float, other_strength: float,
                                  motion_pe_stretch: int,
                                  cap_initial_pe_length: int, interpolate_pe_to_length: int,
                                  initial_pe_idx_offset: int, final_pe_idx_offset: int,
                                  mask_motion_scale: torch.Tensor=None, min_motion_scale: float=1.0, max_motion_scale: float=1.0):
        adjust_pe = AdjustGroup(AdjustPE(motion_pe_stretch=motion_pe_stretch,
                             cap_initial_pe_length=cap_initial_pe_length, interpolate_pe_to_length=interpolate_pe_to_length,
                             initial_pe_idx_offset=initial_pe_idx_offset, final_pe_idx_offset=final_pe_idx_offset))
        adjust_weight = AdjustGroup(AdjustWeight(
            pe_MULT=pe_strength,
            attn_MULT=attn_strength,
            other_MULT=other_strength,
        ))
        motion_model_settings = AnimateDiffSettings(
            adjust_pe=adjust_pe,
            adjust_weight=adjust_weight,
            mask_attn_scale=mask_motion_scale,
            mask_attn_scale_min=min_motion_scale,
            mask_attn_scale_max=max_motion_scale,
        )

        return (motion_model_settings,)