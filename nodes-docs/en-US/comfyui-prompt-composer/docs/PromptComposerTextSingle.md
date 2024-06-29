---
tags:
- PromptComposer
---

# Prompt Composer Single Text
## Documentation
- Class name: `PromptComposerTextSingle`
- Category: `AI WizArt/Prompt Composer Tools`
- Output node: `False`

The PromptComposerTextSingle node is designed for composing single text prompts with optional additional text and weight adjustments. It allows for the dynamic creation of prompts based on input text, optional text, and their respective weights, facilitating customized prompt generation for various applications.
## Input types
### Required
- **`text`**
    - The primary text input for the prompt. This text is the main focus of the prompt composition.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`weight`**
    - A weight applied to the primary text to adjust its influence or importance in the final prompt composition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`active`**
    - A boolean flag indicating whether the prompt composition should be active. If false, the composition may be bypassed or altered.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`text_in_opt`**
    - An optional text input that, if provided, is prepended to the main text to form the prompt. It allows for the inclusion of additional context or information.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text_out`**
    - Comfy dtype: `STRING`
    - The output text resulting from the composition of the input texts and their weights, formatted as a single string.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptComposerTextSingle:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(s):
        return {
            "optional": {
                "text_in_opt": ("STRING", {"forceInput": True}),
            },
            "required": {
                "text": ("STRING", {
                    "multiline": True
                }),
                "weight": ("FLOAT", {
                    "default": 1,
                    "min": 0,
                    "max": 1.95,
                    "step": 0.05,
                    "display": "slider"
                }),
                "active": ("BOOLEAN", {"default": False}),
            }
        }
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text_out",)
    FUNCTION = "promptComposerTextSingle"
    CATEGORY = "AI WizArt/Prompt Composer Tools"
    def promptComposerTextSingle(self, text_in_opt="", text="", weight=0, active=True):
        prompt = []
        if text_in_opt != "":
            prompt.append(text_in_opt)
        if text != "" and weight > 0 and active:
            prompt.append(applyWeight(text, weight))
        if len(prompt) > 0:
            prompt = ", ".join(prompt)
            prompt = prompt.lower()
            return(prompt,)
        else:
            return("",)

```
