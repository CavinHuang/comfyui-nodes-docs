# Combine LoRA Hooks [8] 🎭🅐🅓
## Documentation
- Class name: ADE_CombineLoraHooksEight
- Category: Animate Diff 🎭🅐🅓/conditioning/combine lora hooks
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在将多达八个LoRA挂钩组合成一个统一的LoRA挂钩组。它有助于整合多个LoRA挂钩的修改，允许在生成任务中对模型行为进行更复杂和细致的调整。

## Input types
### Required
### Optional
- lora_hook_A
    - 表示要组合的第一个LoRA挂钩组。在聚合过程中起基础性作用，为组合后的LoRA挂钩组设定初始条件。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- lora_hook_B
    - 表示要组合的第二个LoRA挂钩组。其包含的修改扩大了组合后LoRA挂钩组的能力和修改范围。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- lora_hook_C
    - 作为组合过程中的第三个LoRA挂钩组，贡献了额外的修改，进一步丰富了组合后LoRA挂钩组的功能。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- lora_hook_D
    - 表示要组合的第四个LoRA挂钩组，增加了组合后LoRA挂钩组中的修改多样性。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- lora_hook_E
    - 作为组合过程中的第五个LoRA挂钩组，通过引入更多细微调整增强了组合后LoRA挂钩组。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- lora_hook_F
    - 表示要组合的第六个LoRA挂钩组，其包含的修改拓宽了组合后LoRA挂钩组的范围。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- lora_hook_G
    - 作为组合过程中的第七个LoRA挂钩组，增加了组合后LoRA挂钩组中的复杂性和深度。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- lora_hook_H
    - 作为第八个也是最后一个要组合的LoRA挂钩组，完成了聚合，最大化了组合后LoRA挂钩组中的修改和调整。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup

## Output types
- lora_hook
    - Comfy dtype: LORA_HOOK
    - 组合多达八个LoRA挂钩后的统一LoRA挂钩组。此组合组能够对模型行为应用一整套全面的修改。
    - Python dtype: LoraHookGroup

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CombineLoraHookEightOptional:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
            },
            "optional": {
                "lora_hook_A": ("LORA_HOOK",),
                "lora_hook_B": ("LORA_HOOK",),
                "lora_hook_C": ("LORA_HOOK",),
                "lora_hook_D": ("LORA_HOOK",),
                "lora_hook_E": ("LORA_HOOK",),
                "lora_hook_F": ("LORA_HOOK",),
                "lora_hook_G": ("LORA_HOOK",),
                "lora_hook_H": ("LORA_HOOK",),
            }
        }

    RETURN_TYPES = ("LORA_HOOK",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/combine lora hooks"
    FUNCTION = "combine_lora_hooks"

    def combine_lora_hooks(self,
                           lora_hook_A: LoraHookGroup=None, lora_hook_B: LoraHookGroup=None,
                           lora_hook_C: LoraHookGroup=None, lora_hook_D: LoraHookGroup=None,
                           lora_hook_E: LoraHookGroup=None, lora_hook_F: LoraHookGroup=None,
                           lora_hook_G: LoraHookGroup=None, lora_hook_H: LoraHookGroup=None):
        candidates = [lora_hook_A, lora_hook_B, lora_hook_C, lora_hook_D,
                      lora_hook_E, lora_hook_F, lora_hook_G, lora_hook_H]
        return (LoraHookGroup.combine_all_lora_hooks(candidates),)