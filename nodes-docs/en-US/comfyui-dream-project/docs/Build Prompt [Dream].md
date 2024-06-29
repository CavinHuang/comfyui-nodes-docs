---
tags:
- Prompt
- PromptComposer
---

# ⚖ Build Prompt
## Documentation
- Class name: `Build Prompt [Dream]`
- Category: `✨ Dream/☯ conditioning`
- Output node: `False`

The 'Build Prompt' node is designed for constructing and weighting textual prompts for generative tasks, allowing for the dynamic adjustment of prompt importance through weights.
## Input types
### Required
- **`added_prompt`**
    - Specifies the text to be added to the prompt, which can be dynamically adjusted in importance using the weight parameter.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`weight`**
    - Determines the weight of the added prompt text, influencing its significance in the resulting prompt composition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`partial_prompt`**
    - An optional initial prompt structure that can be further modified by adding text with specified weight. If not provided, a new prompt structure is initialized.
    - Comfy dtype: `PARTIAL_PROMPT`
    - Python dtype: `PartialPrompt`
## Output types
- **`partial_prompt`**
    - Comfy dtype: `PARTIAL_PROMPT`
    - The modified or newly created prompt structure, incorporating the added text with its specified weight.
    - Python dtype: `PartialPrompt`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamWeightedPromptBuilder:
    NODE_NAME = "Build Prompt"
    ICON = "⚖"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "optional": {
                "partial_prompt": (PartialPrompt.ID,)
            },
            "required": {
                "added_prompt": ("STRING", {"default": "", "multiline": True}),
                "weight": ("FLOAT", {"default": 1.0}),
            },
        }

    CATEGORY = NodeCategories.CONDITIONING
    RETURN_TYPES = (PartialPrompt.ID,)
    RETURN_NAMES = ("partial_prompt",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def result(self, added_prompt, weight, **args):
        input = args.get("partial_prompt", PartialPrompt())
        p = input.add(added_prompt, weight)
        return (p,)

```
