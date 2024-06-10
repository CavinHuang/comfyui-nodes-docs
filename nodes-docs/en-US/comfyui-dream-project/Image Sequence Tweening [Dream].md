---
tags:
- AnimationScheduling
- VisualEffects
---

# ⚙ Image Sequence Tweening
## Documentation
- Class name: `Image Sequence Tweening [Dream]`
- Category: `✨ Dream/🎥 animation/⚙ postprocessing`
- Output node: `False`

The node is designed to enhance animation sequences by interpolating additional frames between existing ones, effectively increasing the smoothness and fluidity of the animation. It utilizes a multiplier to determine the number of frames to be added between each original frame, allowing for customizable levels of tweening.
## Input types
### Required
- **`sequence`**
    - The animation sequence to be processed. It is the primary input that defines the frames to be tweened.
    - Comfy dtype: `ANIMATION_SEQUENCE`
    - Python dtype: `AnimationSequence`
- **`multiplier`**
    - Determines the number of interpolated frames to be added between each original frame in the sequence, allowing for control over the smoothness of the resulting animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`sequence`**
    - Comfy dtype: `ANIMATION_SEQUENCE`
    - The enhanced animation sequence with additional tweened frames inserted between the original frames.
    - Python dtype: `AnimationSequence`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamSequenceTweening:
    NODE_NAME = "Image Sequence Tweening"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.sequence | {
                "multiplier": ("INT", {"default": 2, "min": 2, "max": 10}),
            },
        }

    CATEGORY = NodeCategories.ANIMATION_POSTPROCESSING
    RETURN_TYPES = (AnimationSequence.ID,)
    RETURN_NAMES = ("sequence",)
    OUTPUT_NODE = False
    FUNCTION = "process"

    @classmethod
    def IS_CHANGED(cls, sequence: AnimationSequence, **kwargs):
        return sequence.is_defined

    def process(self, sequence: AnimationSequence, multiplier):
        if not sequence.is_defined:
            return (sequence,)

        def _generate_extra_frames(input_index, last_index, images):
            results = {}
            if input_index == last_index:
                # special case
                for i in range(multiplier):
                    results[input_index * multiplier + i] = images[0]
                return results

            # normal case
            current_frame = images[0]
            next_frame = images[1]
            for i in range(multiplier):
                alpha = float(i + 1) / multiplier
                results[multiplier * input_index + i] = current_frame.blend(next_frame, 1.0 - alpha, alpha)
            return results

        proc = AnimationSeqProcessor(sequence)
        return (proc.process([0, 1], _generate_extra_frames),)

```
