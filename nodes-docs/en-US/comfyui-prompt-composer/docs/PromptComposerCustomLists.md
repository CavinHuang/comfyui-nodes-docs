---
tags:
- PromptComposer
---

# Prompt Composer Custom Lists
## Documentation
- Class name: `PromptComposerCustomLists`
- Category: `AI WizArt/Prompt Composer Tools`
- Output node: `False`

The PromptComposerCustomLists node is designed to integrate custom list selections into a prompt composition, allowing for dynamic and customizable text generation based on user-defined lists and weights.
## Input types
### Required
- **`lens_type`**
    - A required parameter representing a custom list for lens types, crucial for tailoring the prompt composition to specific visual perspectives.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`lens_type_weight`**
    - Specifies the weight for the lens type selection, affecting the emphasis of the lens type in the final prompt composition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`photo_style`**
    - A required parameter for selecting a photo style from a custom list, essential for defining the visual style of the prompt.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`photo_style_weight`**
    - Determines the weight of the photo style selection, influencing its prominence in the composed prompt.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`effect`**
    - A required parameter for choosing an effect from a custom list, key to adding unique visual effects to the prompt.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`effect_weight`**
    - Sets the weight for the chosen effect, modifying its impact on the overall prompt.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`painting_style`**
    - A required parameter for selecting a painting style from a custom list, pivotal for incorporating artistic styles into the prompt.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`painting_style_weight`**
    - Adjusts the weight of the painting style selection, affecting its influence on the final prompt.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`active`**
    - A boolean parameter that activates or deactivates the inclusion of the custom list selections in the prompt composition.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`text_in_opt`**
    - An optional initial text input that can be included at the beginning of the prompt composition, emphasizing the flexibility in starting the prompt with user-defined text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text_out`**
    - Comfy dtype: `STRING`
    - The output is a single string that represents the composed prompt, dynamically generated based on the input custom lists and their associated weights.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptComposerCustomLists:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(s):
        return {
            "optional": {
                "text_in_opt": ("STRING", {"forceInput": True}),
            },
            "required": custom_lists
        }
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text_out",)
    FUNCTION = "promptComposerCustomLists"
    CATEGORY = "AI WizArt/Prompt Composer Tools"
    
    def promptComposerCustomLists(self, text_in_opt="", **kwargs):
        prompt = []
        if text_in_opt != "":
            prompt.append(text_in_opt)
        if kwargs["active"] == True:
            for key in kwargs.keys():
                if "_weight" not in str(key) and "active" not in str(key):
                    if kwargs[key] != "-" and kwargs[key + "_weight"] > 0:
                        prompt.append(applyWeight(kwargs[key], kwargs[key + "_weight"]))
        if len(prompt) > 0:
            prompt = ", ".join(prompt)
            prompt = prompt.lower()
            return(prompt,)
        else:
            return("",)

```
