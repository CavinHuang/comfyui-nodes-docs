---
tags:
- ControlNet
- Weight
---

# Scaled Soft Weights 🛂🅐🅒🅝
## Documentation
- Class name: `ScaledSoftControlNetWeights`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/weights`
- Output node: `False`

This node specializes in adjusting the control net weights based on a base multiplier and a flip option. It dynamically scales the weights to fine-tune the control net's influence on the generation process, offering a mechanism to either enhance or diminish the control net's effect based on the base multiplier. The flip option provides an additional layer of control by potentially inverting the weights' impact, allowing for versatile adjustments to the generation's direction.
## Input types
### Required
- **`base_multiplier`**
    - The base multiplier is a scaling factor that adjusts the overall strength of the control net weights. It plays a crucial role in fine-tuning the generation process by scaling the weights up or down.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`flip_weights`**
    - This boolean parameter determines whether the control net weights should be inverted. Flipping the weights can significantly alter the generation's direction, offering a unique way to manipulate the output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`CN_WEIGHTS`**
    - Comfy dtype: `CONTROL_NET_WEIGHTS`
    - Represents the adjusted control net weights after applying the base multiplier and potentially flipping them. These weights directly influence the generation process.
    - Python dtype: `ControlWeights`
- **`TK_SHORTCUT`**
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - A timestep keyframe that encapsulates the adjusted control net weights, facilitating their integration into the generation pipeline.
    - Python dtype: `TimestepKeyframeGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ControlNetLoaderAdvanced](../../ComfyUI-Advanced-ControlNet/Nodes/ControlNetLoaderAdvanced.md)



## Source code
```python
class ScaledSoftUniversalWeights:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "base_multiplier": ("FLOAT", {"default": 0.825, "min": 0.0, "max": 1.0, "step": 0.001}, ),
                "flip_weights": ("BOOLEAN", {"default": False}),
            },
        }
    
    RETURN_TYPES = ("CONTROL_NET_WEIGHTS", "TIMESTEP_KEYFRAME",)
    RETURN_NAMES = WEIGHTS_RETURN_NAMES
    FUNCTION = "load_weights"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/weights"

    def load_weights(self, base_multiplier, flip_weights):
        weights = ControlWeights.universal(base_multiplier=base_multiplier, flip_weights=flip_weights)
        return (weights, TimestepKeyframeGroup.default(TimestepKeyframe(control_weights=weights))) 

```
