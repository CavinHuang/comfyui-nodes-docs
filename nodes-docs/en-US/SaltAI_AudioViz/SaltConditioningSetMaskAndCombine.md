---
tags:
- Conditioning
---

# Conditioning Schedule Mask and Combine
## Documentation
- Class name: `SaltConditioningSetMaskAndCombine`
- Category: `SALT/Scheduling/Conditioning`
- Output node: `False`

The SaltConditioningSetMaskAndCombine node is designed for advanced conditioning manipulation in audio-visual scheduling tasks. It combines and applies masks to multiple conditioning schedules, allowing for precise control over the conditioning process with the option to adjust mask strengths and set conditioning areas based on mask bounds. This node is essential for tasks requiring detailed and dynamic conditioning adjustments in multimedia content generation.
## Input types
### Required
- **`positive_schedule_a`**
    - Represents the first set of positive conditioning schedules to be combined and masked.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `list`
- **`negative_schedule_a`**
    - Represents the first set of negative conditioning schedules to be combined and masked.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `list`
- **`positive_schedule_b`**
    - Represents the second set of positive conditioning schedules to be combined and masked.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `list`
- **`negative_schedule_b`**
    - Represents the second set of negative conditioning schedules to be combined and masked.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `list`
- **`mask_a`**
    - The mask to be applied to the first set of conditioning schedules.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask_b`**
    - The mask to be applied to the second set of conditioning schedules.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
### Optional
- **`mask_strengths_a`**
    - A list of strengths for each mask applied to the first set of conditioning schedules, allowing for variable influence.
    - Comfy dtype: `LIST`
    - Python dtype: `list`
- **`mask_strengths_b`**
    - A list of strengths for each mask applied to the second set of conditioning schedules, allowing for variable influence.
    - Comfy dtype: `LIST`
    - Python dtype: `list`
- **`set_cond_area`**
    - Determines whether the conditioning area is set to default or adjusted to mask bounds, affecting how masks are applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltConditioningSetMaskAndCombine:
    """
    Based on KJNodes ConditioningSetMaskAndCombine
    https://github.com/kijai/ComfyUI-KJNodes/blob/671af53b34f13d35526a510dfbbaac253ddd52da/nodes.py#L1256
    """
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "positive_schedule_a": ("CONDITIONING", ),
                "negative_schedule_a": ("CONDITIONING", ),
                "positive_schedule_b": ("CONDITIONING", ),
                "negative_schedule_b": ("CONDITIONING", ),
                "mask_a": ("MASK", ),
                "mask_b": ("MASK", ),
            },
            "optional": {
                "mask_strengths_a": ("LIST", {}),
                "mask_strengths_b": ("LIST", {}),
                "set_cond_area": (["default", "mask bounds"],),
            }
        }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING")
    FUNCTION = "process"
    CATEGORY = "SALT/Scheduling/Conditioning"

    def process(self, positive_schedule_a, negative_schedule_a, positive_schedule_b, negative_schedule_b, mask_a, mask_b, mask_strengths_a=[1], mask_strengths_b=[1], set_cond_area="default"):
        set_area_to_bounds = set_cond_area != "default"

        combined_positive_a = self.apply_masks(positive_schedule_a, mask_a, mask_strengths_a, set_area_to_bounds)
        combined_negative_a = self.apply_masks(negative_schedule_a, mask_a, mask_strengths_a, set_area_to_bounds)
        combined_positive_b = self.apply_masks(positive_schedule_b, mask_b, mask_strengths_b, set_area_to_bounds)
        combined_negative_b = self.apply_masks(negative_schedule_b, mask_b, mask_strengths_b, set_area_to_bounds)

        combined_positive = combined_positive_a + combined_positive_b
        combined_negative = combined_negative_a + combined_negative_b

        return (combined_positive, combined_negative)

    def apply_masks(self, conditionings, mask, strengths, set_area_to_bounds):
        combined = []
        if len(mask.shape) < 3:
            mask = mask.unsqueeze(0)

        for idx, conditioning in enumerate(conditionings):
            strength = strengths[idx % len(strengths)]

            combined.append(self.append_helper(conditioning, mask, set_area_to_bounds, strength))
        return combined

    def append_helper(self, conditioning, mask, set_area_to_bounds, strength):
        conditioned = [conditioning[0], conditioning[1].copy()]
        _, h, w = mask.shape
        conditioned[1]['mask'] = mask
        conditioned[1]['set_area_to_bounds'] = set_area_to_bounds
        conditioned[1]['mask_strength'] = strength
        return conditioned

```
