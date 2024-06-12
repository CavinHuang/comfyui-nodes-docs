# Set Unmasked Cond 🎭🅐🅓
## Documentation
- Class name: ADE_ConditioningSetUnmaskedAndCombine
- Category: Animate Diff 🎭🅐🅓/conditioning/single cond ops
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点专门用于生成模型的高级条件数据操作，特别关注取消掩码和组合不同的条件输入集。它通过应用复杂的条件转换来增强或修改生成过程。

## Input types
### Required
- cond
    - 作为转换基础的主要条件输入。它在决定生成过程的初始状态或上下文方面起着关键作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: list
- cond_DEFAULT
    - 旨在与主要条件输入结合的附加条件输入。此输入通常代表修改或增强基础条件的默认或补充信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: list

### Optional
- opt_lora_hook
    - 一个可选参数，允许将Lora挂钩应用于条件输入，为条件过程提供进一步的定制和控制机制。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup

## Output types
- conditioning
    - Comfy dtype: CONDITIONING
    - 结合并取消掩码提供的条件输入的结果，代表用于生成模型的修改或增强的条件状态。
    - Python dtype: list

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class ConditioningSetUnmaskedAndCombineHooked:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cond": ("CONDITIONING",),
                "cond_DEFAULT": ("CONDITIONING",),
            },
            "optional": {
                "opt_lora_hook": ("LORA_HOOK",),
            }
        }
    
    RETURN_TYPES = ("CONDITIONING",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/single cond ops"
    FUNCTION = "append_and_combine"

    def append_and_combine(self, cond, cond_DEFAULT,
                           opt_lora_hook: LoraHookGroup=None):
        (final_conditioning,) = set_unmasked_and_combine_conds(conds=[cond], new_conds=[cond_DEFAULT],
                                                                        opt_lora_hook=opt_lora_hook)
        return (final_conditioning,)