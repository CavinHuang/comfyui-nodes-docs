# Set LoRA Hook Keyframes 🎭🅐🅓
## Documentation
- Class name: ADE_SetLoraHookKeyframe
- Category: Animate Diff 🎭🅐🅓/conditioning
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点用于将一组LoRA挂钩关键帧分配给特定的LoRA挂钩组。它允许在动画时间线上定制和动态调整LoRA挂钩行为，从而在动画过程的不同阶段精确控制模型的响应。

## Input types
### Required
- lora_hook
    - 将应用关键帧的LoRA挂钩组。此参数对于识别将接收新关键帧设置的目标挂钩组至关重要。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- hook_kf
    - 将分配给指定LoRA挂钩组的LoRA挂钩关键帧集。此参数定义了动画时间线上LoRA挂钩的时间、强度和其他特性。
    - Comfy dtype: LORA_HOOK_KEYFRAMES
    - Python dtype: LoraHookKeyframeGroup

## Output types
- lora_hook
    - Comfy dtype: LORA_HOOK
    - 应用了新关键帧集的更新LoRA挂钩组。此输出反映了对LoRA挂钩所做的更改，包含了指定的关键帧设置。
    - Python dtype: LoraHookGroup

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class SetLoraHookKeyframes:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "lora_hook": ("LORA_HOOK",), 
                "hook_kf": ("LORA_HOOK_KEYFRAMES",),
            }
        }
    
    RETURN_TYPES = ("LORA_HOOK",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning"
    FUNCTION = "set_hook_keyframes"

    def set_hook_keyframes(self, lora_hook: LoraHookGroup, hook_kf: LoraHookKeyframeGroup):
        new_lora_hook = lora_hook.clone()
        new_lora_hook.set_keyframes_on_hooks(hook_kf=hook_kf)
        return (new_lora_hook,)