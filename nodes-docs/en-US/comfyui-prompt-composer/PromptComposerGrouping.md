---
tags:
- PromptComposer
---

# Prompt Composer Grouping
## Documentation
- Class name: `PromptComposerGrouping`
- Category: `AI WizArt/Prompt Composer Tools`
- Output node: `False`

The PromptComposerGrouping node is designed to modify and enhance input text based on specified weights and activity status, primarily focusing on grouping elements within prompts for AI-based applications.
## Input types
### Required
- **`text_in`**
    - The primary text input that serves as the base for grouping modifications.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`weight`**
    - A numerical value that influences the degree of modification applied to the input text, with higher values indicating greater emphasis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`active`**
    - A boolean flag that determines whether the grouping modifications should be applied to the input text.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_out`**
    - Comfy dtype: `STRING`
    - The modified text output after applying grouping logic, based on the input parameters.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptComposerGrouping:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text_in": ("STRING", {"forceInput": True}),
                "weight": ("FLOAT", {
                    "default": 1,
                    "step": 0.05,
                    "min": 0,
                    "max": 1.95,
                    "display": "slider",
                }),
                "active": ("BOOLEAN", {"default": False}),
            }
        }
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text_out",)
    FUNCTION = "promptComposerGrouping"
    CATEGORY = "AI WizArt/Prompt Composer Tools"
    def promptComposerGrouping(self, text_in="", weight=0, active=True):
        prompt = text_in
        if text_in != "" and weight > 0 and active:
            prompt = applyWeight(text_in, weight)
        return(prompt,)

```
