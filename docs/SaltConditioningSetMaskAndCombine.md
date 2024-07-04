
# Documentation
- Class name: SaltConditioningSetMaskAndCombine
- Category: SALT/Scheduling/Conditioning
- Output node: False
- Repo Ref: https://github.com/SALTx2/ComfyUI-SALT

SaltConditioningSetMaskAndCombine节点用于音视频调度任务中的高级条件控制。它结合并应用掩码到多个条件调度，允许对条件过程进行精确控制，可以调整掩码强度并基于掩码边界设置条件区域。该节点对于需要在多媒体内容生成中进行详细和动态条件调整的任务至关重要。

# Input types
## Required
- positive_schedule_a
    - 表示要组合和应用掩码的第一组正面条件调度。
    - Comfy dtype: CONDITIONING
    - Python dtype: list
- negative_schedule_a
    - 表示要组合和应用掩码的第一组负面条件调度。
    - Comfy dtype: CONDITIONING
    - Python dtype: list
- positive_schedule_b
    - 表示要组合和应用掩码的第二组正面条件调度。
    - Comfy dtype: CONDITIONING
    - Python dtype: list
- negative_schedule_b
    - 表示要组合和应用掩码的第二组负面条件调度。
    - Comfy dtype: CONDITIONING
    - Python dtype: list
- mask_a
    - 应用于第一组条件调度的掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask_b
    - 应用于第二组条件调度的掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- mask_strengths_a
    - 应用于第一组条件调度的每个掩码的强度列表，允许可变影响。
    - Comfy dtype: LIST
    - Python dtype: list
- mask_strengths_b
    - 应用于第二组条件调度的每个掩码的强度列表，允许可变影响。
    - Comfy dtype: LIST
    - Python dtype: list
- set_cond_area
    - 确定条件区域是设置为默认值还是调整为掩码边界，影响掩码的应用方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- conditioning
    - Comfy dtype: CONDITIONING
    - 输出经过掩码处理和组合后的条件调度，用于后续的音视频生成过程。
    - Python dtype: unknown


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
