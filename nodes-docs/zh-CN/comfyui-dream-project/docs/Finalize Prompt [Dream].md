
# Documentation
- Class name: Finalize Prompt [Dream]
- Category: ✨ Dream/☯ conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Finalize Prompt节点用于完成提示词的构建过程。它通过应用调整和限制来确保提示词的各个组成部分都在指定的范围内。该节点的设计目的是精炼和完善提示词文本，使其可以直接用于内容生成。

# Input types
## Required
- partial_prompt
    - 表示正在完成的提示词的初始或中间状态。这对于确定最终提示词的基本内容和结构至关重要。
    - Comfy dtype: PARTIAL_PROMPT
    - Python dtype: PartialPrompt
- adjustment
    - 指定应用于提示词组成部分的调整方法，例如按绝对最大值或总和进行缩放，或保持原始状态。这会影响提示词中权重的最终分布。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- clamp
    - 提示词中任何组成部分权重的最大允许值，确保没有单一部分过度主导。
    - Comfy dtype: FLOAT
    - Python dtype: float
- adjustment_reference
    - 在缩放调整中用于平衡提示词组成部分权重的参考值。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- positive
    - 具有正向权重的最终提示词，可用于生成符合所需属性的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 具有负向权重的最终提示词，指示在生成过程中应避免或最小化的内容。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamPromptFinalizer:
    NODE_NAME = "Finalize Prompt"
    ICON = "🗫"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "partial_prompt": (PartialPrompt.ID,),
                "adjustment": (["raw", "by_abs_max", "by_abs_sum"],),
                "clamp": ("FLOAT", {"default": 2.0, "min": 0.1, "step": 0.1}),
                "adjustment_reference": ("FLOAT", {"default": 1.0, "min": 0.1}),
            },
        }

    CATEGORY = NodeCategories.CONDITIONING
    RETURN_TYPES = ("STRING", "STRING")
    RETURN_NAMES = ("positive", "negative")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def result(self, partial_prompt: PartialPrompt, adjustment, adjustment_reference, clamp):
        if adjustment == "raw" or partial_prompt.is_empty():
            return partial_prompt.finalize(clamp)
        elif adjustment == "by_abs_sum":
            f = adjustment_reference / partial_prompt.abs_sum()
            return partial_prompt.scaled_by(f).finalize(clamp)
        else:
            f = adjustment_reference / partial_prompt.abs_max()
            return partial_prompt.scaled_by(f).finalize(clamp)

```
