---
tags:
- Prompt
- PromptStyling
---

# SDXL Prompt Styler Advanced
## Documentation
- Class name: `SDXLPromptStylerAdvanced`
- Category: `utils`
- Output node: `False`

The SDXLPromptStylerAdvanced node is designed to enhance and stylize text prompts for generative models by applying advanced styling techniques. It allows for the customization of positive and negative prompts through a variety of styling options, enabling more nuanced and targeted prompt engineering.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text to be styled. It serves as the base content for applying global styling transformations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text to be styled. This text is subject to local styling adjustments, allowing for fine-grained control over the prompt's appearance.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text to be styled. It is used to apply styling that contrasts with the positive prompts, aiding in the generation of more balanced and diverse outputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`style`**
    - Specifies the styling template to be applied to the prompts. This parameter determines the overall aesthetic and thematic direction of the styled prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`negative_prompt_to`**
    - Controls the application scope of negative styling, allowing users to specify whether the styling should be applied globally, locally, or to both positive and negative prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`copy_to_l`**
    - A boolean flag indicating whether the global styling should also be copied to the local positive text, enabling uniform styling across both global and local prompts.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`log_prompt`**
    - Enables logging of the styling process, including the input texts and the chosen style, facilitating debugging and refinement of the styling effects.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The global positive text after styling.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The local positive text after styling.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined positive text after styling.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The global negative text after styling.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The local negative text after styling.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined negative text after styling.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SDXLPromptStylerAdvanced:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        current_directory = os.path.dirname(os.path.realpath(__file__))
        self.json_data, styles = load_styles_from_directory(current_directory)
        
        return {
            "required": {
                "text_positive_g": ("STRING", {"default": "", "multiline": True}),
                "text_positive_l": ("STRING", {"default": "", "multiline": True}),
                "text_negative": ("STRING", {"default": "", "multiline": True}),
                "style": ((styles), ),
                "negative_prompt_to": (["Both", "G only", "L only"], {"default":"Both"}),
                "copy_to_l": ("BOOLEAN", {"default": False, "label_on": "yes", "label_off": "no"}),
                "log_prompt": ("BOOLEAN", {"default": False, "label_on": "yes", "label_off": "no"}),
            },
        }

    RETURN_TYPES = ('STRING','STRING','STRING','STRING','STRING','STRING',)
    RETURN_NAMES = ('text_positive_g','text_positive_l','text_positive','text_negative_g','text_negative_l','text_negative',)
    FUNCTION = 'prompt_styler_advanced'
    CATEGORY = 'utils'

    def prompt_styler_advanced(self, text_positive_g, text_positive_l, text_negative, style, negative_prompt_to, copy_to_l, log_prompt):
        # Process and combine prompts in templates
        # The function replaces the positive prompt placeholder in the template,
        # and combines the negative prompt with the template's negative prompt, if they exist.
        text_positive_g_styled, text_positive_l_styled, text_positive_styled, text_negative_g_styled, text_negative_l_styled, text_negative_styled = read_sdxl_templates_replace_and_combine_advanced(self.json_data, style, text_positive_g, text_positive_l, text_negative, negative_prompt_to, copy_to_l)
 
        # If logging is enabled (log_prompt is set to "Yes"), 
        # print the style, positive and negative text, and positive and negative prompts to the console
        if log_prompt:
            print(f"style: {style}")
            print(f"text_positive_g: {text_positive_g}")
            print(f"text_positive_l: {text_positive_l}")
            print(f"text_negative: {text_negative}")
            print(f"text_positive_g_styled: {text_positive_g_styled}")
            print(f"text_positive_l_styled: {text_positive_l_styled}")
            print(f"text_positive_styled: {text_positive_styled}")
            print(f"text_negative_g_styled: {text_negative_g_styled}")
            print(f"text_negative_l_styled: {text_negative_l_styled}")
            print(f"text_negative_styled: {text_negative_styled}")

        return text_positive_g_styled, text_positive_l_styled, text_positive_styled, text_negative_g_styled, text_negative_l_styled, text_negative_styled

```
