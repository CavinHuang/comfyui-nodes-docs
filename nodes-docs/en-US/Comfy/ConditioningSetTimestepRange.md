---
tags:
- Conditioning
---

# ConditioningSetTimestepRange
## Documentation
- Class name: `ConditioningSetTimestepRange`
- Category: `advanced/conditioning`
- Output node: `False`

This node is designed to adjust the temporal aspect of conditioning data by setting a specific range of timesteps. It allows for the precise control over the period during which the conditioning is applied, enhancing the flexibility and specificity of the conditioning process.
## Input types
### Required
- **`conditioning`**
    - The conditioning data to be modified. It serves as the base upon which the timestep range adjustments are applied, directly influencing the outcome of the conditioning process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Any]]]`
- **`start`**
    - Specifies the starting point of the timestep range as a percentage. This parameter determines the beginning of the conditioning effect within the specified range, allowing for fine-tuned control over the application timing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end`**
    - Defines the ending point of the timestep range as a percentage. This parameter sets the limit for the conditioning effect, enabling precise demarcation of the conditioning period.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditioning data with the specified timestep range applied. This output reflects the adjustments made to the temporal aspects of the conditioning, tailored to the specified start and end points.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Any]]]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Conditioning Mixer](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Conditioning Mixer.md)



## Source code
```python
class ConditioningSetTimestepRange:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning": ("CONDITIONING", ),
                             "start": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                             "end": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001})
                             }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "set_range"

    CATEGORY = "advanced/conditioning"

    def set_range(self, conditioning, start, end):
        c = node_helpers.conditioning_set_values(conditioning, {"start_percent": start,
                                                                "end_percent": end})
        return (c, )

```
