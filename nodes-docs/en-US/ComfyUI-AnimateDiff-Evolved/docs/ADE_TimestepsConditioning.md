---
tags:
- Conditioning
---

# Timesteps Conditioning 🎭🅐🅓
## Documentation
- Class name: `ADE_TimestepsConditioning`
- Category: `Animate Diff 🎭🅐🅓/conditioning`
- Output node: `False`

The node focuses on adjusting the timing for applying specific conditions within the animation or diffusion process, allowing for precise control over when certain effects or modifications are introduced based on the progression of the animation. This enables a more dynamic and nuanced application of conditions, enhancing the overall quality and flexibility of the generated content.
## Input types
### Required
- **`start_percent`**
    - Specifies the starting point (as a percentage of the total animation length) for applying the given conditions, allowing for precise timing control.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - Defines the ending point (as a percentage of the total animation length) for the application of conditions, enabling the tailoring of effects to specific phases of the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`timesteps_cond`**
    - Comfy dtype: `TIMESTEPS_COND`
    - The timing adjustments for conditions, encapsulated as a specific type that represents the scheduling of conditions throughout the animation or diffusion process.
    - Python dtype: `TimestepsCond`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningTimestepsNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001})
            }
        }
    
    RETURN_TYPES = ("TIMESTEPS_COND",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning"
    FUNCTION = "create_schedule"

    def create_schedule(self, start_percent: float, end_percent: float):
        return (TimestepsCond(start_percent=start_percent, end_percent=end_percent),)

```
