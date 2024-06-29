# Combine LoRA Hooks [2] 🎭🅐🅓
## Documentation
- Class name: ADE_CombineLoraHooks
- Category: Animate Diff 🎭🅐🅓/conditioning/combine lora hooks
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在将多个LoRA挂钩组聚合成一个统一的LoRA挂钩组。它有助于组合各种LoRA挂钩，通过整合每个单独挂钩提供的不同修改或增强，实现更复杂和细致的模型条件。

## Input types
### Required
### Optional
- lora_hook_A
    - 表示要组合的第一个LoRA挂钩组。在聚合过程中起关键作用，贡献其修改或增强到最终的统一LoRA挂钩组。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- lora_hook_B
    - 表示要组合的第二个LoRA挂钩组。贡献其独特的修改或增强到统一LoRA挂钩组，丰富整体的条件效果。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup

## Output types
- lora_hook
    - Comfy dtype: LORA_HOOK
    - 输出是一个统一的LoRA挂钩组，结合了输入LoRA挂钩组的修改或增强。此聚合挂钩有助于更复杂的模型条件。
    - Python dtype: LoraHookGroup

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CombineLoraHooks:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
            },
            "optional": {
                "lora_hook_A": ("LORA_HOOK",),
                "lora_hook_B": ("LORA_HOOK",),
            }
        }
    
    RETURN_TYPES = ("LORA_HOOK",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/combine lora hooks"
    FUNCTION = "combine_lora_hooks"

    def combine_lora_hooks(self, lora_hook_A: LoraHookGroup=None, lora_hook_B: LoraHookGroup=None):
        candidates = [lora_hook_A, lora_hook_B]
        return (LoraHookGroup.combine_all_lora_hooks(candidates),)