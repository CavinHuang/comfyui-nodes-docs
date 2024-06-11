# Set Model LoRA Hook 🎭🅐🅓
## Documentation
- Class name: ADE_AttachLoraHookToConditioning
- Category: Animate Diff 🎭🅐🅓/conditioning/single cond ops
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在将LoRA挂钩附加到条件数据上，从而根据指定的LoRA挂钩动态修改模型行为。它在生成模型的条件过程中，尤其是在动画和差分渲染的背景下，起着定制和控制的关键作用。

## Input types
### Required
- conditioning
    - 要附加LoRA挂钩的条件数据。此数据决定了模型的行为和输出，附加LoRA挂钩可以进行动态调整。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
- lora_hook
    - 要附加到条件数据的LoRA挂钩。此挂钩使得在运行时修改模型参数成为可能，从而增强了对生成过程的控制和定制。
    - Comfy dtype: LORA_HOOK
    - Python dtype: LoraHookGroup

## Output types
- conditioning
    - Comfy dtype: CONDITIONING
    - 附加了LoRA挂钩的修改后条件数据，使得模型行为可以动态调整。
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class SetModelLoraHook:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "conditioning": ("CONDITIONING",),
                "lora_hook": ("LORA_HOOK",),
            }
        }
    
    RETURN_TYPES = ("CONDITIONING",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/single cond ops"
    FUNCTION = "attach_lora_hook"

    def attach_lora_hook(self, conditioning, lora_hook: LoraHookGroup):
        c = []
        for t in conditioning:
            n = [t[0], t[1].copy()]
            n[1]["lora_hook"] = lora_hook
            c.append(n)
        return (c, )