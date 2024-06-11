# Set Props on Cond 🎭🅐🅓
## Documentation
- Class name: ADE_ConditioningSetMask
- Category: Animate Diff 🎭🅐🅓/conditioning/single cond ops
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在将掩码应用于条件数据，根据指定参数调整条件的区域和强度。它使得条件输入的动态修改成为可能，以更好地符合预期结果，如关注或排除数据中的特定区域。

## Input types
### Required
- cond_ADD
    - 要添加或修改的条件数据。此参数对于在现有条件框架中引入新的上下文或内容至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tensor
- strength
    - 定义掩码对条件数据影响的强度，允许对修改影响进行精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- set_cond_area
    - 确定掩码效果是应用于默认区域还是掩码的边界，提供在特定区域进行定位的灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

### Optional
- opt_mask
    - 一个可选掩码，指定要修改的条件数据区域，提供对条件影响的额外控制。
    - Comfy dtype: MASK
    - Python dtype: Tensor
- opt_lora_hook
    - 一个可选参数，允许将Lora挂钩应用于条件，进一步定制条件过程。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- opt_timesteps
    - 可选的时间步条件，允许对条件数据进行时间调整。
    - Comfy dtype: TIMESTEPS_COND
    - Python dtype: TimestepsCond

## Output types
- conditioning
    - Comfy dtype: CONDITIONING
    - 修改后的条件数据，反映了应用的掩码和调整，包括添加的任何额外条件数据。
    - Python dtype: Tensor

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class ConditioningSetMaskHooked:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cond_ADD": ("CONDITIONING",),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "set_cond_area": (COND_CONST._LIST_COND_AREA,),
            },
            "optional": {
                "opt_mask": ("MASK", ),
                "opt_lora_hook": ("LORA_HOOK",),
                "opt_timesteps": ("TIMESTEPS_COND",)
            }
        }

    RETURN_TYPES = ("CONDITIONING",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/single cond ops"
    FUNCTION = "append_and_hook"

    def append_and_hook(self, cond_ADD,
                        strength: float, set_cond_area: str,
                        opt_mask: Tensor=None, opt_lora_hook: LoraHookGroup=None, opt_timesteps: TimestepsCond=None):
        (final_conditioning,) = set_mask_conds(conds=[cond_ADD],
                                               strength=strength, set_cond_area=set_cond_area,
                                               opt_mask=opt_mask, opt_lora_hook=opt_lora_hook, opt_timesteps=opt_timesteps)
        return (final_conditioning,) 