---
tags:
- Prompt
- PromptComposer
---

# 🗫 Finalize Prompt
## Documentation
- Class name: `Finalize Prompt [Dream]`
- Category: `✨ Dream/☯ conditioning`
- Output node: `False`

This node finalizes the construction of prompts by applying adjustments and clamping to ensure the prompt's components are within specified bounds. It's designed to refine and finalize the text for prompts, making them ready for use in generating content.
## Input types
### Required
- **`partial_prompt`**
    - Represents the initial or intermediate state of the prompt that is being finalized. It is crucial for determining the base content and structure of the final prompt.
    - Comfy dtype: `PARTIAL_PROMPT`
    - Python dtype: `PartialPrompt`
- **`adjustment`**
    - Specifies the method of adjustment to apply to the prompt's components, such as scaling by absolute maximum or sum, or leaving them raw. This affects the final distribution of weights in the prompt.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clamp`**
    - The maximum allowed value for any component's weight in the prompt, ensuring no single part dominates excessively.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`adjustment_reference`**
    - A reference value used in scaling adjustments to balance the weights of the prompt's components.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`positive`**
    - Comfy dtype: `STRING`
    - The finalized prompt with positive weights, ready for generating content that aligns with the desired attributes.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `STRING`
    - The finalized prompt with negative weights, indicating content to avoid or minimize in generation.
    - Python dtype: `str`
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
