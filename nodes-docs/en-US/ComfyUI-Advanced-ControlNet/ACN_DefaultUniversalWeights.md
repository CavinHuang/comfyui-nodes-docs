---
tags:
- ControlNet
- Weight
---

# Force Default Weights 🛂🅐🅒🅝
## Documentation
- Class name: `ACN_DefaultUniversalWeights`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/weights`
- Output node: `False`

This node is designed to generate a default set of universal weights for advanced control networks. It focuses on providing a baseline weight configuration that can be applied across various scenarios, ensuring a consistent starting point for further customization and optimization.
## Input types
## Output types
- **`CN_WEIGHTS`**
    - Comfy dtype: `CONTROL_NET_WEIGHTS`
    - The generated universal control network weights, ready for application within advanced control network configurations.
    - Python dtype: `ControlWeights`
- **`TK_SHORTCUT`**
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - A timestep keyframe group that incorporates the generated control weights, facilitating their integration into the network's temporal dynamics.
    - Python dtype: `TimestepKeyframeGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DefaultWeights:
    @classmethod
    def INPUT_TYPES(s):
        return {
        }
    
    RETURN_TYPES = ("CONTROL_NET_WEIGHTS", "TIMESTEP_KEYFRAME",)
    RETURN_NAMES = WEIGHTS_RETURN_NAMES
    FUNCTION = "load_weights"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/weights"

    def load_weights(self):
        weights = ControlWeights.default()
        return (weights, TimestepKeyframeGroup.default(TimestepKeyframe(control_weights=weights))) 

```
