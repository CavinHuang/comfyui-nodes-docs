---
tags:
- AnimateDiff
- Animation
---

# AnimateDiff Keyframe 🎭🅐🅓
## Documentation
- Class name: `ADE_AnimateDiffKeyframe`
- Category: `Animate Diff 🎭🅐🅓`
- Output node: `False`

The node is designed to manage and apply keyframe configurations for animation effects within the AnimateDiff framework. It allows for the dynamic adjustment of animation parameters such as scale, effect intensity, and camera control settings at specific points in the animation timeline, enhancing the flexibility and expressiveness of the animation process.
## Input types
### Required
- **`start_percent`**
    - Specifies the starting point of the keyframe within the animation timeline as a percentage, dictating when the keyframe's effects begin to apply. This parameter is crucial for timing the application of animation effects precisely.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`prev_ad_keyframes`**
    - Allows for the inclusion of previous animation keyframes to be considered or modified in the current operation, enabling continuity and layering of animation effects.
    - Comfy dtype: `AD_KEYFRAMES`
    - Python dtype: `ADKeyframeGroup`
- **`scale_multival`**
    - Determines the scaling factor to be applied to the animation at this keyframe, affecting the size or zoom level of the animated elements.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `Union[float, torch.Tensor]`
- **`effect_multival`**
    - Controls the intensity of specific visual effects applied at this keyframe, allowing for dynamic visual transformations throughout the animation.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `Union[float, torch.Tensor]`
- **`inherit_missing`**
    - Indicates whether the keyframe should inherit unspecified parameters from previous keyframes, ensuring continuity in the animation effects.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`guarantee_steps`**
    - Guarantees a minimum number of steps for which the keyframe's effects are applied, ensuring that certain effects persist for a desired duration within the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`ad_keyframes`**
    - Comfy dtype: `AD_KEYFRAMES`
    - Returns an updated collection of keyframes, including the newly added or modified keyframe, facilitating the management and sequencing of animation effects.
    - Python dtype: `ADKeyframeGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ADKeyframeNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}, ),
            },
            "optional": {
                "prev_ad_keyframes": ("AD_KEYFRAMES", ),
                "scale_multival": ("MULTIVAL",),
                "effect_multival": ("MULTIVAL",),
                "inherit_missing": ("BOOLEAN", {"default": True}, ),
                "guarantee_steps": ("INT", {"default": 1, "min": 0, "max": BIGMAX}),
            }
        }
    
    RETURN_TYPES = ("AD_KEYFRAMES", )
    FUNCTION = "load_keyframe"

    CATEGORY = "Animate Diff 🎭🅐🅓"

    def load_keyframe(self,
                      start_percent: float, prev_ad_keyframes=None,
                      scale_multival: Union[float, torch.Tensor]=None, effect_multival: Union[float, torch.Tensor]=None,
                      cameractrl_multival: Union[float, torch.Tensor]=None,
                      inherit_missing: bool=True, guarantee_steps: int=1):
        if not prev_ad_keyframes:
            prev_ad_keyframes = ADKeyframeGroup()
        prev_ad_keyframes = prev_ad_keyframes.clone()
        keyframe = ADKeyframe(start_percent=start_percent,
                              scale_multival=scale_multival, effect_multival=effect_multival, cameractrl_multival=cameractrl_multival,
                              inherit_missing=inherit_missing, guarantee_steps=guarantee_steps)
        prev_ad_keyframes.add(keyframe)
        return (prev_ad_keyframes,)

```
