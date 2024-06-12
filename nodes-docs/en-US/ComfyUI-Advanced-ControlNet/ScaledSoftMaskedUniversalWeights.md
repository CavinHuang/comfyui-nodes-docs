---
tags:
- ControlNet
- Weight
---

# Scaled Soft Masked Weights 🛂🅐🅒🅝
## Documentation
- Class name: `ScaledSoftMaskedUniversalWeights`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/weights`
- Output node: `False`

This node specializes in dynamically adjusting the weights of a control network based on a provided mask and specified minimum and maximum base multipliers. It aims to normalize and scale the control network's influence, ensuring that the weights are appropriately adjusted to enhance the model's performance under varying conditions.
## Input types
### Required
- **`mask`**
    - The mask parameter is crucial for determining the areas of influence within the control network. It directly affects how weights are normalized and scaled, playing a pivotal role in the dynamic adjustment of the network's weights.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`min_base_multiplier`**
    - Specifies the minimum scaling factor for the weights, serving as a lower bound in the normalization process. It ensures that the weights do not fall below a certain threshold, maintaining a baseline level of influence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max_base_multiplier`**
    - Defines the maximum scaling factor for the weights, acting as an upper limit in the normalization process. This parameter ensures that the weights do not exceed a certain level, preventing overly dominant influences.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`CN_WEIGHTS`**
    - Comfy dtype: `CONTROL_NET_WEIGHTS`
    - Represents the adjusted control network weights after applying the mask and scaling factors.
    - Python dtype: `ControlWeights`
- **`TK_SHORTCUT`**
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - Encapsulates the timestep keyframe information, including the adjusted control weights, facilitating their integration into the model's processing flow.
    - Python dtype: `TimestepKeyframeGroup`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ScaledSoftMaskedUniversalWeights:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK", ),
                "min_base_multiplier": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}, ),
                "max_base_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}, ),
                #"lock_min": ("BOOLEAN", {"default": False}, ),
                #"lock_max": ("BOOLEAN", {"default": False}, ),
            },
        }
    
    RETURN_TYPES = ("CONTROL_NET_WEIGHTS", "TIMESTEP_KEYFRAME",)
    RETURN_NAMES = WEIGHTS_RETURN_NAMES
    FUNCTION = "load_weights"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/weights"

    def load_weights(self, mask: Tensor, min_base_multiplier: float, max_base_multiplier: float, lock_min=False, lock_max=False):
        # normalize mask
        mask = mask.clone()
        x_min = 0.0 if lock_min else mask.min()
        x_max = 1.0 if lock_max else mask.max()
        if x_min == x_max:
            mask = torch.ones_like(mask) * max_base_multiplier
        else:
            mask = linear_conversion(mask, x_min, x_max, min_base_multiplier, max_base_multiplier)
        weights = ControlWeights.universal_mask(weight_mask=mask)
        return (weights, TimestepKeyframeGroup.default(TimestepKeyframe(control_weights=weights)))

```
