---
tags:
- AnimationScheduling
- Frame
- Keyframe
---

# Latent Keyframe 🛂🅐🅒🅝
## Documentation
- Class name: `LatentKeyframe`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/keyframes`
- Output node: `False`

The LatentKeyframe node is designed for managing and manipulating keyframes within a latent space, specifically for controlling the progression and transformation of generative models' outputs over time. It allows for the loading and updating of keyframe data, facilitating the creation of smooth transitions and animations in generated content.
## Input types
### Required
- **`batch_index`**
    - Specifies the index of the batch for which the keyframe is being loaded or manipulated, serving as a key identifier for operations within the batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`strength`**
    - Determines the intensity or influence of the keyframe on the generated output, allowing for fine-tuned control over the appearance or characteristics of the generated content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`prev_latent_kf`**
    - An optional parameter that allows for the chaining or sequencing of keyframes by providing a reference to a previously defined keyframe or keyframe group, enabling complex animations and transitions.
    - Comfy dtype: `LATENT_KEYFRAME`
    - Python dtype: `LatentKeyframeGroup`
## Output types
- **`LATENT_KF`**
    - Comfy dtype: `LATENT_KEYFRAME`
    - Represents the updated or newly created keyframe or keyframe group, encapsulating the changes made through the node's operation.
    - Python dtype: `LatentKeyframeGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LatentKeyframeNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "batch_index": ("INT", {"default": 0, "min": BIGMIN, "max": BIGMAX, "step": 1}),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.001}, ),
            },
            "optional": {
                "prev_latent_kf": ("LATENT_KEYFRAME", ),
            }
        }

    RETURN_NAMES = ("LATENT_KF", )
    RETURN_TYPES = ("LATENT_KEYFRAME", )
    FUNCTION = "load_keyframe"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/keyframes"

    def load_keyframe(self,
                      batch_index: int,
                      strength: float,
                      prev_latent_kf: LatentKeyframeGroup=None,
                      prev_latent_keyframe: LatentKeyframeGroup=None, # old name
                      ):
        prev_latent_keyframe = prev_latent_keyframe if prev_latent_keyframe else prev_latent_kf
        if not prev_latent_keyframe:
            prev_latent_keyframe = LatentKeyframeGroup()
        else:
            prev_latent_keyframe = prev_latent_keyframe.clone()
        keyframe = LatentKeyframe(batch_index, strength)
        prev_latent_keyframe.add(keyframe)
        return (prev_latent_keyframe,)

```
