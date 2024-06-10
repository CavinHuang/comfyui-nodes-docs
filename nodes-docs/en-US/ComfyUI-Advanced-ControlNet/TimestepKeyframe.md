---
tags:
- AnimationScheduling
- Frame
- Keyframe
---

# Timestep Keyframe 🛂🅐🅒🅝
## Documentation
- Class name: `TimestepKeyframe`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/keyframes`
- Output node: `False`

The TimestepKeyframe node is designed to encapsulate the concept of a keyframe within a timeline, specifying the start percentage, strength, and optional control weights, latent keyframes, and mask hints. It serves as a foundational element for defining and manipulating keyframes in advanced control networks, enabling precise control over the animation or transformation process.
## Input types
### Required
- **`start_percent`**
    - Specifies the starting point of the keyframe as a percentage of the total timeline, allowing for precise positioning within the sequence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`prev_timestep_kf`**
    - References a previous timestep keyframe, enabling the chaining or sequencing of keyframes over time.
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - Python dtype: `TimestepKeyframeGroup`
- **`strength`**
    - Determines the influence or intensity of the keyframe, enabling the modulation of effects or transformations applied at this point in the timeline.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cn_weights`**
    - Optional control weights that can be applied to the keyframe, providing additional control over the effects or transformations.
    - Comfy dtype: `CONTROL_NET_WEIGHTS`
    - Python dtype: `ControlWeights`
- **`latent_keyframe`**
    - Optional latent keyframes that can be associated with this keyframe, allowing for complex transformations or animations.
    - Comfy dtype: `LATENT_KEYFRAME`
    - Python dtype: `LatentKeyframeGroup`
- **`null_latent_kf_strength`**
    - Specifies the strength of a null or default latent keyframe, used when no specific latent keyframe is provided.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`inherit_missing`**
    - A boolean flag indicating whether missing attributes should be inherited from previous keyframes, ensuring continuity in the animation or transformation process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`guarantee_usage`**
    - A boolean flag that guarantees the usage of this keyframe, ensuring it is considered in the animation or transformation process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`mask_optional`**
    - Optional mask hints that can be associated with the keyframe, providing additional control over the areas affected by the transformations.
    - Comfy dtype: `MASK`
    - Python dtype: `Tensor`
## Output types
- **`TIMESTEP_KF`**
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - Returns a modified or new timestep keyframe, incorporating the specified parameters and potentially adding it to a sequence of keyframes.
    - Python dtype: `TimestepKeyframeGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TimestepKeyframeNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}, ),
            },
            "optional": {
                "prev_timestep_kf": ("TIMESTEP_KEYFRAME", ),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.001}, ),
                "cn_weights": ("CONTROL_NET_WEIGHTS", ),
                "latent_keyframe": ("LATENT_KEYFRAME", ),
                "null_latent_kf_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 10.0, "step": 0.001}, ),
                "inherit_missing": ("BOOLEAN", {"default": True}, ),
                "guarantee_usage": ("BOOLEAN", {"default": True}, ),
                "mask_optional": ("MASK", ),
                #"interpolation": ([SI.LINEAR, SI.EASE_IN, SI.EASE_OUT, SI.EASE_IN_OUT, SI.NONE], {"default": SI.NONE}, ),
            }
        }
    
    RETURN_NAMES = ("TIMESTEP_KF", )
    RETURN_TYPES = ("TIMESTEP_KEYFRAME", )
    FUNCTION = "load_keyframe"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/keyframes"

    def load_keyframe(self,
                      start_percent: float,
                      strength: float=1.0,
                      cn_weights: ControlWeights=None, control_net_weights: ControlWeights=None, # old name
                      latent_keyframe: LatentKeyframeGroup=None,
                      prev_timestep_kf: TimestepKeyframeGroup=None, prev_timestep_keyframe: TimestepKeyframeGroup=None, # old name
                      null_latent_kf_strength: float=0.0,
                      inherit_missing=True,
                      guarantee_usage=True,
                      mask_optional=None,
                      interpolation: str=SI.NONE,):
        control_net_weights = control_net_weights if control_net_weights else cn_weights
        prev_timestep_keyframe = prev_timestep_keyframe if prev_timestep_keyframe else prev_timestep_kf
        if not prev_timestep_keyframe:
            prev_timestep_keyframe = TimestepKeyframeGroup()
        else:
            prev_timestep_keyframe = prev_timestep_keyframe.clone()
        keyframe = TimestepKeyframe(start_percent=start_percent, strength=strength, interpolation=interpolation, null_latent_kf_strength=null_latent_kf_strength,
                                    control_weights=control_net_weights, latent_keyframes=latent_keyframe, inherit_missing=inherit_missing, guarantee_usage=guarantee_usage,
                                    mask_hint_orig=mask_optional)
        prev_timestep_keyframe.add(keyframe)
        return (prev_timestep_keyframe,)

```
