---
tags:
- AnimateDiff
- Animation
---

# AnimateDiff+CameraCtrl Keyframe 🎭🅐🅓
## Documentation
- Class name: `ADE_CameraCtrlAnimateDiffKeyframe`
- Category: `Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl`
- Output node: `False`

This node is designed to generate and manage keyframes for animations that incorporate camera control, enabling the creation of dynamic and complex camera movements within the AnimateDiff framework. It allows for the specification of start percentages for animations, the application of multiple values for scaling, effects, and camera control, and the inheritance of missing values to ensure continuity across keyframes.
## Input types
### Required
- **`start_percent`**
    - Specifies the starting point of the animation as a percentage, allowing for precise control over the timing of camera movements and effects within the animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`prev_ad_keyframes`**
    - Optional. Allows for the inclusion of previously defined AnimateDiff keyframes, enabling the chaining and layering of animations for more complex sequences.
    - Comfy dtype: `AD_KEYFRAMES`
    - Python dtype: `ADKeyframeGroup or None`
- **`scale_multival`**
    - Optional. Applies a scaling factor to the animation, enabling adjustments to the size of animated elements.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `float or torch.Tensor`
- **`effect_multival`**
    - Optional. Applies various effects to the animation, enabling the addition of visual enhancements or modifications.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `float or torch.Tensor`
- **`cameractrl_multival`**
    - Optional. Specifies multiple values for camera control, allowing for the creation of intricate camera movements within the animation.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `float or torch.Tensor`
- **`inherit_missing`**
    - Determines whether missing values in the current keyframe should be inherited from previous keyframes, ensuring continuity in the animation.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`guarantee_steps`**
    - Specifies the minimum number of steps to be guaranteed in the animation, ensuring a certain level of smoothness and continuity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`ad_keyframes`**
    - Comfy dtype: `AD_KEYFRAMES`
    - Produces a sequence of AnimateDiff keyframes, enabling the creation of animations with complex camera movements.
    - Python dtype: `ADKeyframeGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CameraCtrlADKeyframeNode:
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
                "cameractrl_multival": ("MULTIVAL",),
                "inherit_missing": ("BOOLEAN", {"default": True}, ),
                "guarantee_steps": ("INT", {"default": 1, "min": 0, "max": BIGMAX}),
            }
        }
    
    RETURN_TYPES = ("AD_KEYFRAMES", )
    FUNCTION = "load_keyframe"

    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl"

    def load_keyframe(self,
                      start_percent: float, prev_ad_keyframes=None,
                      scale_multival: Union[float, torch.Tensor]=None, effect_multival: Union[float, torch.Tensor]=None,
                      cameractrl_multival: Union[float, torch.Tensor]=None,
                      inherit_missing: bool=True, guarantee_steps: int=1):
        return ADKeyframeNode.load_keyframe(self,
                    start_percent=start_percent, prev_ad_keyframes=prev_ad_keyframes,
                    scale_multival=scale_multival, effect_multival=effect_multival, cameractrl_multival=cameractrl_multival,
                    inherit_missing=inherit_missing, guarantee_steps=guarantee_steps
                )

```
