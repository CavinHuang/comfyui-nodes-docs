
# Documentation
- Class name: Image Sequence Tweening [Dream]
- Category: ✨ Dream/🎥 animation/⚙ postprocessing
- Output node: False

该节点旨在通过在现有帧之间插入额外的帧来增强动画序列，从而有效地提高动画的平滑度和流畅性。它利用一个乘数来确定在每个原始帧之间添加的帧数，允许自定义补间的程度。

# Input types
## Required
- sequence
    - 要处理的动画序列。这是定义需要补间的帧的主要输入。
    - Comfy dtype: ANIMATION_SEQUENCE
    - Python dtype: AnimationSequence
- multiplier
    - 决定在序列中每个原始帧之间添加的插值帧数量，允许控制最终动画的平滑程度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- sequence
    - 增强后的动画序列，在原始帧之间插入了额外的补间帧。
    - Comfy dtype: ANIMATION_SEQUENCE
    - Python dtype: AnimationSequence


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
