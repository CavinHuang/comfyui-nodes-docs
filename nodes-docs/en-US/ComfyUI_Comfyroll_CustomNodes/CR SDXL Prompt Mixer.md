---
tags:
- Prompt
- PromptStyling
---

# CR SDXL Prompt Mixer (Legacy)
## Documentation
- Class name: `CR SDXL Prompt Mixer`
- Category: `🧩 Comfyroll Studio/✨ Essential/💀 Legacy`
- Output node: `False`

The CR SDXL Prompt Mixer node is designed to blend and manipulate text prompts and styles for generative models, allowing for the creation of customized prompt combinations based on user-defined positive and negative prompts and styles, as well as preset configurations. This node facilitates the exploration of creative prompt variations to influence the generative process.
## Input types
### Required
### Optional
- **`prompt_positive`**
    - The positive prompt text that contributes to the desired attributes or themes in the generated content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prompt_negative`**
    - The negative prompt text that specifies undesired attributes or themes to be minimized or avoided in the generated content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`style_positive`**
    - The positive style text that defines the desired stylistic attributes to be emphasized in the generated content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`style_negative`**
    - The negative style text that specifies undesired stylistic attributes to be minimized or avoided in the generated content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`preset`**
    - A predefined configuration that determines how the positive and negative prompts and styles are mixed and applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`pos_g`**
    - Comfy dtype: `STRING`
    - The global positive prompt text after mixing based on the selected preset.
    - Python dtype: `str`
- **`pos_l`**
    - Comfy dtype: `STRING`
    - The local positive prompt text after mixing based on the selected preset.
    - Python dtype: `str`
- **`pos_r`**
    - Comfy dtype: `STRING`
    - The right-aligned positive prompt text after mixing based on the selected preset.
    - Python dtype: `str`
- **`neg_g`**
    - Comfy dtype: `STRING`
    - The global negative prompt text after mixing based on the selected preset.
    - Python dtype: `str`
- **`neg_l`**
    - Comfy dtype: `STRING`
    - The local negative prompt text after mixing based on the selected preset.
    - Python dtype: `str`
- **`neg_r`**
    - Comfy dtype: `STRING`
    - The right-aligned negative prompt text after mixing based on the selected preset.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_PromptMixer:
    def __init__(self):
        pass

    @classmethod        
    def INPUT_TYPES(s):
        return {
            "required":{
            },
            "optional":{
                "prompt_positive": ("STRING", {"multiline": True, "default": "BASE_POSITIVE"}),
                "prompt_negative": ("STRING", {"multiline": True, "default": "BASE_NEGATIVE"}),
                "style_positive": ("STRING", {"multiline": True, "default": "REFINER_POSTIVE"}),
                "style_negative": ("STRING", {"multiline": True, "default": "REFINER_NEGATIVE"}),
                "preset": (["preset 1", "preset 2", "preset 3", "preset 4", "preset 5"],),
            },
        }

    RETURN_TYPES = ("STRING", "STRING", "STRING", "STRING", "STRING", "STRING", )
    RETURN_NAMES = ("pos_g", "pos_l", "pos_r", "neg_g", "neg_l", "neg_r", )
    FUNCTION = "mixer"

    CATEGORY = icons.get("Comfyroll/Essential/Legacy")

    def mixer(self, prompt_positive, prompt_negative, style_positive, style_negative, preset):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Legacy-Nodes#cr-prompt-mixer"

        if preset == "preset 1":
            pos_g = prompt_positive
            pos_l = prompt_positive
            pos_r = prompt_positive
            neg_g = prompt_negative
            neg_l = prompt_negative
            neg_r = prompt_negative
        elif preset == "preset 2":
            pos_g = prompt_positive
            pos_l = style_positive
            pos_r = prompt_positive
            neg_g = prompt_negative
            neg_l = style_negative
            neg_r = prompt_negative
        elif preset == "preset 3":
            pos_g = style_positive
            pos_l = prompt_positive
            pos_r = style_positive
            neg_g = style_negative
            neg_l = prompt_negative
            neg_r = style_negative
        elif preset == "preset 4":
            pos_g = prompt_positive + style_positive
            pos_l = prompt_positive + style_positive
            pos_r = prompt_positive + style_positive
            neg_g = prompt_negative + style_negative
            neg_l = prompt_negative + style_negative
            neg_r = prompt_negative + style_negative
        elif preset == "preset 5":
            pos_g = prompt_positive
            pos_l = prompt_positive
            pos_r = style_positive
            neg_g = prompt_negative
            neg_l = prompt_negative
            neg_r = style_negative
        return (pos_g, pos_l, pos_r, neg_g, neg_l, neg_r, )

```
