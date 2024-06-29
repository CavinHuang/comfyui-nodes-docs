---
tags:
- Prompt
- PromptStyling
---

# Prompt Composer Styler (deprecated!)
## Documentation
- Class name: `PromptComposerStyler`
- Category: `AI WizArt/Prompt Composer Tools/Deprecated`
- Output node: `False`

The PromptComposerStyler node is designed to incorporate stylistic elements into text prompts based on specified styles and their associated weights. It enables the dynamic adjustment of text presentation by applying stylistic modifications, thereby enhancing the expressiveness and specificity of the generated prompts.
## Input types
### Required
- **`style`**
    - Specifies the style to be applied to the text. This parameter determines the aesthetic or thematic direction of the styling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`style_weight`**
    - Determines the intensity or degree of the applied style, allowing for nuanced control over the stylistic effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`active`**
    - A boolean parameter that activates or deactivates the styling function. When false, the styling is not applied.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`text_in_opt`**
    - An optional text input that, if provided, is included in the styled prompt. It serves as the base text to which the style is applied.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text_out`**
    - Comfy dtype: `STRING`
    - The output text with the specified style applied, reflecting the combined effect of the input text and the stylistic adjustments.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptComposerStyler:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(s):
        return {
            "optional": {
                "text_in_opt": ("STRING", {"forceInput": True}),
            },
            "required": {
                "style": (styles, {
                    "default": styles[0],
                }),
                "style_weight": ("FLOAT", {
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
    FUNCTION = "promptComposerStyler"
    CATEGORY = "AI WizArt/Prompt Composer Tools/Deprecated"
    def promptComposerStyler(self, text_in_opt="", style="-", style_weight=0, active=True):
        prompt = []
        if text_in_opt != "":
            prompt.append(text_in_opt)
        if style != '-' and style_weight > 0 and active:
            prompt.append(f"({style} style:{round(style_weight,2)})")
        if len(prompt) > 0:
            prompt = ", ".join(prompt)
            prompt = prompt.lower()
            return(prompt,)
        else:
            return("",)

```
