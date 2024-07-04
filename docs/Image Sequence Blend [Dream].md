
# Documentation
- Class name: Image Sequence Blend [Dream]
- Category: ✨ Dream/🎥 animation/⚙ postprocessing
- Output node: False
- Repo Ref: https://github.com/ComfyUI-extensions/ComfyUI_DreamExamples

该节点通过在指定的迭代次数内应用淡入和淡出效果来混合动画序列，从而增强序列中的视觉过渡和连续性。

# Input types
## Required
- sequence
    - 要进行混合的动画序列，是混合过程的主要输入。
    - Comfy dtype: ANIMATION_SEQUENCE
    - Python dtype: AnimationSequence
- fade_in
    - 指定每个帧过渡开始时淡入效果的强度，影响序列视觉流的平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- fade_out
    - 决定每个帧过渡结束时淡出效果的强度，有助于连续帧之间的无缝整合。
    - Comfy dtype: FLOAT
    - Python dtype: float
- iterations
    - 控制混合过程应用的次数，影响动画序列的整体平滑度和连续性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- sequence
    - 应用混合处理后的结果动画序列，具有增强的帧间视觉过渡效果。
    - Comfy dtype: ANIMATION_SEQUENCE
    - Python dtype: AnimationSequence


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamSequenceBlend:
    NODE_NAME = "Image Sequence Blend"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.sequence | {
                "fade_in": ("FLOAT", {"default": 0.1, "min": 0.01, "max": 0.5}),
                "fade_out": ("FLOAT", {"default": 0.1, "min": 0.01, "max": 0.5}),
                "iterations": ("INT", {"default": 1, "min": 1, "max": 10}),
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

    def process(self, sequence: AnimationSequence, fade_in, fade_out, iterations):
        if not sequence.is_defined:
            return (sequence,)

        current_sequence = sequence
        for i in range(iterations):
            proc = AnimationSeqProcessor(current_sequence)

            def _blur(index: int, last_index: int, images: List[DreamImage]):
                pre_frame = images[0].blend(images[1], fade_in, 1.0)
                post_frame = images[2].blend(images[1], fade_out, 1.0)
                return {index: pre_frame.blend(post_frame)}

            current_sequence = proc.process([-1, 0, 1], _blur)

        return (current_sequence,)

```
