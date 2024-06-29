---
tags:
- Prompt
- PromptStyling
---

# Theme Styler (Advanced)
## Documentation
- Class name: `ThemeStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The ThemeStylerAdvanced node dynamically applies thematic styling to text prompts based on a selection of predefined themes. It enhances the original text by incorporating stylistic elements related to the chosen theme, aiming to modify the tone, mood, or visual imagery suggested by the text.
## Input types
### Required
- **`text_positive_g`**
    - The global positive text prompt to be styled, representing broad thematic content to be enhanced.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - The local positive text prompt to be styled, focusing on specific details or elements to be emphasized within the theme.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled, indicating content or themes to be avoided or contrasted against the desired styling.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`theme`**
    - The selected theme for styling, determining the stylistic elements to be applied to the text prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`negative_prompt_to`**
    - Specifies the scope of negative styling, whether to apply it globally, locally, or both.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag to enable or disable logging of the prompt transformation process, providing insight into the styling effects.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - The styled global positive text prompt, reflecting the overarching theme.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - The styled local positive text prompt, showcasing specific thematic enhancements.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The combined styled positive text prompt, integrating both global and local thematic elements.
    - Python dtype: `str`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - The styled global negative text prompt, indicating broader content or themes that have been avoided or contrasted.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - The styled local negative text prompt, reflecting specific details or elements that have been contrasted against the theme.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The combined styled negative text prompt, integrating both global and local contrasts to the desired theme.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
