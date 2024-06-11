# Combine LoRA Hooks [4] 🎭🅐🅓
## Documentation
- Class name: ADE_CombineLoraHooksFour
- Category: Animate Diff 🎭🅐🅓/conditioning/combine lora hooks
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在聚合和组合多达四个LoRA挂钩成一个统一的LoRA挂钩组。它有助于整合多个LoRA挂钩的修改，允许在Animate Diff框架中对模型行为进行更复杂和细致的调整。

## Input types
### Required
### Optional
- lora_hook_A
    - 表示要组合的第一个LoRA挂钩组。在聚合过程中起关键作用，贡献整体修改。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- lora_hook_B
    - 作为组合的第二个LoRA挂钩组。其包含的修改允许进行层叠，增强模型的适应性。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- lora_hook_C
    - 第三个LoRA挂钩组，增加了另一层定制，进一步优化了模型行为。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup
- lora_hook_D
    - 表示第四个也是最后一个要组合的LoRA挂钩组，完成了修改集，使模型能够进行全面调整。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup

## Output types
- lora_hook
    - Comfy dtype: LORA_HOOK
    - 组合多达四个LoRA挂钩后的统一组。此组合挂钩组允许增强和更复杂的模型条件。
    - Python dtype: LoraHookGroup

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CombineLoraHookFourOptional:
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
            }
        }

    RETURN_TYPES = ("LORA_HOOK",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/combine lora hooks"
    FUNCTION = "combine_lora_hooks"

    def combine_lora_hooks(self,
                           lora_hook_A: LoraHookGroup=None, lora_hook_B: LoraHookGroup=None,
                           lora_hook_C: LoraHookGroup=None, lora_hook_D: LoraHookGroup=None,):
        candidates = [lora_hook_A, lora_hook_B, lora_hook_C, lora_hook_D]