---
tags:
- LoRA
---

# Set Model LoRA Hook 🎭🅐🅓
## Documentation
- Class name: `ADE_AttachLoraHookToConditioning`
- Category: `Animate Diff 🎭🅐🅓/conditioning/single cond ops`
- Output node: `False`

This node is designed to attach LoRA hooks to conditioning data, enabling the dynamic modification of model behavior based on specified LoRA hooks. It plays a crucial role in customizing and controlling the conditioning process in generative models, particularly in the context of animation and differential rendering.
## Input types
### Required
- **`conditioning`**
    - The conditioning data to which the LoRA hook will be attached. This data dictates the model's behavior and output, and attaching a LoRA hook allows for dynamic adjustments.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
- **`lora_hook`**
    - The LoRA hook to be attached to the conditioning data. This hook enables the modification of model parameters at runtime, allowing for enhanced control and customization of the generative process.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `LoraHookGroup`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditioning data with the LoRA hook attached, enabling dynamic adjustments to the model's behavior.
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
## Usage tips
- Infra type: `CPU`
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

```
