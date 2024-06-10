---
tags:
- PromptComposer
---

# Prompt Composer Effect (deprecated!)
## Documentation
- Class name: `PromptComposerEffect`
- Category: `AI WizArt/Prompt Composer Tools/Deprecated`
- Output node: `False`

The PromptComposerEffect node is designed to apply a specified effect with a given weight to an input text, enhancing the prompt composition process by allowing for dynamic customization based on the effect's intensity.
## Input types
### Required
- **`effect`**
    - Specifies the effect to be applied to the input text. This parameter determines the nature of the modification.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `effects`
- **`effect_weight`**
    - Defines the intensity of the applied effect, allowing for fine-tuned control over the modification's impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`active`**
    - A boolean parameter that activates or deactivates the effect application, providing a way to enable or disable the effect dynamically.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`text_in_opt`**
    - An optional input text to which an effect can be applied. It serves as the base text for further modification.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text_out`**
    - Comfy dtype: `STRING`
    - The output text with the specified effect applied, reflecting the modifications based on the effect's weight and activation status.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptComposerEffect:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(s):
        return {
            "optional": {
                "text_in_opt": ("STRING", {"forceInput": True}),
            },
            "required": {
                "effect": (effects, {
                    "default": effects[0],
                }),
                "effect_weight": ("FLOAT", {
                    "default": 1,
                    "step": 0.05,
                    "min": 0,
                    "max": 1.95,
                    "display": "slider",
                }),
                "active": ("BOOLEAN", {"default": False}),
            },
        }
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text_out",)
    FUNCTION = "promptComposerEffect"
    CATEGORY = "AI WizArt/Prompt Composer Tools/Deprecated"
    def promptComposerEffect(self, text_in_opt="", effect="-", effect_weight=0, active=True):
        prompt = []
        if text_in_opt != "":
            prompt.append(text_in_opt)
        if effect != '-' and effect_weight > 0 and active:
            prompt.append(f"({effect} effect:{round(effect_weight,2)})")
        if len(prompt) > 0:
            prompt = ", ".join(prompt)
            prompt = prompt.lower()
            return(prompt,)
        else:
            return("",)

```
