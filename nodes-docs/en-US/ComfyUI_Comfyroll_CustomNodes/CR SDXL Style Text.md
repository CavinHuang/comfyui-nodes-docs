---
tags:
- Prompt
- PromptStyling
---

# 🌟 CR SDXL Style Text
## Documentation
- Class name: `CR SDXL Style Text`
- Category: `🧩 Comfyroll Studio/✨ Essential/🌟 SDXL`
- Output node: `False`

The CR SDXL Style Text node is designed to generate stylized text prompts for creative applications, allowing users to specify positive and negative styles to influence the generated text. It provides a straightforward way to craft text prompts that align with specific stylistic preferences, enhancing the creative process.
## Input types
### Required
- **`positive_style`**
    - Defines the desired style attributes to emphasize in the generated text, influencing the text generation towards positive stylistic elements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_style`**
    - Specifies the style attributes to de-emphasize or avoid in the generated text, guiding the text generation away from these stylistic elements.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`positive_prompt_text_l`**
    - Comfy dtype: `STRING`
    - The generated text prompt that emphasizes the positive style attributes.
    - Python dtype: `str`
- **`negative_prompt_text_l`**
    - Comfy dtype: `STRING`
    - The generated text prompt that de-emphasizes the negative style attributes.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing additional information and guidance on using the CR SDXL Style Text node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SDXLStyleText:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "positive_style": ("STRING", {"default": "POS_STYLE", "multiline": True}),
                    "negative_style": ("STRING", {"default": "NEG_STYLE", "multiline": True}),
                    },
                }

    RETURN_TYPES = ("STRING", "STRING", "STRING", )
    RETURN_NAMES = ("positive_prompt_text_l", "negative_prompt_text_l" , "show_help", )
    FUNCTION = "get_value"
    CATEGORY = icons.get("Comfyroll/SDXL")

    def get_value(self, positive_style, negative_style):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/SDXL-Nodes#cr-sdxl-style-text"
        return (positive_style, negative_style, show_help, )

```
