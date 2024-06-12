# Set Props and Combine Cond 🎭🅐🅓
## Documentation
- Class name: ADE_ConditioningSetMaskAndCombine
- Category: Animate Diff 🎭🅐🅓/conditioning/single cond ops
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点专门用于生成模型的高级条件数据操作，特别关注掩码和附加条件层的应用和组合。它通过应用掩码、强度调整和整合新的条件数据来增强或修改现有条件，从而允许对生成过程进行更精确的控制。

## Input types
### Required
- cond
    - 要增强或修改的原始条件数据。它作为应用附加条件层和掩码的基础，直接影响最终输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: CustomType[CONDITIONING]
- cond_ADD
    - 要与原始条件结合的附加条件数据。此层应用于现有条件之上，允许引入新特性或修改。
    - Comfy dtype: CONDITIONING
    - Python dtype: CustomType[CONDITIONING]
- strength
    - 一个标量值，确定掩码应用于条件的强度。它控制附加条件和掩码对原始数据的影响程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- set_cond_area
    - 指定在条件数据中进行修改的区域，而不提及特定类型。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

### Optional
- opt_mask
    - 一个可选掩码，可以应用于条件数据。它允许选择性地增强或修改条件中的特定区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- opt_lora_hook
    - 一个可选的LoraHookGroup，可以应用于进一步操作条件数据。它提供了修改条件的额外灵活性。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- opt_timesteps
    - 用于条件操作的可选时间步。此参数允许在生成过程中的特定点应用修改。
    - Comfy dtype: TIMESTEPS_COND
    - Python dtype: TimestepsCond

## Output types
- conditioning
    - Comfy dtype: CONDITIONING
    - 应用附加条件层、掩码和调整后的增强或修改的条件数据。
    - Python dtype: CustomType[CONDITIONING]

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class ConditioningSetMaskAndCombineHooked:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cond": ("CONDITIONING",),
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
    FUNCTION = "append_and_combine"

    def append_and_combine(self, conditioning, conditioning_ADD,
                           strength: float, set_cond_area: str,
                           opt_mask: Tensor=None, opt_lora_hook: LoraHookGroup=None, opt_timesteps: TimestepsCond=None):
        (final_conditioning,) = set_mask_and_combine_conds(conds=[conditioning], new_conds=[conditioning_ADD],
                                                                    strength=strength, set_cond_area=set_cond_area,
                                                                    opt_mask=opt_mask, opt_lora_hook=opt_lora_hook, opt_timesteps=opt_timesteps)
        return (final_conditioning,)