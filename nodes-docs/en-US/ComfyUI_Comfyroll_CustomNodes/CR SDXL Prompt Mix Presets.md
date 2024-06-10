---
tags:
- Prompt
- PromptStyling
---

# 🌟 CR SDXL Prompt Mix Presets
## Documentation
- Class name: `CR SDXL Prompt Mix Presets`
- Category: `🧩 Comfyroll Studio/✨ Essential/🌟 SDXL`
- Output node: `False`

This node is designed to blend and manipulate text prompts and styles according to predefined presets, enabling the creation of nuanced and varied input prompts for generative models. It allows for the customization of positive and negative prompts and styles, offering a versatile tool for creative and targeted prompt engineering.
## Input types
### Required
### Optional
- **`prompt_positive`**
    - The positive prompt text to be mixed or manipulated. It serves as the base for generating positive aspects of the final prompt, influencing the generative model's output towards desired characteristics.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prompt_negative`**
    - The negative prompt text to be mixed or manipulated. It acts as the base for generating negative aspects of the final prompt, guiding the generative model away from undesired characteristics.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`style_positive`**
    - The positive style text to be mixed with the prompt. It enhances the positive aspects of the final prompt by adding stylistic elements, further directing the model's output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`style_negative`**
    - The negative style text to be mixed with the prompt. It enhances the negative aspects of the final prompt by adding stylistic elements, further preventing undesired outcomes in the model's output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`preset`**
    - The preset configuration for mixing the prompts and styles. It determines the specific way in which the positive and negative prompts and styles are combined, offering various creative possibilities.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`pos_g`**
    - Comfy dtype: `STRING`
    - The generated positive prompt for global context.
    - Python dtype: `str`
- **`pos_l`**
    - Comfy dtype: `STRING`
    - The generated positive prompt for local context.
    - Python dtype: `str`
- **`pos_r`**
    - Comfy dtype: `STRING`
    - The generated positive prompt for right-aligned context.
    - Python dtype: `str`
- **`neg_g`**
    - Comfy dtype: `STRING`
    - The generated negative prompt for global context.
    - Python dtype: `str`
- **`neg_l`**
    - Comfy dtype: `STRING`
    - The generated negative prompt for local context.
    - Python dtype: `str`
- **`neg_r`**
    - Comfy dtype: `STRING`
    - The generated negative prompt for right-aligned context.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for using the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_PromptMixPresets:
    def __init__(self):
        pass

    @classmethod        
    def INPUT_TYPES(s):
        return {
            "required":{
            },
            "optional":{
                "prompt_positive": ("STRING", {"multiline": True, "default": "prompt_pos"}),
                "prompt_negative": ("STRING", {"multiline": True, "default": "prompt_neg"}),
                "style_positive": ("STRING", {"multiline": True, "default": "style_pos"}),
                "style_negative": ("STRING", {"multiline": True, "default": "style_neg"}),
                "preset": (["default with no style text", "default with style text",
                            "style boost 1", "style boost 2", "style text to refiner"],),
            },
        }

    RETURN_TYPES = ("STRING", "STRING", "STRING", "STRING", "STRING", "STRING", "STRING", )
    RETURN_NAMES = ("pos_g", "pos_l", "pos_r", "neg_g", "neg_l", "neg_r", "show_help", )
    FUNCTION = "mixer"
    CATEGORY = icons.get("Comfyroll/SDXL")

    def mixer(self, prompt_positive, prompt_negative, style_positive, style_negative, preset):
        if preset == "default with no style text":
            pos_g = prompt_positive
            pos_l = prompt_positive
            pos_r = prompt_positive
            neg_g = prompt_negative
            neg_l = prompt_negative
            neg_r = prompt_negative
        elif preset == "default with style text":
            pos_g = prompt_positive + style_positive
            pos_l = prompt_positive + style_positive
            pos_r = prompt_positive + style_positive
            neg_g = prompt_negative + style_negative
            neg_l = prompt_negative + style_negative
            neg_r = prompt_negative + style_negative
        elif preset == "style boost 1":
            pos_g = prompt_positive
            pos_l = style_positive
            pos_r = prompt_positive
            neg_g = prompt_negative
            neg_l = style_negative
            neg_r = prompt_negative
        elif preset == "style boost 2":
            pos_g = style_positive
            pos_l = prompt_positive
            pos_r = style_positive
            neg_g = style_negative
            neg_l = prompt_negative
            neg_r = style_negative
        elif preset == "style text to refiner":
            pos_g = prompt_positive
            pos_l = prompt_positive
            pos_r = style_positive
            neg_g = prompt_negative
            neg_l = prompt_negative
            neg_r = style_negative
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/SDXL-Nodes#cr-sdxl-prompt-mix-presets"            
        return (pos_g, pos_l, pos_r, neg_g, neg_l, neg_r, show_help, )

```
