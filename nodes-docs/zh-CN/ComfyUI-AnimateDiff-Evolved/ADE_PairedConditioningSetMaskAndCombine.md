# Set Props and Combine Conds 🎭🅐🅓
## Documentation
- Class name: ADE_PairedConditioningSetMaskAndCombine
- Category: Animate Diff 🎭🅐🅓/conditioning
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点专门用于生成模型的成对条件数据的高级操作，特别关注掩码和附加条件层的应用和组合。它通过应用掩码、强度调整和整合新的条件元素来增强或修改现有条件，从而更精确地控制生成过程。

## Input types
### Required
- positive
    - 要增强或修改的原始正向条件数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - 要增强或修改的原始负向条件数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- positive_ADD
    - 要与原始条件结合的附加正向条件数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative_ADD
    - 要与原始条件结合的附加负向条件数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- strength
    - 定义掩码或条件修改强度的参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- set_cond_area
    - 指定掩码或修改应用于条件的区域。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

### Optional
- opt_mask
    - 一个可选掩码，可以应用于条件数据以进行选择性修改。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- opt_lora_hook
    - 一个可选参数，允许将Lora挂钩应用于条件数据，提供额外的转换或控制层。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- opt_timesteps
    - 可选的时间步条件，允许进行时间调整。
    - Comfy dtype: TIMESTEPS_COND
    - Python dtype: TimestepsCond

## Output types
- positive
    - Comfy dtype: CONDITIONING
    - 应用掩码、强度调整并与附加条件结合后的增强或修改后的正向条件数据。
    - Python dtype: torch.Tensor
- negative
    - Comfy dtype: CONDITIONING
    - 应用掩码、强度调整并与附加条件结合后的增强或修改后的负向条件数据。
    - Python dtype: torch.Tensor

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class PairedConditioningSetMaskAndCombineHooked:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "positive": ("CONDITIONING",),
                "negative": ("CONDITIONING",),
                "positive_ADD": ("CONDITIONING",),
                "negative_ADD": ("CONDITIONING",),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "set_cond_area": (COND_CONST._LIST_COND_AREA,),
            },
            "optional": {
                "opt_mask": ("MASK", ),
                "opt_lora_hook": ("LORA_HOOK",),
                "opt_timesteps": ("TIMESTEPS_COND",)
            }
        }
    
    RETURN_TYPES = ("CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("positive", "negative")
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning"
    FUNCTION = "append_and_combine"

    def append_and_combine(self, positive, negative, positive_ADD, negative_ADD,
                           strength: float, set_cond_area: str,
                           opt_mask: Tensor=None, opt_lora_hook: LoraHookGroup=None, opt_timesteps: TimestepsCond=None):
        final_positive, final_negative = set_mask_and_combine_conds(conds=[positive, negative], new_conds=[positive_ADD, negative_ADD],
                                                                    strength=strength, set_cond_area=set_cond_area,
                                                                    opt_mask=opt_mask, opt_lora_hook=opt_lora_hook, opt_timesteps=opt_timesteps)
        return (final_positive, final_negative,)