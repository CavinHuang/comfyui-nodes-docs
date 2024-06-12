---
tags:
- AnimateDiff
- Animation
---

# Custom CFG 🎭🅐🅓
## Documentation
- Class name: `ADE_CustomCFG`
- Category: `Animate Diff 🎭🅐🅓/sample settings`
- Output node: `False`

This node is designed for creating custom configuration settings for animation diffusion processes, allowing users to specify multiple values for configuration settings that influence the generation process.
## Input types
### Required
- **`cfg_multival`**
    - Specifies the multiple values for configuration settings, enabling fine-tuned control over the animation diffusion process.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `Union[float, torch.Tensor]`
## Output types
- **`custom_cfg`**
    - Comfy dtype: `CUSTOM_CFG`
    - Outputs a custom configuration group, encapsulating the specified configuration settings for use in animation diffusion.
    - Python dtype: `CustomCFGKeyframeGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CustomCFGNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cfg_multival": ("MULTIVAL",),
            }
        }

    RETURN_TYPES = ("CUSTOM_CFG",)
    CATEGORY = "Animate Diff 🎭🅐🅓/sample settings"
    FUNCTION = "create_custom_cfg"

    def create_custom_cfg(self, cfg_multival: Union[float, Tensor]):
        keyframe = CustomCFGKeyframe(cfg_multival=cfg_multival)
        cfg_custom = CustomCFGKeyframeGroup()
        cfg_custom.add(keyframe)
        return (cfg_custom,)

```
