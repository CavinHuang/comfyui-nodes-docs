# Set Props on Conds 🎭🅐🅓
## Documentation
- Class name: ADE_PairedConditioningSetMask
- Category: Animate Diff 🎭🅐🅓/conditioning
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

ADE_PairedConditioningSetMask节点旨在对一对条件输入应用掩码和条件调整。它利用强度、设置条件区域以及可选元素如掩码、Lora挂钩和时间步条件等附加参数来微调条件过程，旨在根据指定的调整增强或修改生成内容的属性。

## Input types
### Required
- positive_ADD
    - 指定要调整的正向条件输入。它在定义要在生成内容中增强或修改的属性或特性方面起着关键作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: CONDITIONING
- negative_ADD
    - 指定要调整的负向条件输入。它对于定义要以与正向条件相反的方式减弱或改变的属性或特性至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: CONDITIONING
- strength
    - 决定条件调整的强度。较高的值表示对条件输入的影响更强。
    - Comfy dtype: FLOAT
    - Python dtype: float
- set_cond_area
    - 定义要受调整影响的条件输入区域。它允许对条件输入进行有针对性的修改。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: COND_CONST._LIST_COND_AREA

### Optional
- opt_mask
    - 一个可选掩码，可以应用于条件输入以进行更精确的调整。
    - Comfy dtype: MASK
    - Python dtype: Tensor
- opt_lora_hook
    - 一个可选的Lora挂钩，可以应用于附加条件转换。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- opt_timesteps
    - 可选的时间步条件，允许对条件输入进行时间调整。
    - Comfy dtype: TIMESTEPS_COND
    - Python dtype: TimestepsCond

## Output types
- positive
    - Comfy dtype: CONDITIONING
    - 应用指定调整后的正向条件输出。
    - Python dtype: CONDITIONING
- negative
    - Comfy dtype: CONDITIONING
    - 应用指定调整后的负向条件输出。
    - Python dtype: CONDITIONING

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class PairedConditioningSetMaskHooked:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "positive_ADD": ("CONDITIONING", ),
                "negative_ADD": ("CONDITIONING", ),
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
    FUNCTION = "append_and_hook"

    def append_and_hook(self, positive_ADD, negative_ADD,
                        strength: float, set_cond_area: str,
                        opt_mask: Tensor=None, opt_lora_hook: LoraHookGroup=None, opt_timesteps: TimestepsCond=None):
        final_positive, final_negative = set_mask_conds(conds=[positive_ADD, negative_ADD],
                                                        strength=strength, set_cond_area=set_cond_area,
                                                        opt_mask=opt_mask, opt_lora_hook=opt_lora_hook, opt_timesteps=opt_timesteps)
        return (final_positive, final_negative)