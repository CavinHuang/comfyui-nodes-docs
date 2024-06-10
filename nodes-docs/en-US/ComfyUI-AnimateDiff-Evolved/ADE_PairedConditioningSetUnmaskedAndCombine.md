---
tags:
- Conditioning
---

# Set Unmasked Conds 🎭🅐🅓
## Documentation
- Class name: `ADE_PairedConditioningSetUnmaskedAndCombine`
- Category: `Animate Diff 🎭🅐🅓/conditioning`
- Output node: `False`

This node is designed to process and combine pairs of conditioning inputs, applying unmasking and optional transformations through LoRA hooks. It focuses on integrating default or baseline conditionings with current ones to prepare them for further processing or generation tasks, enhancing the flexibility and control over the conditioning process.
## Input types
### Required
- **`positive`**
    - The current positive conditioning input to be combined with its default counterpart.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, Any]`
- **`negative`**
    - The current negative conditioning input to be combined with its default counterpart.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, Any]`
- **`positive_DEFAULT`**
    - The default positive conditioning input to be combined with the current positive conditioning.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, Any]`
- **`negative_DEFAULT`**
    - The default negative conditioning input to be combined with the current negative conditioning.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, Any]`
### Optional
- **`opt_lora_hook`**
    - An optional LoRA hook to apply transformations to the conditioning inputs before combining them.
    - Comfy dtype: `LORA_HOOK`
    - Python dtype: `Optional[LoraHookGroup]`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The combined positive conditioning output after integrating the current and default inputs.
    - Python dtype: `Dict[str, Any]`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The combined negative conditioning output after integrating the current and default inputs.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
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

```
