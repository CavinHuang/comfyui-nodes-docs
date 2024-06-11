# 🚫[DEPR] Motion Model Settings (Adv. Attn) 🎭🅐🅓①
## Documentation
- Class name: ADE_AnimateDiffModelSettingsAdvancedAttnStrengths
- Category: 
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在配置AnimateDiff模型设置中的高级注意力强度。它允许通过调整各种注意力组件的强度来微调模型的注意力机制，从而更详细地控制动画生成过程。

## Input types
### Required
- pe_strength
    - 指定位置编码调整的强度，影响模型的空间感知。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_strength
    - 定义注意力机制的整体强度，影响模型如何专注于输入的不同部分。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_q_strength
    - 调整注意力机制中查询组件的强度，微调模型的查询过程。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_k_strength
    - 修改注意力机制中键组件的强度，影响模型如何匹配查询和键。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_v_strength
    - 改变注意力机制中值组件的强度，影响基于匹配的查询和键的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_out_weight_strength
    - 控制注意力输出权重的强度，影响最终注意力输出的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_out_bias_strength
    - 调整注意力输出偏差的强度，微调应用于注意力输出的偏差。
    - Comfy dtype: FLOAT
    - Python dtype: float
- other_strength
    - 指定与注意力直接相关的其他模型调整的强度，提供对模型行为的更广泛控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- motion_pe_stretch
    - 定义运动中位置编码的拉伸因子，影响运动的空间表示。
    - Comfy dtype: INT
    - Python dtype: int
- cap_initial_pe_length
    - 限制初始位置编码的长度，限制动画开始时的空间范围。
    - Comfy dtype: INT
    - Python dtype: int
- interpolate_pe_to_length
    - 确定位置编码插值的长度，影响随时间的空间分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- initial_pe_idx_offset
    - 设置位置编码索引的初始偏移，调整起始的空间参考点。
    - Comfy dtype: INT
    - Python dtype: int
- final_pe_idx_offset
    - 设置位置编码索引的最终偏移，调整结束的空间参考点。
    - Comfy dtype: INT
    - Python dtype: int

### Optional
- mask_motion_scale
    - 可选张量用于选择性缩放运动，允许在动画中不同部分的运动缩放。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- min_motion_scale
    - 设置运动的最小缩放，确保运动强度的下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_motion_scale
    - 设置运动的最大缩放，确保运动强度的上限。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Output types
- ad_settings
    - Comfy dtype: AD_SETTINGS
    - 返回AnimateDiff模型的高级注意力强度设置，允许对动画生成过程进行精确控制。
    - Python dtype: AnimateDiffSettings

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class AnimateDiffModelSettingsAdvancedAttnStrengths:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pe_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "attn_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "attn_q_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "attn_k_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "attn_v_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "attn_out_weight_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
                "attn_out_bias_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.0001}),
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

    def get_motion_model_settings(self, pe_strength: float, attn_strength: float,
                                  attn_q_strength: float,
                                  attn_k_strength: float,
                                  attn_v_strength: float,
                                  attn_out_weight_strength: float,
                                  attn_out_bias_strength: float,
                                  other_strength: float,
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
            attn_q_MULT=attn_q_strength,
            attn_k_MULT=attn_k_strength,
            attn_v_MULT=attn_v_strength,
            attn_out_weight_MULT=attn_out_weight_strength,
            attn_out_bias_MULT=attn_out_bias_strength,
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