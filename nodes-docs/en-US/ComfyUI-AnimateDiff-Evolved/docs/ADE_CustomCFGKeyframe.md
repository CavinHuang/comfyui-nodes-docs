---
tags:
- AnimateDiff
- Animation
---

# Custom CFG Keyframe 🎭🅐🅓
## Documentation
- Class name: `ADE_CustomCFGKeyframe`
- Category: `Animate Diff 🎭🅐🅓/sample settings`
- Output node: `False`

The ADE_CustomCFGKeyframe node is designed for creating and managing custom configuration keyframes within the Animate Diff framework. It allows for the specification of various animation parameters at different points in the animation timeline, enabling precise control over the animation's behavior and appearance.
## Input types
### Required
- **`cfg_multival`**
    - Defines the configuration value(s) for the keyframe, which can influence various aspects of the animation process. It's crucial for tailoring the animation's characteristics at specific timeline segments.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `Union[float, torch.Tensor]`
- **`start_percent`**
    - Specifies the starting point of the keyframe within the animation timeline as a percentage, allowing for precise timing control.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`guarantee_steps`**
    - Determines the minimum number of steps for which the keyframe's configuration will be applied, ensuring a certain duration of effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`prev_custom_cfg`**
    - Allows for the chaining of custom configuration keyframes by specifying a previous custom configuration group, enabling complex animation sequences.
    - Comfy dtype: `CUSTOM_CFG`
    - Python dtype: `CustomCFGKeyframeGroup or None`
## Output types
- **`custom_cfg`**
    - Comfy dtype: `CUSTOM_CFG`
    - Outputs a custom configuration object that encapsulates the defined keyframe, ready for integration into the animation pipeline.
    - Python dtype: `CustomCFGKeyframeGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CustomCFGKeyframeNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cfg_multival": ("MULTIVAL",),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "guarantee_steps": ("INT", {"default": 1, "min": 0, "max": BIGMAX}),
            },
            "optional": {
                "prev_custom_cfg": ("CUSTOM_CFG",),
            }
        }

    RETURN_TYPES = ("CUSTOM_CFG",)
    CATEGORY = "Animate Diff 🎭🅐🅓/sample settings"
    FUNCTION = "create_custom_cfg"

    def create_custom_cfg(self, cfg_multival: Union[float, Tensor], start_percent: float=0.0, guarantee_steps: int=1,
                          prev_custom_cfg: CustomCFGKeyframeGroup=None):
        if not prev_custom_cfg:
            prev_custom_cfg = CustomCFGKeyframeGroup()
        prev_custom_cfg = prev_custom_cfg.clone()
        keyframe = CustomCFGKeyframe(cfg_multival=cfg_multival, start_percent=start_percent, guarantee_steps=guarantee_steps)
        prev_custom_cfg.add(keyframe)
        return (prev_custom_cfg,)

```
