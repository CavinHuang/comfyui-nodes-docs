---
tags:
- AnimationScheduling
- Frame
- Keyframe
---

# Latent Keyframe Batched Group 🛂🅐🅒🅝
## Documentation
- Class name: `LatentKeyframeBatchedGroup`
- Category: `Adv-ControlNet 🛂🅐🅒🅝/keyframes`
- Output node: `False`

The LatentKeyframeBatchedGroup node is designed for the manipulation and generation of batched latent keyframes within a neural network's control mechanism. It enables the creation, interpolation, and management of keyframes based on specified strengths and batch indices, facilitating dynamic control over the generation process.
## Input types
### Required
- **`float_strengths`**
    - Specifies the strengths for each keyframe in the batch. This parameter can be a single float value or an iterable of float values, determining the intensity or effect of each keyframe.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Union[float, Iterable[float]]`
### Optional
- **`prev_latent_kf`**
    - An optional parameter that allows for the inclusion of previously generated latent keyframes. These keyframes can be merged with the newly generated or manipulated batch.
    - Comfy dtype: `LATENT_KEYFRAME`
    - Python dtype: `LatentKeyframeGroup`
- **`print_keyframes`**
    - A flag that, when set to True, enables logging information about each keyframe in the batch, including its batch index and strength.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`LATENT_KF`**
    - Comfy dtype: `LATENT_KEYFRAME`
    - Returns a LatentKeyframeGroup object containing the batch of generated or manipulated latent keyframes.
    - Python dtype: `LatentKeyframeGroup`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LatentKeyframeBatchedGroupNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "float_strengths": ("FLOAT", {"default": -1, "min": -1, "step": 0.001, "forceInput": True}),
            },
            "optional": {
                "prev_latent_kf": ("LATENT_KEYFRAME", ),
                "print_keyframes": ("BOOLEAN", {"default": False})
            }
        }

    RETURN_NAMES = ("LATENT_KF", )
    RETURN_TYPES = ("LATENT_KEYFRAME", )
    FUNCTION = "load_keyframe"
    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝/keyframes"

    def load_keyframe(self, float_strengths: Union[float, list[float]],
                      prev_latent_kf: LatentKeyframeGroup=None,
                      prev_latent_keyframe: LatentKeyframeGroup=None, # old name
                      print_keyframes=False):
        prev_latent_keyframe = prev_latent_keyframe if prev_latent_keyframe else prev_latent_kf
        if not prev_latent_keyframe:
            prev_latent_keyframe = LatentKeyframeGroup()
        else:
            prev_latent_keyframe = prev_latent_keyframe.clone()
        curr_latent_keyframe = LatentKeyframeGroup()

        # if received a normal float input, do nothing
        if type(float_strengths) in (float, int):
            logger.info("No batched float_strengths passed into Latent Keyframe Batch Group node; will not create any new keyframes.")
        # if iterable, attempt to create LatentKeyframes with chosen strengths
        elif isinstance(float_strengths, Iterable):
            for idx, strength in enumerate(float_strengths):
                keyframe = LatentKeyframe(idx, strength)
                curr_latent_keyframe.add(keyframe)
        else:
            raise ValueError(f"Expected strengths to be an iterable input, but was {type(float_strengths).__repr__}.")    

        if print_keyframes:
            for keyframe in curr_latent_keyframe.keyframes:
                logger.info(f"keyframe {keyframe.batch_index}:{keyframe.strength}")

        # replace values with prev_latent_keyframes
        for latent_keyframe in prev_latent_keyframe.keyframes:
            curr_latent_keyframe.add(latent_keyframe)

        return (curr_latent_keyframe,)

```
