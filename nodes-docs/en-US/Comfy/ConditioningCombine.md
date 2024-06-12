---
tags:
- Conditioning
---

# Conditioning (Combine)
## Documentation
- Class name: `ConditioningCombine`
- Category: `conditioning`
- Output node: `False`

The ConditioningCombine node is designed to merge two conditioning inputs into a single, combined conditioning output. This functionality is essential for scenarios where multiple conditioning contexts need to be applied simultaneously to a generative model.
## Input types
### Required
- **`conditioning_i`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The combined conditioning output, which encapsulates the merged context of the two input conditionings.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [ConditioningCombine](../../Comfy/Nodes/ConditioningCombine.md)
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - [CR Conditioning Input Switch](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Conditioning Input Switch.md)
    - Attention couple
    - KSampler with Variations
    - [CR Module Pipe Loader](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Module Pipe Loader.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)



## Source code
```python
class ConditioningCombine:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning_1": ("CONDITIONING", ), "conditioning_2": ("CONDITIONING", )}}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "combine"

    CATEGORY = "conditioning"

    def combine(self, conditioning_1, conditioning_2):
        return (conditioning_1 + conditioning_2, )

```
