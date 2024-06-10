---
tags:
- PromptComposer
---

# Prompt Composer Multiple Text
## Documentation
- Class name: `promptComposerTextMultiple`
- Category: `AI WizArt/Prompt Composer Tools`
- Output node: `False`

The `promptComposerTextMultiple` node is designed to compose a text prompt by combining multiple text inputs, each with an associated weight. This node allows for the dynamic creation of prompts by adjusting the significance of each text input through weights, enabling a flexible and weighted composition of text elements for various applications.
## Input types
### Required
- **`text_i`**
    - A text input to be included in the prompt composition. The index 'i' can range from 1 to 10, allowing for up to ten different text inputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`weight_i`**
    - The weight associated with the corresponding text input, determining its significance in the composed prompt. The index 'i' matches that of 'text_i', allowing for individual weighting of up to ten text inputs.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`active`**
    - A boolean input that activates or deactivates the composition of the prompt. When false, the node may ignore the text inputs and weights, resulting in an empty or default prompt.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`text_in_opt`**
    - An optional initial text input that can be included in the prompt composition.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text_out`**
    - Comfy dtype: `STRING`
    - The composed text prompt, resulting from the combination and weighting of the provided text inputs.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class promptComposerTextMultiple:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(s):
        return {
            "optional": {
                "text_in_opt": ("STRING", {"forceInput": True}),
            },
            "required": {
                "text_1": ("STRING", {
                    "multiline": True
                }),
                "weight_1": ("FLOAT", {
                    "default": 1,
                    "min": 0,
                    "max": 1.95,
                    "step": 0.05,
                    "display": "slider"
                }),
                "text_2": ("STRING", {
                    "multiline": True
                }),
                "weight_2": ("FLOAT", {
                    "default": 1,
                    "min": 0,
                    "max": 1.95,
                    "step": 0.05,
                    "display": "slider"
                }),
                "text_3": ("STRING", {
                    "multiline": True
                }),
                "weight_3": ("FLOAT", {
                    "default": 1,
                    "min": 0,
                    "max": 1.95,
                    "step": 0.05,
                    "display": "slider"
                }),
                "text_4": ("STRING", {
                    "multiline": True
                }),
                "weight_4": ("FLOAT", {
                    "default": 1,
                    "min": 0,
                    "max": 1.95,
                    "step": 0.05,
                    "display": "slider"
                }),
                "text_5": ("STRING", {
                    "multiline": True
                }),
                "weight_5": ("FLOAT", {
                    "default": 1,
                    "min": 0,
                    "max": 1.95,
                    "step": 0.05,
                    "display": "slider"
                }),
                "text_6": ("STRING", {
                    "multiline": True
                }),
                "weight_6": ("FLOAT", {
                    "default": 1,
                    "min": 0,
                    "max": 1.95,
                    "step": 0.05,
                    "display": "slider"
                }),
                "text_7": ("STRING", {
                    "multiline": True
                }),
                "weight_7": ("FLOAT", {
                    "default": 1,
                    "min": 0,
                    "max": 1.95,
                    "step": 0.05,
                    "display": "slider"
                }),
                "text_8": ("STRING", {
                    "multiline": True
                }),
                "weight_8": ("FLOAT", {
                    "default": 1,
                    "min": 0,
                    "max": 1.95,
                    "step": 0.05,
                    "display": "slider"
                }),
                "text_9": ("STRING", {
                    "multiline": True
                }),
                "weight_9": ("FLOAT", {
                    "default": 1,
                    "min": 0,
                    "max": 1.95,
                    "step": 0.05,
                    "display": "slider"
                }),
                "text_10": ("STRING", {
                    "multiline": True
                }),
                "weight_10": ("FLOAT", {
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
    FUNCTION = "promptComposerTextMultiple"
    CATEGORY = "AI WizArt/Prompt Composer Tools"
    def promptComposerTextMultiple(self, text_in_opt="", text_1="", weight_1=0, text_2="", weight_2=0, text_3="", weight_3=0, text_4="", weight_4=0, text_5="", weight_5=0, text_6="", weight_6=0, text_7="", weight_7=0, text_8="", weight_8=0, text_9="", weight_9=0, text_10="", weight_10=0, active=True):
        prompt = []
        if text_in_opt != "":
            prompt.append(text_in_opt)
        if text_1 != "" and weight_1 > 0 and active:
            prompt.append(applyWeight(text_1, weight_1))
        if text_2 != "" and weight_2 > 0 and active:
            prompt.append(applyWeight(text_2, weight_2))
        if text_3 != "" and weight_3 > 0 and active:
            prompt.append(applyWeight(text_3, weight_3))
        if text_4 != "" and weight_4 > 0 and active:
            prompt.append(applyWeight(text_4, weight_4))
        if text_5 != "" and weight_5 > 0 and active:
            prompt.append(applyWeight(text_5, weight_5))
        if text_6 != "" and weight_6 > 0 and active:
            prompt.append(applyWeight(text_6, weight_6))
        if text_7 != "" and weight_7 > 0 and active:
            prompt.append(applyWeight(text_7, weight_7))
        if text_8 != "" and weight_8 > 0 and active:
            prompt.append(applyWeight(text_8, weight_8))
        if text_9 != "" and weight_9 > 0 and active:
            prompt.append(applyWeight(text_9, weight_9))
        if text_10 != "" and weight_10 > 0 and active:
            prompt.append(applyWeight(text_10, weight_10))
        if len(prompt) > 0:
            prompt = ", ".join(prompt)
            prompt = prompt.lower()
            return(prompt,)
        else:
            return("",)

```
