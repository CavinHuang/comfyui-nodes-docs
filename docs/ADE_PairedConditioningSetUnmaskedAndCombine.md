# Set Unmasked Conds 🎭🅐🅓
## Documentation
- Class name: ADE_PairedConditioningSetUnmaskedAndCombine
- Category: Animate Diff 🎭🅐🅓/conditioning
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在处理和组合成对的条件输入，应用取消掩码和可选的LoRA挂钩转换。它专注于将默认或基线条件与当前条件整合，准备进一步处理或生成任务，从而增强对条件过程的灵活性和控制。

## Input types
### Required
- positive
    - 要与其默认对应项结合的当前正向条件输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- negative
    - 要与其默认对应项结合的当前负向条件输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- positive_DEFAULT
    - 要与当前正向条件结合的默认正向条件输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
- negative_DEFAULT
    - 要与当前负向条件结合的默认负向条件输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]

### Optional
- opt_lora_hook
    - 一个可选的LoRA挂钩，用于在结合条件输入之前对其进行转换。
    - Comfy dtype: LORA_HOOK
    - Python dtype: Optional[LoraHookGroup]

## Output types
- positive
    - Comfy dtype: CONDITIONING
    - 将当前和默认输入整合后的组合正向条件输出。
    - Python dtype: Dict[str, Any]
- negative
    - Comfy dtype: CONDITIONING
    - 将当前和默认输入整合后的组合负向条件输出。
    - Python dtype: Dict[str, Any]

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class PairedConditioningSetUnmaskedAndCombineHooked:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "positive": ("CONDITIONING",),
                "negative": ("CONDITIONING",),
                "positive_DEFAULT": ("CONDITIONING",),
                "negative_DEFAULT": ("CONDITIONING",),
            },
            "optional": {
                "opt_lora_hook": ("LORA_HOOK",),
            }
        }
    
    RETURN_TYPES = ("CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("positive", "negative")
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning"
    FUNCTION = "append_and_combine"

    def append_and_combine(self, positive, negative, positive_DEFAULT, negative_DEFAULT,
                           opt_lora_hook: LoraHookGroup=None):
        final_positive, final_negative = set_unmasked_and_combine_conds(conds=[positive, negative], new_conds=[positive_DEFAULT, negative_DEFAULT],
                                                                        opt_lora_hook=opt_lora_hook)
        return (final_positive, final_negative,)